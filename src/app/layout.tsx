import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authProvider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whisper Box",
  description: "A platform for anonymous messaging and communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "scroll-smooth",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        
      )}
      data-scroll-behavior="smooth"
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col">
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
