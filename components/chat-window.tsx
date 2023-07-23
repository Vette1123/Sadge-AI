import React from 'react'
import { ChatCompletionRequestMessage } from 'openai'

import { ScrollArea } from '@/components/ui/scroll-area'
import ChatMessage from '@/components/chat-message'

interface Props {
  messages: ChatCompletionRequestMessage[]
}

function ChatWindow({ messages }: Props) {
  return (
    <ScrollArea className="my-6 max-h-[calc(100vh-27rem)] gap-y-4 overflow-y-auto rounded-md border p-4 sm:my-10">
      <div className="flex flex-col-reverse gap-y-4">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default ChatWindow
