import { z } from "zod"


export const profileSchema = z.object({
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    }),
    password: z.string()
    .min(8, {
        message: "Password must be at least 8 characters."
    })
    .optional()
    .or(z.literal('')),
    bio: z.string().min(5, {
        message: "Must be at least 5 characters."
    }).max(100, 'Must not be greater than 100 characters.'),
})