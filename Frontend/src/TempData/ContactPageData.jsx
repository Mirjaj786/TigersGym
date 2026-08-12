import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
  FaCheckCircle,
  FaDirections,
} from "react-icons/fa";

export const contactCards = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    lines: ["Malda, West Bengal"],
  },
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    lines: ["+91 XXXXX XXXXX"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    lines: ["your@email.com"],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Morning: 5:00 AM – 12:00 PM", "Evening: 3:00 PM – 10:00 PM"],
  },
];

export const socialLinks = [
  { icon: <FaInstagram />, label: "Instagram", color: "#e1306c", href: "#" },
  { icon: <FaFacebookF />, label: "Facebook", color: "#1877f2", href: "#" },
  { icon: <FaYoutube />, label: "YouTube", color: "#ff0000", href: "#" },
  { icon: <FaWhatsapp />, label: "WhatsApp", color: "#25d366", href: "#" },
  { icon: <FaLinkedinIn />, label: "LinkedIn", color: "#0a66c2", href: "#" },
];

export const faqs = [
  {
    question: "Do I need previous gym experience?",
    answer:
      "Not at all. Beginners are always welcome. The gym owner will guide you every step of the way from day one.",
  },
  {
    question: "Can I visit the gym before joining?",
    answer:
      "Absolutely. Feel free to visit FITZONE during working hours and explore our facilities, equipment, and training zones.",
  },
  {
    question: "Is personal training guidance available?",
    answer:
      "Yes. The gym owner is available to provide personalised guidance and workout advice whenever needed.",
  },
  {
    question: "Is parking available for members?",
    answer:
      "Yes, parking is available for all FITZONE members directly adjacent to the gym.",
  },
];
