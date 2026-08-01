"use client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code,
      });
      toast.add({
        type: "success",
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in Signup of User", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast.add({
        type: "error",
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-[2rem] shadow-xl border border-border p-8 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Verify Your Email
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Enter the 6-digit verification code sent to your email.
          </p>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="code">Verification Code</FieldLabel>
                    {/* <Input
                      {...field}
                      id="code"
                      aria-invalid={fieldState.invalid}
                      placeholder="Verification Code"
                      autoComplete="off"
                    /> */}
                    <InputOTP
                      maxLength={6}
                      {...field}
                      id="code"
                      aria-invalid={fieldState.invalid}
                      containerClassName="justify-center w-full"
                    >
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={0} className="p-5 border-[2.5px] border-black " />
                        <InputOTPSlot index={1} className="p-5 border-[2.5px] border-black " />
                        <InputOTPSlot index={2} className="p-5 border-[2.5px] border-black " />
                        <InputOTPSlot index={3} className="p-5 border-[2.5px] border-black " />
                        <InputOTPSlot index={4} className="p-5 border-[2.5px] border-black " />
                        <InputOTPSlot index={5} className="p-5 border-[2.5px] border-black " />
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 h-11 cursor-pointer"
            >
              Verify
            </Button>
          </form>

          <p className="text-center text-sm mt-8 text-muted-foreground">
            Didn't receive code?{" "}
            <button className="text-primary font-medium hover:underline">
              Resend OTP
            </button>{" "}
            (59s)
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyAccount;
