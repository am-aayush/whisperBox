import {email, z} from 'zod'

export const usernameValidation = z
                                    .string()
                                    .min(2,'Username Must be Atleast 2 Character')
                                    .max(20,"Must be not more than 20 char")
                                    .regex(/^[a-zA-Z0-9_]+$/ ,"Username must not contain special character")

export const signUpSchema = z.object({
    username : usernameValidation,
    email: z.string().email({message:"Invalid Email Address"}),
    password: z.string().min(6,"Min 6 Char Allowed").max(20,"Max 20 Char Allowed")
})                                    