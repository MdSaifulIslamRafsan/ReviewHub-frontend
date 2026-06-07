import { z } from "zod";

// Define the review form schema with proper enum for status
export const reviewFormSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be less than 100 characters"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    rating: z
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    purchaseSource: z.string().optional(),
    categoryId: z.string().min(1, "Category is required"),
    status: z.enum(["DRAFT", "PUBLISHED", "UNPUBLISHED", "PENDING"]),
    isPremium: z.boolean(),
    price: z.number().optional(),
    premiumPrice: z.number().optional(),
  })
  .refine(
    (data) => {
      // If isPremium is true, premiumPrice must be defined and > 0
      return (
        !data.isPremium ||
        (data.premiumPrice !== undefined && data.premiumPrice > 0)
      );
    },
    {
      message:
        "Premium price is required for premium reviews and must be greater than 0",
      path: ["premiumPrice"], // This targets the error at the premiumPrice field
    },
  );

// Type for the form values
export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export const reviewSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Category is required"),
  rating: z.number().min(1, "Please select a rating"),
  purchaseSource: z
    .string()
    .optional()
    .refine((val) => !val || val.startsWith("http"), {
      message: "Must be a valid URL",
    }),
  images: z.array(z.instanceof(File)).optional(),
  status: z.enum(["PENDING", "DRAFT", "UNPUBLISHED", "PUBLISHED"]).optional(),
});
