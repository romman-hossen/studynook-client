"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, TextField, Label, Input, InputGroup, FieldError, Button } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import GoogleButton from "./GoogleButton";
import toast from "react-hot-toast";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineExclamationCircle,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import Spinner from "@/components/common/Spinner";

 function LoginFormInner() {
  const { user, isLoading, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inlineError, setInlineError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to home if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInlineError("");

    if (!email.trim() || !password) {
      const msg = "Please enter both email and password";
      setInlineError(msg);
      toast.error(msg);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(email.trim(), password);

      if (!result?.success) {
        const errorMsg = result?.error || "Invalid email or password";
        setInlineError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("Welcome back!");
        router.push(redirectPath);
      }
    } catch {
      const errorMsg = "An unexpected error occurred during login";
      setInlineError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || user) {
    return <Spinner fullPage label="Loading..." />;
  }

  return (
    <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-surface shadow-xl">
      {/* Left Form Section */}
      <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-10 md:w-1/2 md:py-12">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground font-heading font-bold text-lg mb-4"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
              <HiOutlineBookOpen className="h-4 w-4" />
            </div>
            <span>
              Study<span className="text-primary">Nook</span>
            </span>
          </Link>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-muted">
            Sign in to access your study room reservations.
          </p>
        </div>

        {/* Inline Error Alert */}
        {inlineError && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger animate-in fade-in duration-200"
          >
            <HiOutlineExclamationCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{inlineError}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field with HeroUI v3 TextField, Label, Input, FieldError */}
          <TextField
            name="email"
            type="email"
            isRequired
            isInvalid={!!inlineError && !email.trim()}
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Email Address
            </Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (inlineError) setInlineError("");
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full"
            />
            <FieldError />
          </TextField>

          {/* Password Field with HeroUI v3 InputGroup & Button toggle */}
          <TextField
            name="password"
            isRequired
            isInvalid={!!inlineError && !password}
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Password
            </Label>
            <InputGroup className="w-full">
              <InputGroup.Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (inlineError) setInlineError("");
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full"
              />
              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  onPress={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted hover:text-foreground"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="h-4 w-4" />
                  ) : (
                    <HiOutlineEye className="h-4 w-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          {/* Submit Button using HeroUI v3 Button */}
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isDisabled={isSubmitting}
            className="w-full rounded-xl py-2.5 text-sm font-semibold shadow-xs"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Signing in...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <span className="relative bg-surface px-3 text-xs font-medium uppercase tracking-wider text-muted">
            or continue with
          </span>
        </div>

        {/* Google OAuth Button */}
        <GoogleButton
          disabled={isSubmitting}
          onSuccess={() => router.push(redirectPath)}
        />

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Right Desktop Hero Panel */}
      <div className="relative hidden w-1/2 md:block">
        <img
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80"
          alt="Study Room Sanctuary"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold w-fit mb-3">
            Academic Focus
          </span>
          <h3 className="font-heading text-2xl font-bold leading-tight">
            Reserve quiet study rooms in seconds.
          </h3>
          <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-sm">
            Join hundreds of students and researchers finding their ideal study sanctuary every day.
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginFormInner

// export default function LoginForm() {
//   return (
//     <Suspense fallback={<Spinner fullPage label="Loading login form..." />}>
//       <LoginFormInner />
//     </Suspense>
//   );
// }
