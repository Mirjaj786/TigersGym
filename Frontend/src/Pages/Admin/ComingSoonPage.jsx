import React from "react";
import {
  FaRocket,
  FaCheckCircle,
  FaClock,
  FaUsers,
  FaCalendarCheck,
  FaCreditCard,
  FaUserTie,
  FaTags,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./ComingSoonPage.css";

const FEATURE_DATA = {
  "/admin/customers": {
    title: "Customer & Member Management",
    icon: <FaUsers />,
    tagline: "Complete Member Lifecycle, Subscriptions & Health Records",
    features: [
      "Digital Member Onboarding & ID Card Generation",
      "Membership Expiry Auto-Reminders & Whatsapp Alerts",
      "Emergency Contacts, BMI Tracker & Goal Records",
      "Customer Filter by Active, Expired, and Inactive Status",
    ],
    previewImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  },
  "/admin/attendance": {
    title: "Attendance & QR Check-In Tracking",
    icon: <FaCalendarCheck />,
    tagline: "Live Shift Check-ins, QR Code Scanning & Attendance Logs",
    features: [
      "Member QR Code Instant Scan & Verification",
      "Daily Morning & Evening Attendance Counter",
      "Member Peak Hours Analytics & Shift Logs",
      "Automated Low Attendance Follow-up System",
    ],
    previewImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
  },
  "/admin/fees": {
    title: "Fee Management & Digital Billing",
    icon: <FaCreditCard />,
    tagline: "Payment History, Dues Ledger & Instant Invoice Receipts",
    features: [
      "Monthly & Annual Fee Collection Ledger",
      "Overdue Fee Reminders & Payment Status Badges",
      "UPI, Cash & Card Payment Method Tracking",
      "PDF Receipt Generation & Instant Email Delivery",
    ],
    previewImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80",
  },
  "/admin/trainers": {
    title: "Trainer & Staff Management",
    icon: <FaUserTie />,
    tagline: "Trainer Assignments, Client Allocations & Work Shifts",
    features: [
      "Trainer Specialty Profiles & Rating Matrix",
      "Personal Training Client Batch Assignments",
      "Trainer Attendance & Monthly Salary Tracking",
      "Slot Scheduling & Shift Timings Management",
    ],
    previewImage: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80",
  },
  "/admin/plans": {
    title: "Membership Plans & Packages",
    icon: <FaTags />,
    tagline: "Flexible Pricing Tiers, Discounts & Promotional Offers",
    features: [
      "Customizable Monthly, Quarterly & Annual Plans",
      "Special Student & Couple Gym Discount Rules",
      "Personal Trainer Add-on Package Pricing",
      "Dynamic Pricing Updates Synchronized to Website",
    ],
    previewImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  },
  "/admin/settings": {
    title: "Gym Settings & Operating Parameters",
    icon: <FaCog />,
    tagline: "Business Timing, Brand Customization & Admin Roles",
    features: [
      "Tigers Gym Operating Hours & Shift Configuration",
      "Admin Profile & Password Security Settings",
      "WhatsApp & Email API Credentials",
      "Database Backup & Maintenance Tools",
    ],
    previewImage: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80",
  },
};

export default function ComingSoonPage() {
  const location = useLocation();
  const info = FEATURE_DATA[location.pathname] || {
    title: "Feature Module",
    icon: <FaRocket />,
    tagline: "Under active development for Tigers Gym Management",
    features: ["Enhanced Automation", "Real-time sync", "Advanced reporting"],
    previewImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
  };

  return (
    <div className="coming-soon-page">
      <div className="cs-card">
        <div className="cs-card__header">
          <span className="cs-badge">
            <FaClock /> Coming Soon in Next Phase
          </span>
          <div className="cs-icon-title">
            <span className="cs-main-icon">{info.icon}</span>
            <div>
              <h1 className="cs-title">{info.title}</h1>
              <p className="cs-tagline">{info.tagline}</p>
            </div>
          </div>
        </div>

        <div className="cs-body">
          <div className="cs-features">
            <h3 className="cs-section-heading">Planned Features & Capabilities:</h3>
            <ul className="cs-feature-list">
              {info.features.map((feat, idx) => (
                <li key={idx} className="cs-feature-item">
                  <FaCheckCircle className="cs-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="cs-actions">
              <Link to="/admin/dashboard" className="cs-btn cs-btn--primary">
                <FaArrowLeft /> Back to Dashboard
              </Link>
              <Link to="/admin/gallery" className="cs-btn cs-btn--gold">
                Manage Gallery
              </Link>
            </div>
          </div>

          <div className="cs-preview-wrap">
            <div className="cs-preview-overlay">
              <span className="cs-preview-tag">Module Preview</span>
            </div>
            <img src={info.previewImage} alt={info.title} className="cs-preview-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
