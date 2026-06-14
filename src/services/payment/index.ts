/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export const getAllPayment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`);
    const response = await res.json();
    return response.data;
  } catch (error: any) {
    console.error("Error fetching Payments:", error);
    return [];
  }
};

export const createPayment = async (payment: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      }
    );

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const getPaymentByUser = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/my-payment`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    console.log("res", res);

    const data = (await res.json()) || [];
    // console.log("✅ Payments :", data);
    return data.data;
  } catch (error: any) {
    console.error("❌ Error fetching payments:", error.message);
    return null;
  }
};

export const verifyPayment = async (orderId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/verify-payment?order_id=${orderId}`
    );

    if (!response.ok) {
      return { success: false, message: "Failed to verify payment" };
    }
    // console.log("response", response);

    return await response.json();
  } catch (error) {
    console.error("Verify payment error:", error);
    return { success: false, message: "Failed to verify payment" };
  }
};

export const getSinglePayment = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}}`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    // console.log("✅ Payments fetched:", data);
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching payments:", error.message);
    return null;
  }
};

//others purpose
export const getCategoriesAdmin = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = await res.json();

    return data;
  } catch (error: any) {
    return Error(error?.message);
  }
};

export const createPremiumReview = async (formData: FormData) => {
  try {
    // Extract data from FormData and create a properly typed object
    const reviewData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      rating: Number(formData.get("rating")),
      purchaseSource: (formData.get("purchaseSource") as string) || "",
      categoryId: formData.get("categoryId") as string,
      status: formData.get("status") as string,
      isPremium: formData.get("isPremium") === "true",
      price: formData.get("price") ? Number(formData.get("price")) : undefined,
      premiumPrice: formData.get("premiumPrice")
        ? Number(formData.get("premiumPrice"))
        : undefined,
    };

    // Validate premium price if isPremium is true
    if (
      reviewData.isPremium &&
      (reviewData.premiumPrice === undefined || reviewData.premiumPrice <= 0)
    ) {
      return {
        success: false,
        message:
          "Premium price is required for premium reviews and must be greater than 0",
      };
    }

    // Create a new FormData with properly typed values
    const processedFormData = new FormData();

    // Add the JSON data as a single field
    processedFormData.append("data", JSON.stringify(reviewData));

    // Add files separately
    const files = formData.getAll("imageUrls");
    files.forEach((file) => {
      if (file instanceof File) {
        processedFormData.append("imageUrls", file);
      }
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: processedFormData,
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    console.error("API error:", error);
    return { success: false, message: error.message || "An error occurred" };
  }
};
// export const createPremiumReview = async (formData: FormData) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
//       method: "POST",
//       headers: {
//         Authorization: (await cookies()).get("accessToken")!.value,
//         // "Content-Type": "multipart/form-data",
//       },

//       body: formData,
//     });

//     const result = await res.json();
//     return result;
//   } catch (error: any) {
//     console.error("API error:", error);
//     return { success: false, message: error.message || "An error occurred" };
//   }
// };
