import { z } from "zod"


export const loginSchema = z.object({
    email: z.string().email('Email invalid').min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    })
})