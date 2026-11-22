import Link from "next/link";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export const metadata = {
  title: "StudyNook – Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-[65vh] max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <HiOutlineMagnifyingGlass className="h-8 w-8" />
      </div>

      <span className="inline-flex items-center rounded-full bg-muted/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted">
        404 Error
      </span>

      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        Page not found
      </h1>

      <p className="mt-3 max-w-md text-base text-muted leading-relaxed">
        We couldn&apos;t find the study room or page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus"
        >
          Back to Home
        </Link>
        <Link
          href="/rooms"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10 focus-visible:outline-2 focus-visible:outline-focus"
        >
          Browse Rooms
        </Link>
      </div>
    </div>
  );
}
