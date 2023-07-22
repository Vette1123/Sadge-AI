'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { handleAPICall } from '@/lib/handleAPICall'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ChatWindow from '@/components/chat-window'
import { Empty } from '@/components/empty'
import { Heading } from '@/components/heading'

import { formSchema } from './constants'

function ConversationPage() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  console.log('messages', messages)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    if (isLoading)
      return toast.error(
        'Please wait for the current message to finish streaming.'
      )
    try {
      setIsLoading(true)
      const userMessage: ChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt.trim(),
      }
      const assistantMessage: ChatCompletionRequestMessage = {
        role: 'assistant',
        content: '',
      }
      const newMessages = [...messages, userMessage, assistantMessage]

      const userMessages = newMessages.filter(
        (message) => message.role === 'user'
      )
      const assistantMessages = newMessages.filter(
        (message) => message.role === 'assistant'
      )

      setMessages(newMessages)

      const test = await handleAPICall({
        setMessages,
        apiURL: '/api/conversation',
        assistantMessages,
        userMessages,
      })

      console.log('test', test)

      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // proModal.onOpen()
      } else {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }
  return (
    <>
      <Heading
        description="Chat with Sadge AI to generate images, videos, music, code, and more!"
        title="Conversation"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent dark:disabled:bg-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 space-y-4">
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          {messages.length > 0 && <ChatWindow messages={messages} />}
        </div>
      </div>
    </>
  )
}

export default ConversationPage
