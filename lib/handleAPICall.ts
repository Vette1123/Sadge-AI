import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { ChatCompletionRequestMessage } from 'openai'
import { toast } from 'sonner'

import { APPLICATION_JSON_HEADERS } from '@/lib/constants'

interface Props {
  setMessages: React.Dispatch<
    React.SetStateAction<ChatCompletionRequestMessage[]>
  >
  apiURL: string
  userMessages: ChatCompletionRequestMessage[]
  assistantMessages: ChatCompletionRequestMessage[]
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  router: AppRouterInstance
}

export const handleAPICall = async ({
  setMessages,
  apiURL,
  userMessages,
  assistantMessages,
  setIsLoading,
  router,
}: Props) => {
  let currentStreamedText = ''

  try {
    setIsLoading(true)
    await fetchEventSource(apiURL, {
      method: 'POST',
      body: JSON.stringify({
        assistantMessages: JSON.stringify(assistantMessages),
        userMessages: JSON.stringify(userMessages),
      }),
      headers: { 'Content-Type': APPLICATION_JSON_HEADERS },
      onmessage(ev) {
        if (ev.data) {
          currentStreamedText += ev.data
        } else {
          currentStreamedText += '\n'
        }

        setMessages((prevMessages: ChatCompletionRequestMessage[]) => {
          const newMessages = [...prevMessages]
          const lastMessageIndex = newMessages.length - 1

          newMessages[lastMessageIndex] = {
            ...newMessages[lastMessageIndex],
            content: currentStreamedText,
          }

          return newMessages
        })
      },

      onerror(err) {
        toast.error(
          'An error occurred while sending your message. Please try again later.',
          err.message
        )
      },
      onclose() {
        setMessages((prevMessages: ChatCompletionRequestMessage[]) => {
          const newMessages = [...prevMessages]
          const lastMessageIndex = newMessages.length - 1

          newMessages[lastMessageIndex] = {
            ...newMessages[lastMessageIndex],
          }
          return newMessages
        })
      },
    })
  } catch (error: any) {
    toast.error(
      'An error occurred while sending your message. Please try again later.',
      error.message
    )
  } finally {
    setIsLoading(false)
    router.refresh()
  }
}
