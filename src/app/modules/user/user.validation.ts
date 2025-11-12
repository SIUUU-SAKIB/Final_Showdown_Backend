import z from "zod";

export const createUserZodSchema = z.object({
    name: z.string("Name is required").min(2, { message: "Name must be at least 2 characters long" }).max(50, { message: "Name cannot exceed 50 character" }),
    email: z
        .string({ message: "Email must be string" })
        .email({ message: "Invalid email address format." })
        .min(5, { message: "Email must be at least 5 characters long." })
        .max(100, { message: "Email cannot exceed 100 characters." }),
    password: z
        .string({ message: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." }),
    role: z
        .enum(Object.values(["admin", "user"]) as [string])
        .optional(),
})