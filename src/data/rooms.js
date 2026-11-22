export const rooms = [
  {
    id: "room-1",
    name: "The Radcliffe Reading Pod",
    description:
      "An acoustically isolated private sanctum with natural oak paneling and ergonomic seating. Ideal for thesis writing and deep analytical thought.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 3",
    capacity: { min: 1, max: 2 },
    hourlyRate: 6,
    amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets", "Air Conditioning"],
    bookingCount: 42,
    ownerName: "StudyNook Operations",
    ownerEmail: "demo@studynook.com",
    createdAt: "2026-01-12T08:30:00Z",
  },
  {
    id: "room-2",
    name: "Turing Collaboration Suite",
    description:
      "Spacious corner room featuring dual 4K monitors, high-speed fiber internet, and modular whiteboard walls for collaborative study sessions.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 2",
    capacity: { min: 3, max: 6 },
    hourlyRate: 12,
    amenities: [
      "Whiteboard",
      "Projector",
      "Wi-Fi",
      "Power Outlets",
      "Air Conditioning",
    ],
    bookingCount: 38,
    ownerName: "Elena Vance",
    ownerEmail: "elena.vance@university.edu",
    createdAt: "2026-01-15T11:00:00Z",
  },
  {
    id: "room-3",
    name: "Athena Silent Alcove",
    description:
      "Sunlit glass-front alcove overlooking the central library courtyard. Equipped with standing desks and whisper-quiet air filtration.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 4",
    capacity: { min: 1, max: 2 },
    hourlyRate: 5,
    amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets", "Air Conditioning"],
    bookingCount: 29,
    ownerName: "Marcus Chen",
    ownerEmail: "mchen@library.org",
    createdAt: "2026-01-18T14:15:00Z",
  },
  {
    id: "room-4",
    name: "Franklin Project Studio",
    description:
      "Modern team briefing room outfitted with an ultra-short-throw 4K projector, conference mic array, and comfortable rolling task chairs.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 1",
    capacity: { min: 4, max: 8 },
    hourlyRate: 15,
    amenities: [
      "Whiteboard",
      "Projector",
      "Wi-Fi",
      "Power Outlets",
      "Air Conditioning",
    ],
    bookingCount: 51,
    ownerName: "StudyNook Operations",
    ownerEmail: "demo@studynook.com",
    createdAt: "2026-01-22T09:45:00Z",
  },
  {
    id: "room-5",
    name: "Hypatia Focus Chamber",
    description:
      "Compact, distraction-free study capsule designed for intensive exam preparation with adjustable task lighting and rapid charging ports.",
    image:
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 3",
    capacity: { min: 1, max: 1 },
    hourlyRate: 4,
    amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets"],
    bookingCount: 64,
    ownerName: "Sophia Rodriguez",
    ownerEmail: "s.rodriguez@campus.edu",
    createdAt: "2026-01-28T16:20:00Z",
  },
  {
    id: "room-6",
    name: "Bacon Archives Salon",
    description:
      "Classic oak-timbered research suite surrounded by archived volumes. Features a wide drafting table and dedicated reference lighting.",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    floor: "Lower Level",
    capacity: { min: 2, max: 4 },
    hourlyRate: 8,
    amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets", "Air Conditioning"],
    bookingCount: 22,
    ownerName: "Arthur Pendelton",
    ownerEmail: "apendelton@research.org",
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "room-7",
    name: "Ada Lovelace Workshop",
    description:
      "State-of-the-art interactive lab equipped with magnetic glass markerboards and high-speed multi-device wireless casting.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 2",
    capacity: { min: 3, max: 6 },
    hourlyRate: 11,
    amenities: [
      "Whiteboard",
      "Projector",
      "Wi-Fi",
      "Power Outlets",
      "Air Conditioning",
    ],
    bookingCount: 33,
    ownerName: "StudyNook Operations",
    ownerEmail: "demo@studynook.com",
    createdAt: "2026-02-05T13:30:00Z",
  },
  {
    id: "room-8",
    name: "Solitude Mezzanine Nook",
    description:
      "Peaceful mezzanine hideaway with plush lounge seating, noise-dampening felt baffles, and panoramic campus views.",
    image:
      "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 4",
    capacity: { min: 1, max: 2 },
    hourlyRate: 6,
    amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets", "Air Conditioning"],
    bookingCount: 19,
    ownerName: "Kavita Rao",
    ownerEmail: "krao@graduate.edu",
    createdAt: "2026-02-08T09:15:00Z",
  },
  {
    id: "room-9",
    name: "Euler Analytical Station",
    description:
      "Minimalist engineering desk nook equipped with dual electrical tracks, anti-glare task lamps, and ergonomic kneeling chairs.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 1",
    capacity: { min: 1, max: 2 },
    hourlyRate: 5,
    amenities: ["Wi-Fi", "Power Outlets", "Whiteboard", "Quiet Zone"],
    bookingCount: 27,
    ownerName: "David Kim",
    ownerEmail: "dkim@techuniv.edu",
    createdAt: "2026-02-11T15:45:00Z",
  },
  {
    id: "room-10",
    name: "Newton Forum Space",
    description:
      "Spacious executive seminar room designed for graduate study cohorts, mock thesis defenses, and group presentations.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    floor: "Ground Floor",
    capacity: { min: 6, max: 12 },
    hourlyRate: 14,
    amenities: [
      "Whiteboard",
      "Projector",
      "Wi-Fi",
      "Power Outlets",
      "Air Conditioning",
    ],
    bookingCount: 45,
    ownerName: "Hannah Abbott",
    ownerEmail: "hannah@academics.org",
    createdAt: "2026-02-14T11:20:00Z",
  },
  {
    id: "room-11",
    name: "Chaucer Literary Carrel",
    description:
      "Charming heritage reading corner nestled beneath vaulted timber ceilings with warm ambient lighting and quiet study carrels.",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 3",
    capacity: { min: 1, max: 2 },
    hourlyRate: 5,
    amenities: ["Wi-Fi", "Quiet Zone", "Power Outlets"],
    bookingCount: 16,
    ownerName: "Beatrice Webb",
    ownerEmail: "bwebb@humanities.edu",
    createdAt: "2026-02-18T10:10:00Z",
  },
  {
    id: "room-12",
    name: "Vinci Discovery Hub",
    description:
      "High-tech innovation suite with collaborative media tables, integrated power hubs, and automated temperature regulation.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
    floor: "Floor 2",
    capacity: { min: 4, max: 8 },
    hourlyRate: 13,
    amenities: [
      "Whiteboard",
      "Projector",
      "Wi-Fi",
      "Power Outlets",
      "Air Conditioning",
      "Quiet Zone",
    ],
    bookingCount: 49,
    ownerName: "Liam O'Connor",
    ownerEmail: "liam.oconnor@college.edu",
    createdAt: "2026-02-21T12:00:00Z",
  },
];

export default rooms;
