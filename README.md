# StudyNook – Library Study Room Booking Platform

> Live Site: <add URL after deployment>

StudyNook is a modern, responsive web application for exploring, reserving, and managing quiet campus study rooms, collaborative team hubs, and multimedia laboratories. Designed with a calming library aesthetic, StudyNook provides students, researchers, and campus departments with an intuitive, self-service booking portal.

---

## 🌟 Key Features

- **Explore & Discover Study Rooms**: Browse through 12 verified study spaces across multiple campus library floors, complete with capacity limits, hourly rates, high-definition interior previews, and booking histories.
- **Dynamic Real-Time Filtering**:
  - Instant search by room name (case-insensitive).
  - Multi-select required amenities (Whiteboard, Projector, Wi-Fi 6, Power Outlets, Quiet Zone, Air Conditioning).
  - Budget range slider for hourly rates (\$4–\$15/hr) with instant result counts and graceful empty state fallbacks.
- **Interactive Booking Modal**:
  - Live cost calculation: `(End Hour - Start Hour) × Hourly Rate`.
  - Date picker with past-date prevention.
  - Smart time slot selection (`08:00`–`20:00`) with automatic validation ensuring end times are strictly after start times.
  - Optional special reservation notes.
- **Room Management & Ownership (Add / Edit / Delete)**:
  - Campus room hosts can list new study spaces (`/add-room`) with image links, floor numbers, capacities, and amenities.
  - Owners can edit room parameters or delete listings (`/my-listings`) with danger confirmation modals and toast feedback.
- **My Bookings & Smart Cancellation**:
  - View all past and upcoming reservations with room imagery, duration, and calculated cost.
  - High-contrast, dark-mode-ready status badges (`confirmed` / `cancelled`).
  - Strict cancellation rule: bookings can only be cancelled if their status is `confirmed` and scheduled for today or a future date.
- **Accessible Dark & Light Themes**: Seamless theme switching with system detection, smooth transitions, and zero hydration mismatch.
- **Robust Route Guards & Mock Authentication**:
  - Email/Password and Google sign-in workflows via `AuthContext` backed by `localStorage`.
  - Full-page spinner protection on private routes (`/add-room`, `/my-listings`, `/my-bookings`) preserving route state without reload redirection flickers (`?redirect=...`).
- **Fully Responsive & Accessible Design**: Crafted for 360px mobile screens, 768px tablets, and 1280px+ desktop displays with standard keyboard navigation, focus rings, and screen-reader labels.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [HeroUI v3](https://heroui.com/) (`@heroui/react`, `@heroui/styles`)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (`fa6`, `hi2`)
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [react-hot-toast](https://react-hot-toast.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Typography**: Plus Jakarta Sans (Headings) & Inter (Body) via `next/font/google`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.18.0 or higher; tested with Node.js 24)
- [npm](https://www.npmjs.com/) or your preferred package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd studynook-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server with Turbopack:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

### Linting & Production Build

- **Lint code**:
  ```bash
  npm run lint
  ```
- **Build for production**:
  ```bash
  npm run build
  ```
- **Start production server**:
  ```bash
  npm start
  ```

---

## 👥 Demo Credentials

To test owner features and reservations, log in with the pre-seeded account:
- **Email**: `demo@studynook.com`
- **Password**: `Password1` (or click **"Continue with Google"**)

---

## 📄 License

This project is created for the StudyNook library reservation platform.
