import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaImages,
  FaUsers,
  FaCalendarCheck,
  FaCreditCard,
  FaUserTie,
  FaTags,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import logo from "../../assets/logo.jpeg";

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const navItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard Overview",
      icon: <FaChartPie />,
      status: null,
    },
    {
      path: "/admin/gallery",
      name: "Gallery Management",
      icon: <FaImages />,
      status: "Active",
      badgeClass: "badge--active",
    },
    {
      path: "/admin/messages",
      name: "Contact Inquiries",
      icon: <FaEnvelope />,
      status: "Active",
      badgeClass: "badge--active",
    },
    {
      path: "/admin/customers",
      name: "Customer Management",
      icon: <FaUsers />,
      status: "Soon",
      badgeClass: "badge--soon",
    },
    {
      path: "/admin/attendance",
      name: "Attendance Tracking",
      icon: <FaCalendarCheck />,
      status: "Soon",
      badgeClass: "badge--soon",
    },
    {
      path: "/admin/fees",
      name: "Fee Management",
      icon: <FaCreditCard />,
      status: "Soon",
      badgeClass: "badge--soon",
    },
    {
      path: "/admin/trainers",
      name: "Trainer & Staff",
      icon: <FaUserTie />,
      status: "Soon",
      badgeClass: "badge--soon",
    },
    {
      path: "/admin/plans",
      name: "Membership Plans",
      icon: <FaTags />,
      status: "Soon",
      badgeClass: "badge--soon",
    },
    {
      path: "/admin/settings",
      name: "Gym Settings",
      icon: <FaCog />,
      status: "Soon",
      badgeClass: "badge--soon",
    },
  ];

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div className="admin-sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}>
        {/* Sidebar Header with Logo */}
        <div className="admin-sidebar__header">
          <Link to="/admin/dashboard" className="admin-sidebar__brand">
            <img src={logo} alt="Tigers Gym Logo" className="admin-sidebar__logo" />
            <div className="admin-sidebar__brand-text">
              <span className="admin-sidebar__brand-title">TIGERS GYM</span>
              <span className="admin-sidebar__brand-sub">Admin Portal</span>
            </div>
          </Link>
          <button
            type="button"
            className="admin-sidebar__close-btn"
            onClick={onClose}
            aria-label="Close Sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__section-label">MAIN NAVIGATION</span>
          <ul className="admin-sidebar__menu">
            {navItems.map((item) => (
              <li key={item.path} className="admin-sidebar__item">
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
                  }
                >
                  <span className="admin-sidebar__icon">{item.icon}</span>
                  <span className="admin-sidebar__label">{item.name}</span>
                  {item.status && (
                    <span className={`admin-sidebar__badge ${item.badgeClass}`}>
                      {item.status}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__footer-btn" target="_blank">
            <FaExternalLinkAlt /> View Website
          </Link>
          <button
            type="button"
            className="admin-sidebar__footer-btn admin-sidebar__footer-btn--logout"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
