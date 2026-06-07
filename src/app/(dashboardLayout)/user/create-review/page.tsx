"use client";

import { useEffect, useRef, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
import { Star, X, ImagePlus, Upload } from "lucide-react";
import Image from "next/image";
import { createNormalReview } from "@/services/review";
import { getCategories } from "@/services/category";
import { Category } from "@/types/cetegories";
import { toast } from "react-toastify";

export default function ReviewForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data?.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
      title: "",
      description: "",
      category: "",
      purchaseSource: "",
    },
  });

  const rating = watch("rating");

  // Image helpers──
  const addFiles = (files: FileList | File[]) => {
    const incoming = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!incoming.length) return;
    setSelectedImages((prev) => [...prev, ...incoming]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  // Drag & drop handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  // Rating
  const handleRatingChange = (value: number) => {
    setValue("rating", value, { shouldValidate: true });
  };

  const ratingLabels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  };

  // Form data builder
  const buildFormData = (data: FieldValues, status: string) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("rating", data.rating.toString());
    formData.append("categoryId", data.category);
    formData.append("status", status);
    if (data.purchaseSource) formData.append("purchaseSource", data.purchaseSource);
    selectedImages.forEach((file) => formData.append("imageUrls", file));
    return formData;
  };

  const resetForm = () => {
    reset();
    setSelectedImages([]);
  };

  // Submit handlers
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await createNormalReview(buildFormData(data, "PENDING"));
      if (response?.success) {
        toast.success(response.message || "Review submitted successfully!");
        resetForm();
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAsDraft: SubmitHandler<FieldValues> = async (data) => {
    setIsDrafting(true);
    try {
      const response = await createNormalReview(buildFormData(data, "DRAFT"));
      if (response?.success) {
        toast.success(response.message || "Draft saved successfully!");
        resetForm();
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Failed to save draft");
    } finally {
      setIsDrafting(false);
    }
  };

  const SpinnerIcon = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <section className="p-4 md:p-6">
      <Card className="w-full p-0">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-lg md:text-2xl 2xl:text-3xl font-bold mb-4 md:mb-6">
            Create Product Review
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Drag & Drop Image Zone */}
            <div className="space-y-2">
              <Label>Product Images (Optional)</Label>

              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => selectedImages.length === 0 && fileInputRef.current?.click()}
                className={[
                  "relative w-full rounded-xl border-2 border-dashed transition-colors duration-200",
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 bg-muted/20 hover:border-primary/40 hover:bg-muted/30",
                  selectedImages.length === 0 ? "cursor-pointer" : "",
                ].join(" ")}
              >
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />

                {selectedImages.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 select-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        Drag & drop images here
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        or{" "}
                        <span className="text-primary underline underline-offset-2">
                          browse files
                        </span>
                      </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground/70">
                      PNG, JPG, WEBP supported
                    </p>
                  </div>
                ) : (
                  /* Previews grid */
                  <div className="p-3">
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
                      {selectedImages.map((file, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square rounded-lg overflow-hidden border border-border/60 bg-muted shadow-sm"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                            aria-label="Remove image"
                            className="absolute top-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                          >
                            <X className="h-3 w-3 text-white" />
                          </button>
                          {/* Index badge */}
                          <span className="absolute bottom-1 left-1 text-[9px] font-medium bg-black/50 text-white rounded px-1 leading-4">
                            {index + 1}
                          </span>
                        </div>
                      ))}

                      {/* Add more tile */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40 transition-colors flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
                      >
                        <ImagePlus className="h-5 w-5" />
                        <span className="text-[10px] font-medium">Add more</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Drag-over overlay (shown while dragging onto a filled zone) */}
                {isDragOver && selectedImages.length > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/10 pointer-events-none z-20">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        Drop to add images
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {selectedImages.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedImages.length} image{selectedImages.length > 1 ? "s" : ""} selected
                  {" · "}
                  <button
                    type="button"
                    onClick={() => setSelectedImages([])}
                    className="text-destructive hover:underline"
                  >
                    Remove all
                  </button>
                </p>
              )}
            </div>

            {/* Grid fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Title */}
              <div className="space-y-2">
                <Label>
                  Review Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  {...register("title", {
                    required: "Title is required",
                    minLength: { value: 5, message: "Title must be at least 5 characters" },
                  })}
                  placeholder="Amazing Bluetooth Headphones"
                  className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message as string}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label>
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(v) => setValue("category", v, { shouldValidate: true })}>
                  <SelectTrigger className={`w-full ${errors.category ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("category", { required: "Please select a category" })}
                />
                {errors.category && (
                  <p className="text-xs text-destructive">{errors.category.message as string}</p>
                )}
              </div>

              {/* Purchase Source */}
              <div className="space-y-2">
                <Label>Purchase Source</Label>
                <Input
                  {...register("purchaseSource", {
                    pattern: {
                      value: /^(https?:\/\/).+/,
                      message: "Enter a valid URL starting with http:// or https://",
                    },
                  })}
                  placeholder="https://amazon.com/..."
                  className={errors.purchaseSource ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.purchaseSource && (
                  <p className="text-xs text-destructive">{errors.purchaseSource.message as string}</p>
                )}
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>
                  Rating <span className="text-destructive">*</span>
                </Label>
                <input
                  type="hidden"
                  {...register("rating", {
                    required: "Please select a rating",
                    min: { value: 1, message: "Please select a rating" },
                  })}
                />
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                        aria-label={`Rate ${star} out of 5`}
                      >
                        <Star
                          className={`h-7 w-7 transition-colors duration-100 ${
                            (hoveredStar || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {(hoveredStar || rating) > 0 && (
                    <span className="text-sm font-medium text-foreground">
                      {ratingLabels[hoveredStar || rating]}
                    </span>
                  )}
                </div>
                {errors.rating && (
                  <p className="text-xs text-destructive">{errors.rating.message as string}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>
                Detailed Review <span className="text-destructive">*</span>
              </Label>
              <Textarea
                rows={8}
                {...register("description", {
                  required: "Description is required",
                  minLength: { value: 20, message: "Description must be at least 20 characters" },
                })}
                placeholder="Tell us about your experience with this product..."
                className={errors.description ? "border-destructive focus-visible:ring-destructive" : ""}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message as string}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isDrafting || isSubmitting}
                onClick={handleSubmit(saveAsDraft)}
              >
                {isDrafting ? <><SpinnerIcon />Saving Draft...</> : "Save Draft"}
              </Button>

              <Button
                type="submit"
                size="lg"
                className="px-8"
                disabled={isSubmitting || isDrafting}
              >
                {isSubmitting ? <><SpinnerIcon />Submitting...</> : "Submit Review"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}