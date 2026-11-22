"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  TextField,
  Label,
  Input,
  InputGroup,
  Description,
  FieldError,
  Button,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";
import GoogleButton from "./GoogleButton";
import { validatePassword, validateEmail } from "@/lib/validators";
import toast from "react-hot-toast";
import {
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineCheck,
  HiOutlineXMark,
  HiOutlineBookOpen,
} from "react-icons/hi2";
import Spinner from "@/components/common/Spinner";

const DEFAULT_SAMPLE_PHOTO =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

function RegisterFormInner() {
  const { user, isLoading, register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [photoURL, setPhotoURL] = useState(DEFAULT_SAMPLE_PHOTO);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [inlineError, setInlineError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to home if already logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  // Live password validation
  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInlineError("");
    setPasswordTouched(true);
    setEmailTouched(true);

    if (!name.trim()) {
      const msg = "Please enter your name";
      setInlineError(msg);
      toast.error(msg);
      return;
    }

    if (!validateEmail(email)) {
      const msg = "Please enter a valid email address";
      setInlineError(msg);
      toast.error(msg);
      return;
    }

    if (!photoURL.trim()) {
      const msg = "Photo URL is required";
      setInlineError(msg);
      toast.error(msg);
      return;
    }

    if (!passwordValidation.isValid) {
      const msg = "Password does not meet the security requirements";
      setInlineError(msg);
      toast.error("Please fulfill all password requirements");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await register({
        name: name.trim(),
        email: email.trim(),
        photoURL: photoURL.trim(),
        password,
      });

      if (!result?.success) {
        const errorMsg = result?.error || "Registration failed";
        setInlineError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("Registration successful! Please login.");
        router.push("/login");
      }
    } catch {
      const errorMsg = "An unexpected error occurred during registration";
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
            Create an account
          </h2>
          <p className="mt-1 text-sm text-muted">
            Start booking and listing study rooms today.
          </p>
        </div>

        {/* Inline Error Box */}
        {inlineError && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-danger/30 bg-danger/10 p-3 text-sm text-danger animate-in fade-in duration-200"
          >
            <span>{inlineError}</span>
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <TextField
            name="name"
            isRequired
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Full Name
            </Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (inlineError) setInlineError("");
              }}
              placeholder="Alex Johnson"
              autoComplete="name"
              className="w-full"
            />
            <FieldError />
          </TextField>

          {/* Email Address */}
          <TextField
            name="email"
            type="email"
            isRequired
            isInvalid={emailTouched && !validateEmail(email)}
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
              Email Address
            </Label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTouched(true);
                if (inlineError) setInlineError("");
              }}
              placeholder="alex@university.edu"
              autoComplete="email"
              className="w-full"
            />
            <FieldError>Please enter a valid email address</FieldError>
          </TextField>

          {/* Photo URL */}
          <TextField
            name="photoURL"
            type="url"
            isRequired
            className="w-full flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted">
                Photo URL
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onPress={() => setPhotoURL(DEFAULT_SAMPLE_PHOTO)}
                className="text-xs text-primary p-0 h-auto hover:underline font-normal"
              >
                Use default sample
              </Button>
            </div>
            <Input
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://..."
              className="w-full"
            />
            <Description className="text-xs text-muted">
              Profile avatar image URL
            </Description>
            <FieldError />
          </TextField>

          {/* Password with live checklist */}
          <TextField
            name="password"
            isRequired
            isInvalid={passwordTouched && !passwordValidation.isValid}
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
                  setPasswordTouched(true);
                  if (inlineError) setInlineError("");
                }}
                placeholder="••••••••"
                autoComplete="new-password"
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

            {/* Live Password Validation Requirements */}
            <div className="mt-2.5 space-y-1.5 rounded-xl border border-border/70 bg-background/50 p-2.5 text-xs">
              <p className="font-semibold text-muted text-[11px] uppercase tracking-wider mb-1">
                Password Requirements:
              </p>
              <div
                className={`flex items-center gap-2 ${
                  passwordValidation.hasMinLength
                    ? "text-status-confirmed"
                    : passwordTouched
                    ? "text-danger"
                    : "text-muted"
                }`}
              >
                {passwordValidation.hasMinLength ? (
                  <HiOutlineCheck className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <HiOutlineXMark className="h-3.5 w-3.5 shrink-0" />
                )}
                <span>At least 6 characters</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  passwordValidation.hasUppercase
                    ? "text-status-confirmed"
                    : passwordTouched
                    ? "text-danger"
                    : "text-muted"
                }`}
              >
                {passwordValidation.hasUppercase ? (
                  <HiOutlineCheck className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <HiOutlineXMark className="h-3.5 w-3.5 shrink-0" />
                )}
                <span>At least one uppercase letter (A-Z)</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  passwordValidation.hasLowercase
                    ? "text-status-confirmed"
                    : passwordTouched
                    ? "text-danger"
                    : "text-muted"
                }`}
              >
                {passwordValidation.hasLowercase ? (
                  <HiOutlineCheck className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <HiOutlineXMark className="h-3.5 w-3.5 shrink-0" />
                )}
                <span>At least one lowercase letter (a-z)</span>
              </div>
            </div>
            <FieldError />
          </TextField>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isDisabled={
              isSubmitting || (passwordTouched && !passwordValidation.isValid)
            }
            className="w-full rounded-xl py-2.5 text-sm font-semibold shadow-xs mt-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Creating account...</span>
              </div>
            ) : (
              "Register"
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
          onSuccess={() => router.push("/")}
        />

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary transition-colors hover:underline"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Right Desktop Hero Panel */}
      <div className="relative hidden w-1/2 md:block">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
          alt="Modern Library Team Room"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-semibold w-fit mb-3">
            Collaborative Community
          </span>
          <h3 className="font-heading text-2xl font-bold leading-tight">
            Access hundreds of study spaces across campus.
          </h3>
          <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-sm">
            Whether you need a quiet pod for exams or a multimedia suite for your team, StudyNook has you covered.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterForm() {
  return (
    <Suspense
      fallback={<Spinner fullPage label="Loading registration form..." />}
    >
      <RegisterFormInner />
    </Suspense>
  );
}
