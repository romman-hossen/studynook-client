export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
  className = "",
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-10 md:mb-14 ${
        isCenter ? "text-center mx-auto" : "text-left"
      } max-w-3xl ${className}`}
    >
      {badge && (
        <span className="mb-3 inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-primary">
          {badge}
        </span>
      )}

      <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-3 text-base text-muted sm:text-lg leading-relaxed ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
