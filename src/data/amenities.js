import {
  FaChalkboard,
  FaVideo,
  FaWifi,
  FaPlug,
  FaVolumeXmark,
  FaSnowflake,
} from "react-icons/fa6";

export const AMENITIES = [
  {
    id: "whiteboard",
    name: "Whiteboard",
    icon: FaChalkboard,
    description: "Full-size magnetic dry-erase whiteboard with markers",
  },
  {
    id: "projector",
    name: "Projector",
    icon: FaVideo,
    description: "High-definition HDMI/AirPlay projection display",
  },
  {
    id: "wifi",
    name: "Wi-Fi",
    icon: FaWifi,
    description: "High-speed gigabit Wi-Fi 6 coverage",
  },
  {
    id: "power",
    name: "Power Outlets",
    icon: FaPlug,
    description: "Multiple desk-level AC outlets and USB-C rapid charging",
  },
  {
    id: "quiet",
    name: "Quiet Zone",
    icon: FaVolumeXmark,
    description: "Acoustically insulated walls for zero distraction",
  },
  {
    id: "ac",
    name: "Air Conditioning",
    icon: FaSnowflake,
    description: "Dedicated climate control with fresh air circulation",
  },
];

export const AMENITY_MAP = AMENITIES.reduce((acc, item) => {
  acc[item.name] = item;
  return acc;
}, {});

export default AMENITIES;
