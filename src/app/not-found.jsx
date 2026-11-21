import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <p className="mt-2 text-muted">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-xl bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary-hover"
      >
        Return Home
      </Link>
    </div>
  );
}
