import { z } from "zod"

export const SignUpValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  clientId: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    {
      required_error:
        "Please select the company or organization that you belong to.",
    }
  ),
})

export const CreateAccountValidation = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})

export const AccountValidation = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  file: z.custom<File[]>(),
})

export const ClientValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  description: z.string().optional(),
  website: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  x: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  file: z.custom<File[]>(),
})

export const FeedbackRequestValidation = z.object({
  link: z
    .string()
    .url({ message: "Invalid url. Please add https." })
    .optional()
    .or(z.literal("")),
  file: z.custom<File[]>(),
})

export const MilestoneValidation = z.object({
  title: z
    .string()
    .min(2, { message: "Minimum 2 characters." })
    .max(255, { message: "Maximum 255 caracters" }),
})

export const FeedbackValidation = z.object({
  text: z.string().max(2200, { message: "Maximum 2200 caracters" }).optional(),
  label: z.string().optional(),
})

export const ResetValidation = z.object({
  email: z.string().email(),
})

export const PasswordsValidation = z.object({
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
})
