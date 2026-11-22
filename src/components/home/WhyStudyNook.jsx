import SectionHeading from "@/components/common/SectionHeading";
import {
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineSparkles,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

export default function WhyStudyNook() {
  const benefits = [
    {
      title: "No Double Booking",
      description:
        "Our real-time verification system prevents overlaps. Once reserved, your room is guaranteed exclusively for your booked hours.",
      icon: HiOutlineShieldCheck,
    },
    {
      title: "Transparent Pricing",
      description:
        "Clear hourly rates starting from $4/hr. No surprise service charges, hidden fees, or recurring membership commitments.",
      icon: HiOutlineCurrencyDollar,
    },
    {
      title: "Quiet and Private",
      description:
        "Verified acoustic environments with designated noise policies and dedicated door latches for deep concentration.",
      icon: HiOutlineSparkles,
    },
    {
      title: "Earn From Your Room",
      description:
        "Departments and space hosts can easily list underutilized study pods, research desks, and meeting rooms to earn revenue.",
      icon: HiOutlineArrowTrendingUp,
    },
  ];

  return (
    <section className="border-t border-border/60 py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Platform Benefits"
          title="Why StudyNook"
          subtitle="Designed for students, researchers, and campus hosts who value focus, simplicity, and reliability."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-2.5">
                  {benefit.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
