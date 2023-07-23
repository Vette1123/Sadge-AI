import * as z from 'zod'

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, {
      message: 'Image prompt is required',
    })
    .max(1000, {
      message: 'Prompt must be less than 1000 characters',
    }),
  amount: z.string().min(1, {
    message: 'Amount is required',
  }),
  resolution: z.string().min(1, {
    message: 'Resolution is required',
  }),
})

export type FormValues = z.infer<typeof formSchema>

export const amountOptions = [
  {
    label: '1 Image',
    value: '1',
  },
  {
    label: '2 Images',
    value: '2',
  },
  { label: '3 Images', value: '3' },
  { label: '4 Images', value: '4' },
  { label: '5 Images', value: '5' },
]

export const resolutionOptions = [
  {
    label: '256x256',
    value: '256x256',
  },
  { label: '512x512', value: '512x512' },
  { label: '1024x1024', value: '1024x1024' },
  { label: '1280x720', value: '1280x720' },
  { label: '1920x1080', value: '1920x1080' },
]
