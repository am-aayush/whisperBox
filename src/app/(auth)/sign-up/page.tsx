"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";

const signUp = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const router = useRouter();

  //zod implementataion for form validation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkusernameUnique = async () => {
      const trimmedUsername = username.trim();

      if (!trimmedUsername) {
        setUsernameMessage("");
        setIsCheckingUsername(false);
        return;
      }

      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${trimmedUsername}`,
        );
        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        setUsernameMessage(
          axiosError.response?.data.message ?? "Error Checking Useraname",
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkusernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast.add({
        type: "success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in Signup of User", error);
      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      toast.add({
        type: "error",
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-[2rem] shadow-xl border border-border p-8 md:p-10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-sm text-muted-foreground">Start receiving anonymous messages</p>
        </div>

<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Username"
                    autoComplete="off"
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  {isCheckingUsername && (
                    <p className="text-sm text-muted-foreground">
                      <Loader2 className="w-3 inline" /> Checking username availability...
                    </p>
                  )}
                  <p
                    className={`text-sm ${usernameMessage === "Username is Available" ? "text-green-500" : "text-red-500"}`}
                  >
                    {usernameMessage}
                  </p>
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter You Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait...
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>

        <p className="text-center text-sm mt-8 text-muted-foreground">
          Already have an account? <Link href="/sign-in" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default signUp;
