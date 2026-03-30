import { z } from "zod"

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(100, {
      message: "name must be less than 100 characters.",
    }),
  category: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().multipleOf(0.01).min(0, {
    message: "price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length
      return wordCount >= 1 && wordCount <= 1000
    },
    {
      message: "description must be between 1 and 1000 words.",
    },
  ),
})

export function validateWithZodSchema<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
) {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message)
    throw new Error(errors.join(", "))
  }
  return result.data
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
})
