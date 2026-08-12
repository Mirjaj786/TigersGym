import React, { useState } from "react";
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
  FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../assets/logo.jpeg";

export default function AdminSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { adminUser, logoutUser } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = async () => {
    await logoutUser();
    setShowLogoutConfirm(false);
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin/dashboard", name: "Dashboard Overview", icon: <FaChartPie />, status: null },
    { path: "/admin/gallery", name: "Gallery Management", icon: <FaImages />, status: "Active", badgeClass: "badge--active" },
    { path: "/admin/messages", name: "Contact Inquiries", icon: <FaEnvelope />, status: "Active", badgeClass: "badge--active" },
    { path: "/admin/customers", name: "Customer Management", icon: <FaUsers />, status: "Soon", badgeClass: "badge--soon" },
    { path: "/admin/attendance", name: "Attendance Tracking", icon: <FaCalendarCheck />, status: "Soon", badgeClass: "badge--soon" },
    { path: "/admin/fees", name: "Fee Management", icon: <FaCreditCard />, status: "Soon", badgeClass: "badge--soon" },
    { path: "/admin/trainers", name: "Trainer & Staff", icon: <FaUserTie />, status: "Soon", badgeClass: "badge--soon" },
    { path: "/admin/plans", name: "Membership Plans", icon: <FaTags />, status: "Soon", badgeClass: "badge--soon" },
    { path: "/admin/settings", name: "Gym Settings", icon: <FaCog />, status: "Soon", badgeClass: "badge--soon" },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="admin-sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}>
        {/* Header */}
        <div className="admin-sidebar__header">
          <Link to="/admin/dashboard" className="admin-sidebar__brand">
            <img src={logo} alt="Tigers Gym Logo" className="admin-sidebar__logo" />
            <div className="admin-sidebar__brand-text">
              <span className="admin-sidebar__brand-title">TIGERS GYM</span>
              <span className="admin-sidebar__brand-sub">Admin Portal</span>
            </div>
          </Link>
          <button type="button" className="admin-sidebar__close-btn" onClick={onClose} aria-label="Close Sidebar">
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
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
                    <span className={`admin-sidebar__badge ${item.badgeClass}`}>{item.status}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Card & Footer */}
        <div className="admin-sidebar__footer">
          <div className="sidebar-user-card">
            <span className="sidebar-user-name">{adminUser?.name || "Admin User"}</span>
            {/* <span className="sidebar-user-email">{adminUser?.email || "admin@tigersgym.com"}</span> */}
          </div>

          <Link to="/" className="admin-sidebar__footer-btn" target="_blank">
            <FaExternalLinkAlt /> View Website
          </Link>
          <button
            type="button"
            className="admin-sidebar__footer-btn admin-sidebar__footer-btn--logout"
            onClick={() => setShowLogoutConfirm(true)}
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-backdrop" onClick={() => setShowLogoutConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
            <div className="modal-header">
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171" }}>
                <FaExclamationTriangle /> Confirm Sign Out
              </h3>
              <button className="modal-close" onClick={() => setShowLogoutConfirm(false)}>
                <FaTimes />
              </button>
            </div>
            <div style={{ padding: "0.5rem 0 1rem 0", color: "#cbd5e1", fontSize: "0.92rem", lineHeight: "1.5" }}>
              Are you sure you want to sign out of <strong>Tigers Gym Admin Portal</strong>? You will need to log back in to access management features.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </button>
              <button type="button" className="btn-submit" style={{ backgroundColor: "#ef4444", color: "#fff" }} onClick={handleConfirmLogout}>
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
