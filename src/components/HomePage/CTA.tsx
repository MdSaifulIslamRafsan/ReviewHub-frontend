import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div
          className="relative overflow-hidden rounded-2xl bg-cover bg-top bg-no-repeat min-h-[350px] flex items-center justify-center"
          style={{ backgroundImage: "url('/images/CTA.png')" }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to share your experience?
            </h2>

            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Join our community today and start sharing your honest product
              reviews with thousands of users.
            </p>

            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              asChild
            >
              <Link href="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
