"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Payment {
  id: string;
  amount: number;
  transactionId: string;
  status: "PAID" | "PENDING" | "FAILED";
  reviewTitle?: string;
  reviewId?: string;
  createdAt: string;
}

interface UserPaymentHistoryProps {
  payments: Payment[] | null | undefined;
}

const UserPaymentHistory = ({ payments }: UserPaymentHistoryProps) => {
  // Safely handle null or undefined payments
  const paymentData = payments || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <h2 className="text-lg md:text-2xl 2xl:text-3xl font-bold">
          Payment History
        </h2>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto min-h-[calc(100vh-150px)]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Review</TableHead>
                <TableHead className="hidden md:table-cell whitespace-nowrap">
                  Date
                </TableHead>
                <TableHead className="whitespace-nowrap">Amount</TableHead>
                <TableHead className="hidden sm:table-cell whitespace-nowrap">
                  Status
                </TableHead>
                <TableHead className="hidden lg:table-cell whitespace-nowrap">
                  Transaction ID
                </TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    You haven&apos;t made any payments yet.
                  </TableCell>
                </TableRow>
              ) : (
                paymentData.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-[150px] sm:max-w-[200px] md:max-w-[300px] truncate">
                        {payment.reviewTitle || "Premium Review"}
                      </div>
                      <div className="md:hidden text-xs text-muted-foreground mt-1">
                        {formatDate(payment.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell whitespace-nowrap">
                      {formatDate(payment.createdAt)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      Tk {payment.amount}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell whitespace-nowrap">
                      <Badge
                        variant={
                          payment.status === "PAID" ? "success" : "default"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-mono text-xs">
                        {payment.transactionId}
                      </span>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {payment.reviewId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="p-0 h-8 w-8"
                        >
                          <Link href={`/reviews/${payment.reviewId}`}>
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View Review</span>
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPaymentHistory;
