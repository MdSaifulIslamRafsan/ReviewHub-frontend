/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/auth";
import { toast } from "react-toastify";

interface NavLink {
  href: string;
  label: string;
  adminOnly?: boolean;
  userOnly?: boolean;
  premiumOnly?: boolean;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useUser();
  // console.log(user);
  const handleLogout = async () => {
    // todo: add logout functionality
    try {
      await logout();
      toast.success("Logged out successfully.");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.message || "Failed to logout. Please try again.");
    }
  };

  const allLinks: NavLink[] = [
    // Admin-only links
    { href: "/admin/dashboard", label: "Dashboard", adminOnly: true },
    { href: "/admin/reviews", label: "Review Management", adminOnly: true },
    {
      href: "/admin/create-categories",
      label: "Create Categories",
      adminOnly: true,
    },
    {
      href: "/admin/create-premium-review",
      label: "Create Premium review",
      adminOnly: true,
    },
    { href: "/admin/payments", label: "Payment Analytics", adminOnly: true },

    // User-only links
    // { href: '/user/dashboard', label: 'Dashboard', userOnly: true },
    { href: "/user/reviews", label: "My Reviews", userOnly: true },
    { href: "/user/create-review", label: "Create Review", userOnly: true },
    { href: "/user/user-payment", label: "Payment History", userOnly: true },
  ];

  // Filter links based on user role
  const filteredLinks = allLinks.filter((link) => {
    if (isLoading) return false;
    if (!user) return false;

    if (link.adminOnly) return user.role === "ADMIN";
    if (link.userOnly) return user.role === "USER";

    return true; // Show links with no role restrictions
  });

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden pointer-events-auto fixed z-50 right-0 p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4 flex flex-col">
            <div>
              <Link href="/" className="flex items-center gap-2 pl-1">
                <span className="text-xl font-bold text-primary">
                  ReviewHub
                </span>
              </Link>
              <nav className="flex flex-col space-y-2 mt-6">
                {filteredLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`p-2 rounded-md text-sm font-medium hover:bg-muted ${
                      pathname === link.href ? "bg-muted font-semibold" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Logout button at bottom for mobile */}
            <Button
              variant="ghost"
              className="mt-auto w-full justify-start gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-64 p-4 border-r min-h-screen lg:flex flex-col">
        <div>
          <Link href="/" className="flex items-center gap-2 pb-5 pl-1">
            <span className="text-xl font-bold text-primary">ReviewHub</span>
          </Link>
          <nav className="flex flex-col space-y-2">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`p-2 rounded-md text-sm font-medium hover:bg-muted ${
                  pathname === link.href ? "bg-muted font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout button at bottom for desktop */}
        <Button
          variant="ghost"
          className="mt-auto w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </aside>
    </>
  );
}
