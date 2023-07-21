import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY as string,
})

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt) {
      return new NextResponse('Prompt is required', { status: 400 })
    }

    const response = await replicate.run(
      process.env.REPLICATE_MUSIC_MODEL! as `${string}/${string}:${string}`,
      {
        input: {
          prompt_a: prompt,
        },
      }
    )

    return NextResponse.json(response)
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal Server Error',
      { status: 500 }
    )
  }
}
