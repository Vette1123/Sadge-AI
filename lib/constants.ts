import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'

const dashboardTools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: '/conversation',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: '/music',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
    href: '/image',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
    href: '/video',
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
    href: '/code',
  },
]
const MAX_FREE_COUNTS = 10

const CONVERSATION_PROMPT =
  'You are an ai assistant, you are here to help people with their problems, you are a friendly ai assistant giving people advice on their problems.'

const CODE_PROMPT =
  'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.'

const EVENT_STREAM_HEADERS = 'text/event-stream'
const APPLICATION_JSON_HEADERS = 'application/json'
const USER = 'user'
const ASSISTANT = 'assistant'

export {
  dashboardTools,
  MAX_FREE_COUNTS,
  CONVERSATION_PROMPT,
  EVENT_STREAM_HEADERS,
  APPLICATION_JSON_HEADERS,
  USER,
  ASSISTANT,
  CODE_PROMPT,
}
