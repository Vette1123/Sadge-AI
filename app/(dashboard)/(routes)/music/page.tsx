'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Music } from 'lucide-react'
import { ChatCompletionRequestMessage } from 'openai'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Empty } from '@/components/empty'
import { Heading } from '@/components/heading'
import { Loader } from '@/components/loader'

import { formSchema } from './constants'

function MusicPage() {
  const [music, setMusic] = useState<string>('')
  const router = useRouter()
  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  })
  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: FormValues) => {
    try {
      setMusic('')

      const response = await axios.post('/api/music', values)
      console.log(response)

      setMusic(response.data.audio)
      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        // proModal.onOpen()
      } else {
        toast.error('Something went wrong.')
      }
    } finally {
      router.refresh()
    }
  }
  return (
    <>
      <Heading
        description="Turn your prompt into a music"
        title="Music Generation"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                        placeholder="A song about a dog"
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
          {isLoading && (
            <div className="flex w-full items-center justify-center rounded-lg bg-muted p-8">
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label="No music generated." />}
          <div className="flex flex-col-reverse gap-y-4">
            {/* music here */}
          </div>
        </div>
      </div>
    </>
  )
}

export default MusicPage
