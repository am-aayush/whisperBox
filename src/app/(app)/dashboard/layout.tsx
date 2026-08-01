"use client";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inbox, LogOut, MessageSquare, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
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
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
      {children}
    </div>
  );
}
