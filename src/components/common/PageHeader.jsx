export default function PageHeader({
  title,
  description,
  badge,
  action,
  className = "",
}) {
  return (
    <div
      className={`mb-8 border-b border-border/80 pb-6 md:mb-10 md:pb-8 ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5 max-w-2xl">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
              {badge}
            </span>
          )}
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted sm:text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {action && <div className="flex shrink-0 items-center gap-3">{action}</div>}
      </div>
    </div>
  );
}
