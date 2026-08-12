import {
  FaDumbbell,
  FaFire,
  FaHeartbeat,
  FaUserTie,
  FaRunning,
  FaLeaf,
  FaChalkboardTeacher,
  FaClipboardList,
  FaClock,
  FaSmile,
} from "react-icons/fa";

export const programs = [
  {
    icon: <FaDumbbell />,
    name: "Strength Training",
    desc: "Build raw power and lean muscle with structured progressive-overload lifting sessions guided by certified coaches.",
    duration: "60 Minutes",
    level: "Intermediate",
  },
  {
    icon: <FaFire />,
    name: "Weight Loss",
    desc: "A calorie-burning combination of resistance work and cardio designed to shed fat while preserving muscle.",
    duration: "45 Minutes",
    level: "Beginner",
  },
  {
    icon: <FaHeartbeat />,
    name: "Cardio Fitness",
    desc: "Boost endurance, improve heart health, and burn energy through high-energy cardio and interval training.",
    duration: "45 Minutes",
    level: "Beginner",
  },
  {
    icon: <FaUserTie />,
    name: "Personal Training",
    desc: "One-on-one coaching tailored entirely to your goals, fitness level, and schedule for maximum results.",
    duration: "60 Minutes",
    level: "All Levels",
  },
  {
    icon: <FaRunning />,
    name: "CrossFit",
    desc: "Functional, high-intensity workouts that build agility, stamina, and full-body strength. Never the same twice.",
    duration: "50 Minutes",
    level: "Advanced",
  },
  {
    icon: <FaLeaf />,
    name: "Yoga & Flexibility",
    desc: "Improve mobility, reduce stress, and build a stronger mind-body connection through guided yoga sessions.",
    duration: "60 Minutes",
    level: "Beginner",
  },
];

export const whyFeatures = [
  {
    icon: <FaChalkboardTeacher />,
    title: "Certified Trainers",
    desc: "Every coach holds nationally recognised certifications with years of hands-on coaching experience.",
  },
  {
    icon: <FaClipboardList />,
    title: "Personalised Plans",
    desc: "Workout programmes built around your specific goals, current fitness level, and available schedule.",
  },
  {
    icon: <FaDumbbell />,
    title: "Modern Equipment",
    desc: "State-of-the-art machines and free weights maintained daily to the highest safety and quality standards.",
  },
  {
    icon: <FaClock />,
    title: "Flexible Timings",
    desc: "Early morning to late evening sessions available six days a week so you can always fit training in.",
  },
];

export const schedule = [
  { day: "Monday", program: "Strength Training", time: "6 AM – 8 PM" },
  { day: "Tuesday", program: "Cardio Fitness", time: "6 AM – 8 PM" },
  { day: "Wednesday", program: "CrossFit", time: "6 AM – 8 PM" },
  { day: "Thursday", program: "Yoga & Flexibility", time: "6 AM – 8 PM" },
  { day: "Friday", program: "Personal Training", time: "6 AM – 8 PM" },
  { day: "Saturday", program: "Weight Loss", time: "7 AM – 6 PM" },
];