import Link from "next/link";
import { HiOutlineBookOpen, HiOutlineCheckBadge, HiOutlineStar } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-surface/80 via-background to-background py-16 md:py-20 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & Actions */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <HiOutlineBookOpen className="h-4 w-4" />
              <span>Campus Study Sanctuary</span>
            </div>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1]">
              Find Your Perfect <br className="hidden sm:inline" />
              <span className="text-primary">Study Room</span>
            </h1>

            <p className="max-w-xl text-base text-muted sm:text-lg leading-relaxed">
              Browse and book quiet, private study rooms in your library. List
              your own room and earn.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-focus"
              >
                Explore Rooms
              </Link>
              <Link
                href="/add-room"
                className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/10 hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-focus"
              >
                List Your Room
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="pt-8 border-t border-border/70">
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <p className="font-heading text-2xl font-bold text-foreground">
                    120+
                  </p>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    Rooms
                  </p>
                </div>
                <div className="border-l border-border/70 pl-4">
                  <p className="font-heading text-2xl font-bold text-foreground">
                    2,500+
                  </p>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    Bookings
                  </p>
                </div>
                <div className="border-l border-border/70 pl-4">
                  <div className="flex items-center gap-1">
                    <p className="font-heading text-2xl font-bold text-foreground">
                      4.8
                    </p>
                    <HiOutlineStar className="h-4 w-4 text-accent fill-accent" />
                  </div>
                  <p className="text-xs text-muted font-medium mt-0.5">
                    Average Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop Only): Hero Room Image */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="relative mx-auto max-w-md xl:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern quiet library study sanctuary"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-surface/95 p-3.5 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-status-confirmed/10 text-status-confirmed">
                  <HiOutlineCheckBadge className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">
                    Instant Reservation
                  </p>
                  <p className="text-[11px] text-muted">
                    Zero double-booking guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
