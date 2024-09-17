import { z } from "zod"

export const messageSchema = z.object({
    message: z.string().max(100, 'Must not be greater than 100 characters.')
})