import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCalendarCheck,
  FaRupeeSign,
  FaTrophy,
  FaImages,
  FaEnvelope,
  FaArrowRight,
  FaPlusCircle,
  FaClock,
  FaCheckCircle,
  FaDumbbell,
  FaUserCheck,
} from "react-icons/fa";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "148",
      change: "+12 this month",
      icon: <FaUsers />,
      color: "blue",
    },
    {
      title: "Today's Attendance",
      value: "34",
      change: "Active workout now: 14",
      icon: <FaCalendarCheck />,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "₹84,500",
      change: "88% collected",
      icon: <FaRupeeSign />,
      color: "gold",
    },
    {
      title: "Champions & Records",
      value: "12",
      change: "6 Active Champions",
      icon: <FaTrophy />,
      color: "purple",
    },
  ];

  const quickActions = [
    {
      title: "Manage Gallery",
      desc: "Upload gym photos, monthly champions & record holders.",
      icon: <FaImages />,
      link: "/admin/gallery",
      badge: "Full Access",
      btnText: "Open Gallery",
    },
    {
      title: "Contact Inquiries",
      desc: "View user messages, answer inquiries & track status.",
      icon: <FaEnvelope />,
      link: "/admin/messages",
      badge: "Full Access",
      btnText: "View Inquiries",
    },
    {
      title: "Customer Directory",
      desc: "View member list, subscriptions & emergency contacts.",
      icon: <FaUsers />,
      link: "/admin/customers",
      badge: "Coming Soon",
      btnText: "Explore Preview",
    },
    {
      title: "Attendance Tracker",
      desc: "Log daily member check-ins & QR attendance scans.",
      icon: <FaUserCheck />,
      link: "/admin/attendance",
      badge: "Coming Soon",
      btnText: "Explore Preview",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "gallery",
      text: "New Gym Photo added to 'Strength Zone'",
      time: "10 mins ago",
      icon: <FaImages className="activity-icon--blue" />,
    },
    {
      id: 2,
      type: "champion",
      text: "Arjun Mehta crowned Champion of January 2025",
      time: "2 hours ago",
      icon: <FaTrophy className="activity-icon--gold" />,
    },
    {
      id: 3,
      type: "inquiry",
      text: "New inquiry received from Rahul Verma regarding Membership",
      time: "5 hours ago",
      icon: <FaEnvelope className="activity-icon--green" />,
    },
    {
      id: 4,
      type: "record",
      text: "Vikram Singh updated Bench Press Record (160 KG)",
      time: "1 day ago",
      icon: <FaDumbbell className="activity-icon--purple" />,
    },
  ];

  return (
    <div className="admin-dashboard-page">
      {/* ── Welcome Banner ── */}
      <div className="dash-banner">
        <div className="dash-banner__content">
          <span className="dash-banner__tag">System Status: Active</span>
          <h1 className="dash-banner__heading">Welcome to Tigers Gym Portal</h1>
          <p className="dash-banner__sub">
            Manage your gym gallery, champions, member inquiries, and explore upcoming automated features.
          </p>
        </div>
        <div className="dash-banner__actions">
          <Link to="/admin/gallery" className="btn-dash btn-dash--primary">
            <FaPlusCircle /> Add Gallery Photo
          </Link>
          <Link to="/admin/messages" className="btn-dash btn-dash--secondary">
            <FaEnvelope /> View Inquiries
          </Link>
        </div>
      </div>

      {/* ── Key Metrics ── */}
      <div className="dash-metrics-grid">
        {stats.map((item, idx) => (
          <div key={idx} className={`metric-card metric-card--${item.color}`}>
            <div className="metric-card__header">
              <span className="metric-card__title">{item.title}</span>
              <span className="metric-card__icon">{item.icon}</span>
            </div>
            <div className="metric-card__value">{item.value}</div>
            <div className="metric-card__footer">
              <span className="metric-card__change">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Section Grid ── */}
      <div className="dash-main-grid">
        {/* Quick Action Tiles */}
        <div className="dash-section">
          <div className="dash-section__header">
            <h3 className="dash-section__title">Quick Management Actions</h3>
            <span className="dash-section__sub">Access active modules & feature previews</span>
          </div>

          <div className="quick-actions-grid">
            {quickActions.map((action, idx) => (
              <div key={idx} className="quick-card">
                <div className="quick-card__top">
                  <span className="quick-card__icon">{action.icon}</span>
                  <span className={`quick-card__badge ${action.badge === "Full Access" ? "badge--green" : "badge--gray"}`}>
                    {action.badge}
                  </span>
                </div>
                <h4 className="quick-card__title">{action.title}</h4>
                <p className="quick-card__desc">{action.desc}</p>
                <Link to={action.link} className="quick-card__btn">
                  {action.btnText} <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Activity & Highlights Sidebar */}
        <div className="dash-side-panel">
          {/* Recent Activity */}
          <div className="side-card">
            <div className="side-card__header">
              <h3 className="side-card__title">Recent Activity</h3>
              <FaClock className="side-card__icon-muted" />
            </div>

            <div className="activity-list">
              {recentActivity.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-item__icon-wrap">{act.icon}</div>
                  <div className="activity-item__details">
                    <p className="activity-item__text">{act.text}</p>
                    <span className="activity-item__time">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Highlights */}
          <div className="side-card side-card--highlight">
            <div className="side-card__header">
              <h3 className="side-card__title">Gym Operating Hours</h3>
              <FaCheckCircle className="text-green" />
            </div>
            <div className="operating-hours-list">
              <div className="hour-row">
                <span>Morning Shift:</span>
                <strong>5:30 AM - 10:30 AM</strong>
              </div>
              <div className="hour-row">
                <span>Evening Shift:</span>
                <strong>4:30 PM - 9:30 PM</strong>
              </div>
              <div className="hour-row">
                <span>Weekly Off:</span>
                <strong>Sunday Afternoon</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
