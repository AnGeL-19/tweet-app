import { z } from "zod"
import { imageSchema } from "./tweet.schema"

export const commentSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment must be at least 2 characters.",
    }).max(100, 'Must not be greater than 100 characters.'),
    image: imageSchema
})