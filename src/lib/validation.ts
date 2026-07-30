import { z } from "zod";

export const MAX_CV_BYTES = 10 * 1024 * 1024; // 10 MB
export const CV_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export const EXPERIENCE_VALUES = [
  "less-than-1",
  "1-2",
  "3-5",
  "6-8",
  "9-plus",
] as const;

export const applicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Enter your full name." })
    .max(120, { message: "Keep your name under 120 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Enter your email address." })
    .email({ message: "Enter a valid email address." }),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Enter a valid phone number." })
    .max(24, { message: "Enter a valid phone number." })
    .regex(/^\+?[0-9()[\]\s.\-/]{5,23}$/, {
      message: "Use digits and + ( ) - . characters only.",
    }),
  experience: z.enum(EXPERIENCE_VALUES, {
    message: "Select your experience level.",
  }),
  skills: z
    .array(
      z
        .string()
        .trim()
        .min(1)
        .max(64, { message: "Keep each skill under 64 characters." }),
    )
    .min(1, { message: "Select at least one skill." })
    .max(24, { message: "Keep the list focused — 24 skills at most." }),
  cv: z
    .custom<File>((value) => typeof File !== "undefined" && value instanceof File, {
      message: "Attach your CV as PDF, DOC or DOCX.",
    })
    .refine((file) => file.size > 0, {
      message: "The selected file appears to be empty.",
    })
    .refine((file) => file.size <= MAX_CV_BYTES, {
      message: "Keep your CV at 10 MB or under.",
    })
    .refine(
      (file) =>
        CV_EXTENSIONS.some((extension) =>
          file.name.toLowerCase().endsWith(extension),
        ),
      { message: "Accepted formats: PDF, DOC, DOCX." },
    ),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
