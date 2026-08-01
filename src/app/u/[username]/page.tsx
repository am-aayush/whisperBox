"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useEffectEvent, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

const messagePage = () => {
  const [aiSuggestions, setAiSuggestions] = useState(
    "If you could instantly become an expert in any skill or subject, what would you choose and why?||What is a small, everyday adventure you’ve always wanted to go on?||If you were tasked with designing a new holiday, what would it celebrate and how would people spend the day?",
  );
  const { username } = useParams();
  const [isSent, setIsSent] = useState(false);
  const [settingSuggestion, setSettingSuggestion] = useState(false);
  const maxLength = 500;
  const form = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const watchContent = useWatch({
    control: form.control,
    name: "content",
  });
  const onSubmit = async (data: any) => {
    if (data.content.trim()) {
      try {
        const response = await axios.post("/api/send-message", {
          username,
          content: data.content,
        });
        setIsSent(true);
        toast.add({
          type: "success",
          description: response.data.message,
        });
        // reset after some time just for demo
        setTimeout(() => {
          setIsSent(false);
          form.setValue("content", "");
        }, 3000);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message;
        toast.add({
          type: "error",
          description: errorMessage,
        });
      }
    }
  };

  //Ai Suggestion
  const suggestMessages = async () => {
    setSettingSuggestion(true);
    try {
      const res = await axios.post("/api/suggest-messages");
      setAiSuggestions(res.data.message);
      toast.add({
        type: "success",
        description: "Suggestion updated Successfully",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast.add({
        type: "error",
        description: errorMessage,
      });
    }
    setSettingSuggestion(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-primary/10 to-background z-0 pointer-events-none"></div>

      <div className="w-full max-w-xl z-10 space-y-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-accent-500 p-1 shadow-xl">
            <div className="w-full h-full bg-card rounded-full flex items-center justify-center border-2 border-background">
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-500">
                {username?.toString().charAt(0)?.toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Send an anonymous message to{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-500">
                @{username}
              </span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Your identity will remain completely anonymous.
            </p>
          </div>
        </header>

        {/* Main Card */}
        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="rounded-[2rem] shadow-xl border-border/60 bg-card overflow-hidden">
                <CardContent className="p-6 sm:p-8 space-y-4">
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <FieldGroup>
                        <Controller
                          name="content"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel htmlFor="content" className="mb-2">
                                Enter your Message
                              </FieldLabel>
                              <Textarea
                                {...field}
                                id="content"
                                placeholder="Write your anonymous message..."
                                className="min-h-40 resize-none rounded-2xl bg-muted/30 border-border/50 p-4 text-base focus-visible:ring-primary focus-visible:border-primary transition-all pb-10"
                                maxLength={maxLength}
                              />
                            </Field>
                          )}
                        />
                      </FieldGroup>
                      <div className="absolute bottom-4 right-4 text-xs font-medium text-muted-foreground">
                        {watchContent.length}/{maxLength}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={!watchContent.trim()}
                      className="w-full h-12 rounded-xl bg-linear-to-r from-primary to-accent-500 hover:opacity-90 text-primary-foreground shadow-md shadow-primary/20 text-base font-semibold cursor-pointer"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <div className="mt-12 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent-500" />
                      AI Suggested Messages
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Need inspiration? Click any suggestion.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => suggestMessages()}
                  >
                    {settingSuggestion ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    )}
                  </Button>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={aiSuggestions}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                    className="space-y-2"
                  >
                    {aiSuggestions.split("||").map((suggestion, idx) => (
                      <motion.button
                        key={suggestion}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: -15,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.3,
                            },
                          },
                        }}
                        onClick={() => form.setValue("content", suggestion)}
                        className="w-full text-left p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-sm transition-all flex gap-3 group cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-accent-500/50 mt-0.5 group-hover:text-accent-500 transition-colors shrink-0" />
                        <span className="text-sm font-medium text-foreground/90 group-hover:text-primary transition-colors">
                          {suggestion}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground">
                Your message was sent anonymously.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-12 pb-8">
          <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
            Powered by <MessageSquare className="w-4 h-4" />{" "}
            <span className="font-bold text-foreground">WhisperBox</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default messagePage;
