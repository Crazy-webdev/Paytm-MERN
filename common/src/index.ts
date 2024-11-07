import { z } from "zod";

export const signupInput=z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string().min(8)
})

export const signinInput=z.object({
    username:z.string().email(),
    password:z.string().min(8)
})

export const updateInput=z.object({
    username:z.string().email().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().min(8).optional()
})
export const transferInput=z.object({
    amount:z.number(),
    to:z.string()
})


export type SignupInput=z.infer<typeof signupInput>;
export type SigninInput=z.infer<typeof signinInput>;
export type UpdateInput=z.infer<typeof updateInput>;
export type TransferInput=z.infer<typeof transferInput>;