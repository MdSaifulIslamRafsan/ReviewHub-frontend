"use client";

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import CForm from "@/components/form/CForm";
import CInput from "@/components/form/CInput";
import CTextarea from "@/components/form/CTextarea";
import CSelect from "@/components/form/CSelect";
import CRating from "@/components/form/CRating";
import CImageUpload from "@/components/form/CImageUpload";

import { reviewSchema } from "@/schema";
import { updateReview } from "@/services/review";

import { Category } from "@/types/cetegories";
import { Review } from "@/types/reviewTypes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type FormData = z.infer<typeof reviewSchema>;

interface Props {
  review: Review;
  id: string;
  categories: Category[];
}

export default function EditReviewForm({ review, id, categories }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buildFormData = (data: FormData) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("categoryId", data.category);
    formData.append("rating", String(data.rating));
    formData.append("status", review.status || "PENDING");

    if (data.purchaseSource) {
      formData.append("purchaseSource", data.purchaseSource);
    }

    (data.images ?? []).forEach((img) => {
      formData.append("imageUrls", img);
    });

    return formData;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await updateReview(id, buildFormData(data));

      if (res?.success) {
        toast.success("Review updated successfully");
        router.push("/user/reviews");
      } else {
        toast.error(res?.error?.message || "Something went wrong!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const images =
    review.imageUrls?.map((url: string) => ({
      preview: url,
      url,
      name: url.split("/").pop(),
    })) || [];
  return (
    <Card className="w-full p-0">
      <CardContent className="p-4 md:p-6">
        <h2 className="text-lg md:text-2xl 2xl:text-3xl font-bold mb-6">
          Edit Product Review
        </h2>

        <CForm<FormData>
          onSubmit={onSubmit}
          resolver={reviewSchema}
          styles="space-y-6"
          defaultValues={{
            title: review.title,
            description: review.description,
            category: review.categoryId,
            rating: review.rating,
            status: review.status,
            purchaseSource: review.purchaseSource || "",
          }}
        >
          {() => (
            <>
              {/* IMAGE UPLOAD */}
              <CImageUpload
                imagesUrl={images}
                label="Product Images"
                name="images"
              />

              {/* GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 2xl:gap-10">
                <CInput label="Review Title" fieldName="title" required />

                <CInput label="Purchase Source" fieldName="purchaseSource" />

                <CSelect
                  label="Category"
                  name="category"
                  required
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                />
                <CSelect
                  label="Status"
                  name="status"
                  required
                  options={[
                    { label: "PENDING", value: "PENDING" },
                    { label: "DRAFT", value: "DRAFT" },
                  ]}
                />
                <CRating name="rating" label="Rating" required />
              </div>

              {/* DESCRIPTION */}
              <CTextarea
                fieldName="description"
                label="Detailed Review"
                required
              />

              {/* ACTIONS */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/user/reviews")}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Review"}
                </Button>
              </div>
            </>
          )}
        </CForm>
      </CardContent>
    </Card>
  );
}
