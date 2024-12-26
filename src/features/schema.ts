import * as z from "zod"

export const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  date: z.date(),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  role: z.string().min(1, { message: "Please select a role" }),
  file: z.instanceof(FileList).optional(),
})

export type FormValues = z.infer<typeof formSchema>