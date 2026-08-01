"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LockKeyhole,
  MessageSquare,
  Shield,
  Sparkles,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  // const [darkMode, setDarkMode] = useState(false);
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme === "dark") {
  //     setDarkMode(true);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative">
      {/* <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div> */}
      <div className="min-h-screen bg-background overflow-hidden relative">
        {/* Background Gradient */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <header className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
          <div className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-primary" />
            WhisperBox
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How it Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Button className="rounded-full shadow-md shadow-primary/20 bg-linear-to-r from-primary to-accent-500 hover:opacity-90 transition-opacity">
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-6 relative z-10">
          {/* Hero Section */}
          <section className="py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6"
              >
                Receive{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-500">
                  Anonymous Messages
                </span>{" "}
                with Confidence.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Create your anonymous inbox in seconds and let your friends
                share anything without revealing who they are.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="rounded-full shadow-lg shadow-primary/25 bg-linear-to-r from-primary to-accent-500 hover:opacity-90"
                >
                  <Link href="/sign-up">Get Started</Link>
                </Button>                
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="flex-1 relative w-full max-w-lg aspect-square"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-accent-500/10 rounded-[2rem] border border-white/10 dark:border-white/5 backdrop-blur-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/4 left-1/4 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3 z-20"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <LockKeyhole className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="h-2 w-20 bg-muted rounded-full mb-2"></div>
                    <div className="h-2 w-12 bg-muted rounded-full"></div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute bottom-1/4 right-1/4 bg-card p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3 z-10"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-accent-500" />
                  </div>
                  <div>
                    <div className="h-2 w-24 bg-muted rounded-full mb-2"></div>
                    <div className="h-2 w-16 bg-muted rounded-full"></div>
                  </div>
                </motion.div>

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/5 via-background/0 to-background/0"></div>
              </div>
            </motion.div>
          </section>

          {/* Features */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Premium Features
              </h2>
              <p className="text-muted-foreground">
                Everything you need for a secure anonymous messaging experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border/50 shadow-md bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Anonymous Messaging</CardTitle>
                  <CardDescription>
                    Receive messages from anyone without revealing identities.
                    End-to-end privacy.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50 shadow-md bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-accent-500" />
                  </div>
                  <CardTitle>AI Message Suggestions</CardTitle>
                  <CardDescription>
                    Generate interesting conversation starters using AI to spark
                    engaging discussions.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-border/50 shadow-md bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Private Dashboard</CardTitle>
                  <CardDescription>
                    Manage all received anonymous messages in one beautiful,
                    secure place.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 mb-20">
            <div className="rounded-[2.5rem] bg-linear-to-r from-primary to-accent-500 p-12 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to hear what people really think?
                </h2>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full bg-white text-primary hover:bg-white/90"
                >
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
            <div>&copy; 2024 WhisperBox. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Github
              </Link>
              <Link href="#" className="hover:text-foreground">
                Twitter
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
