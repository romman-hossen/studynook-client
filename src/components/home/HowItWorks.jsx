import SectionHeading from "@/components/common/SectionHeading";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineCalendarDays,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Browse",
      description:
        "Explore verified library study rooms filtered by seating capacity, floor location, quiet zone status, and equipment.",
      icon: HiOutlineMagnifyingGlass,
    },
    {
      step: "02",
      title: "Pick a Slot",
      description:
        "Select your desired date and hourly time window with instant availability updates and no scheduling conflicts.",
      icon: HiOutlineCalendarDays,
    },
    {
      step: "03",
      title: "Study",
      description:
        "Receive instant confirmation, check into your reserved study room on time, and focus on your academic work.",
      icon: HiOutlineAcademicCap,
    },
  ];

  return (
    <section className="border-t border-border/60 bg-surface/40 py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Simple Process"
          title="How It Works"
          subtitle="Reserving a quiet study sanctuary takes less than two minutes."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col rounded-2xl border border-border bg-surface p-8 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-heading text-sm font-bold text-muted/60">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
