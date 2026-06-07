"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Review } from "@/types/reviewTypes";
import { useUser } from "@/context/UserContext";
import { getSingleUserReviews, deleteReview } from "@/services/review";
import { DeleteConfirmationModal } from "@/components/dashboard/DeleteConfirmationModal";
import { toast } from "react-toastify";

const statusVariantMap = {
  DRAFT: "secondary",
  PENDING: "warning",
  PUBLISHED: "success",
  UNPUBLISHED: "destructive",
} as const;

const ReviewsTable = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!user?.userId) return;
      const data = await getSingleUserReviews(user.userId);
      console.log(data);
      setReviews(data?.data || []);
    };
    fetchUserReviews();
  }, [user?.userId]);

  const handleDeleteClick = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteReview(reviewToDelete);
      if (result.success) {
        setReviews(reviews.filter((review) => review.id !== reviewToDelete));
        toast.success(result?.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setReviewToDelete(null);
    }
  };

  return (
    <section className="p-4 md:p-6 pointer-events-auto">
      <h2 className="text-lg md:text-2xl 2xl:text-3xl font-bold mb-4 md:mb-6">
        My Reviews
      </h2>

      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />

      {/* Desktop Table */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/reviews/${review.id}`}
                    className="hover:underline"
                  >
                    {review.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[review.status]}>
                    {review.status.charAt(0).toUpperCase() +
                      review.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{review.category?.name}</TableCell>
                <TableCell>
                  {new Date(review.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {review.isPremium ? (
                    <Badge
                      variant="outline"
                      className="border-purple-500 text-purple-500"
                    >
                      ${review.premiumPrice}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Free</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {review.status === "DRAFT" ||
                      review.status === "PENDING" ? (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/user/reviews/${review.id}`)
                            }
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClick(review.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem
                          disabled
                          className="text-muted-foreground"
                        >
                          Moderated
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Enhanced Mobile Cards */}
      <div className="md:hidden space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 relative"
          >
            {/* Status indicator bar */}
            <div
              className={`absolute top-0 left-0 h-1 w-full rounded-t-xl ${
                review.status === "DRAFT"
                  ? "bg-gray-400"
                  : review.status === "PENDING"
                    ? "bg-yellow-500"
                    : review.status === "PUBLISHED"
                      ? "bg-green-500"
                      : "bg-red-500"
              }`}
            />

            <div className="flex justify-between items-start gap-2 mt-1">
              <div className="flex-1">
                <Link
                  href={`/reviews/${review.id}`}
                  className="hover:underline"
                >
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {review.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={statusVariantMap[review.status]}
                    className="whitespace-nowrap"
                  >
                    {review.status.charAt(0).toUpperCase() +
                      review.status.slice(1)}
                  </Badge>
                  <div className="flex items-start">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={` ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300 fill-gray-300 dark:text-gray-600 dark:fill-gray-600"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {review.status === "DRAFT" || review.status === "PENDING" ? (
                    <>
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/user/reviews/${review.id}`)
                        }
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteClick(review.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem
                      disabled
                      className="text-muted-foreground"
                    >
                      Moderated
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {review.category?.name && (
                  <div className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700">
                    <span className="text-sm font-medium">
                      {review.category.name}
                    </span>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              {review.isPremium ? (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                    PREMIUM
                  </span>
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-500 dark:border-purple-400 dark:text-purple-400"
                  >
                    ${review.premiumPrice}
                  </Badge>
                </div>
              ) : (
                <Badge
                  variant="outline"
                  className="text-green-600 dark:text-green-400 border-green-500 dark:border-green-400"
                >
                  Free
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsTable;
