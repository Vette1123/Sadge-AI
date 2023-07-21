import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { Configuration, OpenAIApi } from 'openai'

import { checkIsWithinLimit, incrementApiLimit } from '@/lib/api-limit'
import { checkSubscription } from '@/lib/subscription'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY as string,
})

const openai = new OpenAIApi(configuration)

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    const body = await request.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not found', { status: 500 })
    }
    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 })
    }
    const freeTrial = await checkIsWithinLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 }
      )
    }
    const response = await openai.createChatCompletion({
      model: process.env.OPEN_AI_MODEL as string,
      messages,
    })

    if (!isPro) {
      await incrementApiLimit()
    }

    return NextResponse.json(response.data.choices[0].message)
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Server Error',
      { status: 500 }
    )
  }
}
