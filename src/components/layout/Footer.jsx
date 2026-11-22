import Link from "next/link";
import { HiOutlineBookOpen, HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface text-foreground transition-colors">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                <HiOutlineBookOpen className="h-5 w-5" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                Study<span className="text-primary">Nook</span>
              </span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Peaceful, quiet, and well-equipped library study rooms designed for focused learning, group collaboration, and academic success.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted transition-colors hover:text-primary"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="text-muted transition-colors hover:text-primary"
                >
                  Available Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms#about"
                  className="text-muted transition-colors hover:text-primary"
                >
                  About StudyNook
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-foreground">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5 text-muted">
                <HiOutlineEnvelope className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:support@studynook.com"
                  className="transition-colors hover:text-primary"
                >
                  support@studynook.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-muted">
                <HiOutlinePhone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+15550142290"
                  className="transition-colors hover:text-primary"
                >
                  +1 (555) 014-2290
                </a>
              </li>
              <li className="text-xs text-muted pt-1">
                Mon – Fri: 8:00 AM – 10:00 PM
              </li>
            </ul>
          </div>

          {/* Column 4: Social Community */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-foreground">
              Connect With Us
            </h4>
            <p className="text-sm text-muted">
              Follow our social channels for study tips, new room openings, and community updates.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-primary/40 hover:bg-muted/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-primary/40 hover:bg-muted/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-primary/40 hover:bg-muted/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-primary/40 hover:bg-muted/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            © 2026 StudyNook. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted">
            <span className="hover:text-primary transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
