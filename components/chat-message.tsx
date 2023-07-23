import React from 'react'
import { Loader2 } from 'lucide-react'
import { ChatCompletionRequestMessage } from 'openai'

import { cn } from '@/lib/utils'
import { MemoizedChatAvatar } from '@/components/chat-avatar'
import { MemoizedMarkDown } from '@/components/mark-down'

interface Props {
  message: ChatCompletionRequestMessage
}

function ChatMessage({ message }: Props) {
  return (
    <div
      key={message.content}
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className={cn(
        'flex w-full items-start gap-x-8 rounded-lg p-8',
        message.role === 'user'
          ? 'border border-black/10 bg-white dark:bg-black dark:bg-opacity-10'
          : 'bg-muted'
      )}
    >
      <MemoizedChatAvatar isUser={message.role === 'user'} />
      {!message.content ? (
        <Loader2 className="h-8 w-8 animate-spin" />
      ) : (
        <MemoizedMarkDown text={message?.content || ''} />
      )}
    </div>
  )
}

export default ChatMessage
