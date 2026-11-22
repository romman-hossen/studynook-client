"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function GoogleButton({
  onSuccess,
  text = "Continue with Google",
  disabled = false,
  className = "",
}) {
  const { googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      if (result?.success) {
        toast.success("Welcome back!");
        onSuccess?.(result.user);
      } else {
        toast.error(result?.error || "Google sign in failed");
      }
    } catch {
      toast.error("Failed to authenticate with Google");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <Button
      type="button"
      variant="outline"
      fullWidth
      isDisabled={isDisabled}
      onPress={handleClick}
      className={`inline-flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:bg-muted/10 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-focus ${className}`}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : (
        <FcGoogle className="h-5 w-5 shrink-0" />
      )}
      <span>{text}</span>
    </Button>
  );
}
