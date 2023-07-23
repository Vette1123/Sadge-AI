'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MessageSquare } from 'lucide-react'
import { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { handleAPICall } from '@/lib/handleAPICall'
import { useProModal } from '@/hooks/use-modal'
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

import { formSchema, FormValues } from './constants'

function ConversationPage() {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const proModal = useProModal()
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      const newMessages = [
        ...messages,
        {
          role: 'user',
          content: values.prompt.trim(),
        } as ChatCompletionRequestMessage,
        { role: 'assistant', content: '' } as ChatCompletionRequestMessage,
      ]

      const userMessages = newMessages.filter(
        (message) => message.role === 'user'
      )
      const assistantMessages = newMessages.filter(
        (message) => message.role === 'assistant'
      )

      setMessages(newMessages)

      handleAPICall({
        setMessages,
        apiURL: '/api/code',
        assistantMessages,
        userMessages,
        setIsLoading,
        router,
      })

      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error(error.message)
      }
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading
        description="Turn your ideas into code with Sadge AI!"
        title="Code"
        icon={MessageSquare}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
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
                      placeholder="Write a function to calculate the area of a circle."
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
        <div className="mt-4 space-y-4">
          {messages.length === 0 && !isLoading && (
            <Empty label="No code generated yet." />
          )}
          {messages.length > 0 && <ChatWindow messages={messages} />}
        </div>
      </div>
    </>
  )
}

export default ConversationPage
