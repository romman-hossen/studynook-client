import { HiCheckCircle, HiXCircle } from "react-icons/hi2";

export default function StatusBadge({ status, className = "" }) {
  const isConfirmed = status?.toLowerCase() === "confirmed";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide border shadow-2xs ${
        isConfirmed
          ? "bg-success/15 text-success border-success/30 dark:bg-success/20 dark:text-emerald-400 dark:border-success/40"
          : "bg-danger/15 text-danger border-danger/30 dark:bg-danger/20 dark:text-rose-400 dark:border-danger/40"
      } ${className}`}
    >
      {isConfirmed ? (
        <HiCheckCircle className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <HiXCircle className="h-3.5 w-3.5 shrink-0" />
      )}
      <span className="capitalize">{status}</span>
    </span>
  );
}
