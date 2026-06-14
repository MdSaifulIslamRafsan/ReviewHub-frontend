"use client";

import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { useUser } from "@/context/UserContext";
import { createPayment } from "@/services/payment";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckoutPage = ({ review }: { review: any }) => {
  // console.log(review.data);
  const { user } = useUser();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log({ setIsLoading, setError });
  //payment
  const handlePayment = async () => {
    const paymentData = {
      userId: user?.userId,
      reviewId: review?.data?.id,
    };
    try {
      const res = await createPayment(paymentData);
      console.log(res);
      if (res?.data?.checkout_url?.checkoutUrl) {
        window.location.href = res.data.checkout_url.checkoutUrl;
        toast.success(res.message);
      } else {
        toast.error(res.message || "Payment initiation failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container py-20 mx-auto">
      <div className="mx-auto max-w-md">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-center">Checkout</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2">
                Title {review.data.title || "Premium Review"}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Review ID: {review.data.id}
              </p>
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Premium Price:</span>
                <span className="text-lg font-bold">
                  {review.data.premiumPrice || "4.99"}
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-800 rounded-md text-sm">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter>
            <Button
              onClick={handlePayment}
              className="w-full py-6 text-lg"
              disabled={isLoading || !review.data.id}
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Payment
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
