/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Star, X } from "lucide-react";
import Image from "next/image";
import { updateReview } from "@/services/review";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Category } from "@/types/cetegories";
import { Review } from "@/types/reviewTypes";

interface EditReviewFormProps {
  review: Review;
  categories: Category[];
  id: string;
}

export default function EditReviewForm({
  review,
  categories,
  id,
}: EditReviewFormProps) {
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<
    (File & { preview: string })[]
  >([]);
  const [rating, setRating] = useState(review.rating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: review.title,
      description: review.description,
      purchaseSource: review.purchaseSource,
      category: review.categoryId,
      rating: review.rating,
    },
  });

  useEffect(() => {
    // Initialize form with review data
    setValue("title", review.title);
    setValue("description", review.description);
    setValue("purchaseSource", review.purchaseSource);
    setValue("category", review.categoryId);
    setValue("rating", review.rating);

    const initialImages = review.imageUrls?.map((url) => ({
      preview: url || "",
      name: url.split("/").pop() || "image",
    })) as (File & { preview: string })[];
    setSelectedImages(initialImages);
  }, [review, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previewFiles = files.map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });
      setSelectedImages((prev) => [...prev, ...previewFiles]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue("rating", value);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add all form data
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("rating", rating.toString());
      formData.append("categoryId", data.category);
      formData.append("status", review.status || "PENDING");
      if (data.purchaseSource) {
        formData.append("purchaseSource", data.purchaseSource);
      }

      selectedImages.forEach((file) => {
        if (file instanceof File) {
          formData.append("imageUrls", file);
        } else if (file) {
          formData.append("existingImageUrls", file);
        }
      });

      const response = await updateReview(id, formData);
      console.log(response);

      if (response.success) {
        toast.success(response?.data?.message || "Review updated successfully");
        router.push("/user/reviews");
      } else {
        toast.error(response?.data?.message || "Failed to update review");
      }
    } catch (error: any) {
      console.error("Review update failed:", error);
      toast.error(error.message || "Failed to update review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-lg md:text-2xl 2xl:text-3xl font-bold mb-4 md:mb-6">
        Edit Product Review
      </h2>
      <Card className="max-w-2xl w-full">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Review Title*</Label>
              <Input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="e.g., Amazing Bluetooth Headphones"
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">
                  {(errors.title as FieldError).message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Review*</Label>
              <Textarea
                id="description"
                rows={6}
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Share your experience with this product..."
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {(errors.description as FieldError).message}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Rating*</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-primary focus:outline-none"
                  >
                    <Star
                      className={`h-5 w-5 md:h-6 md:w-6 ${
                        rating >= star
                          ? "fill-current text-yellow-500"
                          : "stroke-current text-gray-400"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} out of 5
                </span>
              </div>
              <input
                type="hidden"
                {...register("rating", { required: "Rating is required" })}
              />
              {errors.rating && (
                <p className="text-sm text-red-500">
                  {(errors.rating as FieldError).message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={review.categoryId || ""}
              >
                <SelectTrigger
                  className={errors.category ? "border-red-500" : ""}
                  id="category"
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">
                  {(errors.category as FieldError).message}
                </p>
              )}
            </div>

            {/* Purchase Source */}
            <div className="space-y-2">
              <Label htmlFor="purchaseSource">
                Where did you purchase this? (Optional)
              </Label>
              <Input
                id="purchaseSource"
                type="url"
                {...register("purchaseSource")}
                placeholder="https://www.amazon.com/product-link"
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {selectedImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedImages.map((file, index) => (
                    <div
                      key={index}
                      className="relative h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden border group"
                    >
                      <Image
                        src={file.preview || "/placeholder-image.jpg"}
                        alt={`Preview ${index + 1}`}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/user/reviews")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Review"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
