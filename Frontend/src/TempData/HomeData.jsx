import {
  FaDumbbell,
  FaGift,
  FaHeartbeat,
  FaUsers,
  FaMoneyBillWave,
  FaRunning,
  FaAppleAlt,
  FaWeight,
  FaArrowRight,
  FaCheckCircle,
  FaFire,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

/* ─── Static Data ─────────────────────────────────────────── */

// Why Choose Us feature cards
export const features = [
  {
    icon: <FaUsers />,
    title: "Experienced Guidance",
    desc: "Receive practical workout guidance from our experienced gym owner who is passionate about helping members improve their fitness.",
  },
  {
    icon: <FaDumbbell />,
    title: "Modern Equipment",
    desc: "Well-maintained equipment for strength training and cardio workouts — everything you need to reach your fitness goals.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Affordable Membership",
    desc: "Simple and budget-friendly membership plans with transparent pricing. No hidden charges, no confusing tiers.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Friendly Environment",
    desc: "A motivating and welcoming atmosphere where beginners and regulars both feel right at home.",
  },
];

// Programs section
export const programs = [
  {
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    title: "Strength Training",
    desc: "Learn the fundamentals of strength training with proper form and progressive routines suited for all levels.",
    icon: <FaDumbbell />,
  },
  {
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    title: "Cardio Fitness",
    desc: "Improve your stamina, burn calories, and boost heart health with our cardio zone — open every day.",
    icon: <FaRunning />,
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    title: "Weight Loss",
    desc: "Structured, beginner-friendly workouts designed to help you shed extra weight and build healthy habits.",
    icon: <FaWeight />,
  },
];

// Membership highlight bullets
export const membershipFeatures = [
  "Full gym floor access",
  "Strength & cardio equipment",
  "Guidance from gym owner",
  "No lock-in contract",
  "Open 7 days a week",
];
