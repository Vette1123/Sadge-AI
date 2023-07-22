import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { toast } from 'sonner'

import { checkIsWithinLimit, incrementApiLimit } from '@/lib/api-limit'
import {
  APPLICATION_JSON_HEADERS,
  CONVERSATION_PROMPT,
  EVENT_STREAM_HEADERS,
} from '@/lib/constants'
import formatMessages from '@/lib/LLMFormatter'
import { openAIModel } from '@/lib/openAIModel'
import { checkSubscription } from '@/lib/subscription'

export async function POST(request: NextRequest) {
  if (!request.body)
    return new NextResponse(JSON.stringify({ error: 'No body provided' }), {
      status: 400,
    })

  if (request.method !== 'POST')
    return new NextResponse(
      JSON.stringify({ error: 'Only POST requests are allowed' }),
      {
        status: 400,
      }
    )

  try {
    const { userId } = auth()
    const { userMessages, assistantMessages } = await request.json()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formattedMessages = formatMessages(
      JSON.parse(userMessages),
      JSON.parse(assistantMessages),
      CONVERSATION_PROMPT
    )

    const stream = new TransformStream()
    const isStreaming = request.headers.get('accept') === EVENT_STREAM_HEADERS

    const freeTrial = await checkIsWithinLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 }
      )
    }

    if (!isPro) {
      await incrementApiLimit()
    }

    if (isStreaming) {
      const model = openAIModel(isStreaming, stream, true)

      model.call(formattedMessages).catch((error: Error) => {
        toast.error(error.message)
      })

      return new NextResponse(stream.readable, {
        headers: {
          'Content-Type': EVENT_STREAM_HEADERS,
        },
      })
    } else {
      const model = openAIModel(isStreaming, stream, false)

      try {
        const completion = await model.call(formattedMessages)
        return new NextResponse(JSON.stringify(completion), {
          headers: { 'Content-Type': APPLICATION_JSON_HEADERS },
        })
      } catch (error) {
        return new NextResponse(
          JSON.stringify({ error: 'Something went wrong with the model' }),
          {
            status: 500,
            headers: { 'Content-Type': APPLICATION_JSON_HEADERS },
          }
        )
      }
    }
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Server Error',
      { status: 500 }
    )
  }
}
