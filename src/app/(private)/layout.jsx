"use client";

import { useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinner";

function PrivateGuard({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isLoading && !user) {
      const queryString = searchParams?.toString();
      const fullPath = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(`/login?redirect=${encodeURIComponent(fullPath)}`);
    }
  }, [isLoading, user, router, pathname, searchParams]);

  if (isLoading || !user) {
    return <Spinner fullPage label="Verifying access..." />;
  }

  return <>{children}</>;
}

export default function PrivateLayout({ children }) {
  return (
    <Suspense fallback={<Spinner fullPage label="Loading..." />}>
      <PrivateGuard>{children}</PrivateGuard>
    </Suspense>
  );
}
