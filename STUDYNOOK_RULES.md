# StudyNook Frontend Rules

You are a senior frontend engineer. We are building ONLY the frontend of "StudyNook – Library Study Room Booking". The backend will be built separately by me later.

## Stack (already installed, do NOT reinstall or add other libraries)
- Next.js 16 (App Router), JavaScript + JSX ONLY. No TypeScript, no .ts/.tsx files.
- All component and page files must use the .jsx extension. Rename the generated layout.js and page.js to .jsx.
- Tailwind CSS v4 (CSS-first config, no tailwind.config.js needed).
- UI library: HeroUI v3 (@heroui/react + @heroui/styles). This is v3, NOT v2. There is NO HeroUIProvider. Styles are loaded with `@import "@heroui/styles"` in globals.css after `@import "tailwindcss"`. v3 uses compound components (e.g. Card.Header, Card.Content). ALWAYS read the official HeroUI v3 docs for each component before using it, and never use v2 APIs from memory. If a component (for example Navbar) does not exist in v3, build it with plain Tailwind + HeroUI Button/Dropdown/Modal instead of inventing APIs.
- Icons: react-icons only (use FaXTwitter from react-icons/fa6 for the new X logo).
- Toasts: react-hot-toast. Theme: next-themes (attribute="class", persisted). Animation: framer-motion, minimal only.

## Next.js 16 notes
- `params` and `searchParams` in pages are Promises. In server components use `await params`; in client components use React `use(params)`.
- Keep page.jsx as server components that export `metadata` (or generateMetadata). Put interactivity in separate "use client" components.
- If unsure about any Next.js 16 API, read the docs inside node_modules/next/dist/docs before coding (see AGENTS.md).

## Data
- NO backend, NO fetch/API calls, NO database. Anywhere data is dynamic, use dummy data from /src/data.
- Dummy data must be realistic (real-sounding room names, universities, prices in $). NO Lorem ipsum anywhere.
- Images: use Unsplash URLs (images.unsplash.com) and add them to next.config.mjs remotePatterns. Add a graceful fallback if an image fails to load.

## Forbidden
- NO alert(), confirm(), prompt(). Use react-hot-toast for messages and HeroUI Modal for confirmations.
- NO git commands. I will commit myself.
- Do not add features I did not ask for.

## Auth (MOCK ONLY)
- AuthContext in /src/context/AuthContext.jsx with user = { name, email, photoURL } | null, login(), register(), logout(), isLoading. Persist the user in localStorage.
- On reload the app must restore the user without redirecting to /login. Use isLoading and decide only after it becomes false.
- Private pages: Add Room, My Listings, My Bookings. Guard them in (private)/layout.jsx.

## Design
- Clean, calm, professional, NOT flashy. Theme: "calm library".
- Fonts via next/font/google: Plus Jakarta Sans (headings, 600/700), Inter (body).
- Colors: primary teal #0F766E (hover #115E59), accent amber #F59E0B, light bg #F8FAFC, surface #FFFFFF, text #0F172A, muted #64748B, light border #E2E8F0. Dark: bg #0B1220, surface #111A2E, border #1E293B. Status: confirmed green #16A34A, cancelled red #DC2626. Define these as CSS variables / Tailwind v4 `@theme` tokens in globals.css and map them to HeroUI's theme variables.
- Consistency: ONE primary button style across the whole site, the same SectionHeading style everywhere, rounded-2xl cards, soft shadow, container max-w-7xl mx-auto px-4, section padding py-16 md:py-20.
- ALL room cards must have identical height and width, uniform image (aspect-[4/3], object-cover). Grid: 1 column mobile, 2 tablet, 3 desktop.
- Fully responsive (360px, 768px, 1280px), accessible (labels, alt text, aria-labels, focus states).

## Folder structure (use exactly this)
```
src/
├── app/
│   ├── layout.jsx, page.jsx, loading.jsx, not-found.jsx, globals.css
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── rooms/page.jsx
│   ├── rooms/[id]/page.jsx
│   └── (private)/
│       ├── layout.jsx
│       ├── add-room/page.jsx
│       ├── my-listings/page.jsx
│       └── my-bookings/page.jsx
├── components/
│   ├── layout/   Navbar, PublicNav, PrivateNav, ProfileMenu, Footer, ThemeToggle
│   ├── home/     Hero, LatestRooms, HowItWorks, WhyStudyNook
│   ├── rooms/    RoomCard, RoomGrid, RoomFilters, AmenityChips, RoomForm, EditRoomModal
│   ├── booking/  BookingModal, BookingRow, CancelBookingModal, StatusBadge
│   ├── auth/     LoginForm, RegisterForm, GoogleButton
│   └── common/   Spinner, RoomCardSkeleton, EmptyState, SectionHeading, ConfirmModal, PageHeader
├── context/      AuthContext.jsx
├── data/         rooms.js, bookings.js, amenities.js, timeSlots.js
├── lib/          validators.js, utils.js
└── providers/    Providers.jsx
```
Use the "@/..." import alias.

## Page titles
Every page exports metadata, e.g. "StudyNook – Home", "StudyNook – Available Rooms", "StudyNook – Login".

## Output
After each phase, give a short summary, the list of files created/changed, and confirm `npm run dev` runs without errors.