export default function Spinner({
  size = "md",
  className = "",
  fullPage = false,
  label = "Loading...",
}) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  };

  const spinnerElement = (
    <div
      role="status"
      aria-label={label}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div
        className={`inline-block animate-spin rounded-full border-primary border-t-transparent ${
          sizeClasses[size] || sizeClasses.md
        } ${className}`}
      />
      <span className="sr-only">{label}</span>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-[60vh] flex-1 items-center justify-center p-8">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}
