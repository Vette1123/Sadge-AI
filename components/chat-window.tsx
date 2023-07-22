/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import React from 'react'
import { ChatCompletionRequestMessage } from 'openai'

import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BotAvatar } from '@/components/bot-avatar'
import MarkDown from '@/components/mark-down'
import UserAvatar from '@/components/user-avatar'

function ChatWindow({
  messages,
}: {
  messages: ChatCompletionRequestMessage[]
}) {
  return (
    <ScrollArea className="mt-6 gap-y-4 rounded-md border p-4 sm:mt-10">
      <div className="flex flex-col-reverse gap-y-4">
        {messages.map((message) => (
          <div
            key={message.content}
            className={cn(
              'flex w-full items-start gap-x-8 rounded-lg p-8',
              message.role === 'user'
                ? 'border border-black/10 bg-white dark:bg-black dark:bg-opacity-10'
                : 'bg-muted'
            )}
          >
            {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
            {<MarkDown text={message?.content || ''} />}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default ChatWindow
