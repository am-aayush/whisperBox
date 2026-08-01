"use client";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inbox, LogOut, MessageSquare, Router, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const handelLogout = async () => {
    // Implement your logout logic here
    setIsLoggingOut(true);
    const data = await signOut({redirect: false, callbackUrl: "/"})
    router.push(data.url);
  };

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-50 z-50">
        <div className="bg-card p-6 rounded-lg shadow-lg text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg font-medium">Please wait...</p>
        </div>
      </div>
    );
  } else if (status === "unauthenticated") {
      router.push("/");      
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-50 z-50">
        <div className="bg-card p-6 rounded-lg shadow-lg text-center">
          <div className="flex items-center justify-center mb-4">
            {/* //Danger Cross Symbol */}
          </div>
          <p className="text-lg font-medium">
            You are not Allowed to Acccess this Page...            
          </p>
        </div>
      </div>
    );    
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-6 flex items-center gap-2 font-bold text-lg">
          <MessageSquare className="w-6 h-6 text-primary" />
          WhisperBox
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link
            href="/dashboard"
            className={`flex ${pathname === "/dashboard" ? "bg-primary/10" : ""} items-center gap-3 px-3 py-2.5 rounded-lg text-primary font-medium`}
          >
            <Inbox className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/messages"
            className={`flex ${pathname === "/dashboard/messages" ? "bg-primary/10" : ""} items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors`}
          >
            <MessageSquare className="w-5 h-5" />
            Messages
          </Link>
          <Link
            href="/dashboard/settings"
            className={`flex ${pathname === "/dashboard/settings" ? "bg-primary/10" : ""} items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            onClick={handelLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
      {isLoggingOut === true ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-50 z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <p className="text-lg font-medium">Logging out...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
