import * as z from 'zod'

export const formSchema = z.object({
  prompt: z
    .string()
    .min(1, {
      message: 'Please enter a prompt',
    })
    .max(1000, {
      message: 'Prompt must be less than 1000 characters',
    }),
})

export type FormValues = z.infer<typeof formSchema>
