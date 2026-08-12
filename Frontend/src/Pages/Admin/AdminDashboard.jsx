import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaImages,
  FaEnvelope,
  FaTrophy,
  FaDumbbell,
  FaArrowRight,
  FaPlusCircle,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaUsers,
  FaCalendarCheck,
  FaCreditCard,
} from "react-icons/fa";
import {
  getGalleryPhotos,
  getChampions,
  getRecords,
  getContactInquiries,
} from "../../services/api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    photos: 0,
    champions: 0,
    records: 0,
    inquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      setLoading(true);
      try {
        const [pRes, cRes, rRes, iRes] = await Promise.all([
          getGalleryPhotos().catch(() => ({ data: [] })),
          getChampions().catch(() => ({ data: [] })),
          getRecords().catch(() => ({ data: [] })),
          getContactInquiries().catch(() => ({ data: [] })),
        ]);

        setCounts({
          photos: pRes?.data?.length || 0,
          champions: cRes?.data?.length || 0,
          records: rRes?.data?.length || 0,
          inquiries: iRes?.data?.length || 0,
        });
      } catch (err) {
        console.log("Failed to load backend metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, []);

  const activeStats = [
    {
      title: "Gym Photo Tour",
      value: loading ? "..." : counts.photos,
      sub: "Active Photos",
      icon: <FaImages />,
      color: "blue",
      link: "/admin/gallery",
    },
    {
      title: "Wall of Champions",
      value: loading ? "..." : counts.champions,
      sub: "Monthly Champions",
      icon: <FaTrophy />,
      color: "gold",
      link: "/admin/gallery",
    },
    {
      title: "Gym Record Holders",
      value: loading ? "..." : counts.records,
      sub: "Exercise PRs",
      icon: <FaDumbbell />,
      color: "purple",
      link: "/admin/gallery",
    },
    {
      title: "Contact Inquiries",
      value: loading ? "..." : counts.inquiries,
      sub: "Member Messages",
      icon: <FaEnvelope />,
      color: "green",
      link: "/admin/messages",
    },
  ];

  const comingSoonModules = [
    {
      title: "Customer & Member Directory",
      desc: "Digital Member ID Cards, Subscription Expiry & Bio-data.",
      icon: <FaUsers />,
      link: "/admin/customers",
    },
    {
      title: "Live Attendance & QR Check-In",
      desc: "QR code scanner, shift logs & daily check-in counter.",
      icon: <FaCalendarCheck />,
      link: "/admin/attendance",
    },
    {
      title: "Fee Ledger & Digital Invoices",
      desc: "Fee due alerts, cash/UPI payment history & receipts.",
      icon: <FaCreditCard />,
      link: "/admin/fees",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* ── Welcome Banner ── */}
      <div className="dash-banner">
        <div className="dash-banner__content">
          <span className="dash-banner__tag">System Online & Active</span>
          <h1 className="dash-banner__heading">Tigers Gym Management Portal</h1>
          <p className="dash-banner__sub">
            Live overview of active website modules, gym gallery media, and member contact inquiries.
          </p>
        </div>
        <div className="dash-banner__actions">
          <Link to="/admin/gallery" className="btn-dash btn-dash--primary">
            <FaPlusCircle /> Upload Gallery Photo
          </Link>
          <Link to="/admin/messages" className="btn-dash btn-dash--secondary">
            <FaEnvelope /> View Inquiries
          </Link>
        </div>
      </div>

      {/* ── Active Metrics Grid ── */}
      <div className="dash-metrics-grid">
        {activeStats.map((item, idx) => (
          <Link to={item.link} key={idx} className={`metric-card metric-card--${item.color}`}>
            <div className="metric-card__header">
              <span className="metric-card__title">{item.title}</span>
              <span className="metric-card__icon">{item.icon}</span>
            </div>
            <div className="metric-card__value">
              {loading ? <FaSpinner className="spinner-icon" /> : item.value}
            </div>
            <div className="metric-card__footer">
              <span className="metric-card__change">{item.sub}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Main Section Grid ── */}
      <div className="dash-main-grid">
        {/* Active & Coming Soon Feature Cards */}
        <div className="dash-section">
          <div className="dash-section__header">
            <h3 className="dash-section__title">Upcoming Automated Modules</h3>
            <span className="dash-section__sub">Next phase features under active development</span>
          </div>

          <div className="quick-actions-grid">
            {comingSoonModules.map((action, idx) => (
              <div key={idx} className="quick-card">
                <div className="quick-card__top">
                  <span className="quick-card__icon">{action.icon}</span>
                  <span className="quick-card__badge badge--soon">
                    <FaClock /> Coming Soon
                  </span>
                </div>
                <h4 className="quick-card__title">{action.title}</h4>
                <p className="quick-card__desc">{action.desc}</p>
                <Link to={action.link} className="quick-card__btn">
                  View Roadmap Preview <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel: Operating Hours */}
        <div className="dash-side-panel">
          <div className="side-card side-card--highlight">
            <div className="side-card__header">
              <h3 className="side-card__title">Gym Operating Schedule</h3>
              <FaCheckCircle className="text-green" />
            </div>
            <div className="operating-hours-list">
              <div className="hour-row">
                <span>Morning Shift:</span>
                <strong>5:00 AM - 12:00 PM</strong>
              </div>
              <div className="hour-row">
                <span>Evening Shift:</span>
                <strong>3:00 PM - 10:00 PM</strong>
              </div>
              <div className="hour-row">
                <span>Weekly Off:</span>
                <strong>Sunday</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
