import React from 'react'
import { Bot, UserCircle2 } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'

interface Props {
  isUser: boolean
}

const ChatAvatar = ({ isUser }: Props) => {
  return (
    <Avatar className="h-8 w-8">
      {isUser ? (
        <UserCircle2 className="h-8 w-8" />
      ) : (
        <Bot className="h-8 w-8" />
      )}
    </Avatar>
  )
}
export const MemoizedChatAvatar = React.memo(ChatAvatar)
