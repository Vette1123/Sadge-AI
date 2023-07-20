import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { Configuration, OpenAIApi } from 'openai'

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
    const response = await openai.createChatCompletion({
      model: process.env.OPEN_AI_MODEL as string,
      messages,
    })

    return NextResponse.json(response.data.choices[0].message)
  } catch (error) {
    return new NextResponse('internal server error', { status: 500 })
  }
}
