import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaUserShield,
  FaSignOutAlt,
  FaChevronDown,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../assets/logo.jpeg";

export default function AdminHeader({ onToggleSidebar, pageTitle = "Dashboard" }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { adminUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    await logoutUser();
    setShowLogoutModal(false);
    setShowProfileMenu(false);
    navigate("/admin/login");
  };

  return (
    <>
      <header className="admin-header">
        <div className="admin-header__left">
          <button
            type="button"
            className="admin-header__toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>
          <div className="admin-header__title-wrap">
            <h2 className="admin-header__title">{pageTitle}</h2>
          </div>
        </div>

        <div className="admin-header__right">
          {/* Search Input */}
          {/* <div className="admin-header__search">
            <FaSearch className="admin-header__search-icon" />
            <input
              type="text"
              placeholder="Search features, members, gallery..."
              className="admin-header__search-input"
            />
          </div> */}

          {/* Live Status
          <div className="admin-header__status">
            <span className="admin-header__status-dot"></span>
            <span className="admin-header__status-text">Gym Open</span>
          </div> */}

          {/* Profile Menu */}
          <div className="admin-header__profile-wrap">
            <button
              type="button"
              className="admin-header__profile-btn"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              <img src={logo} alt="Admin Logo" className="admin-header__avatar" />
              <div className="admin-header__user-info">
                <span className="admin-header__user-name">{adminUser?.name || "Manager"}</span>
                <span className="admin-header__user-role">Owner</span>
              </div>
              <FaChevronDown className={`admin-header__chevron ${showProfileMenu ? "admin-header__chevron--open" : ""}`} />
            </button>

            {showProfileMenu && (
              <div className="admin-header__dropdown">
                <div className="admin-header__dropdown-header">
                  <p className="admin-header__dropdown-name">{adminUser?.name || "Tigers Gym Admin"}</p>
                  <p className="admin-header__dropdown-email">{adminUser?.email || "www.tigersgym@gmail.com"}</p>
                </div>
                <div className="admin-header__dropdown-divider" />
                <button
                  type="button"
                  className="admin-header__dropdown-item"
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/admin/settings");
                  }}
                >
                  <FaUserShield /> System Settings
                </button>
                <button
                  type="button"
                  className="admin-header__dropdown-item admin-header__dropdown-item--danger"
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowLogoutModal(true);
                  }}
                >
                  <FaSignOutAlt /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-backdrop" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "420px" }}>
            <div className="modal-header">
              <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171" }}>
                <FaExclamationTriangle /> Confirm Sign Out
              </h3>
              <button className="modal-close" onClick={() => setShowLogoutModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div style={{ padding: "0.5rem 0 1rem 0", color: "#cbd5e1", fontSize: "0.92rem", lineHeight: "1.5" }}>
              Are you sure you want to sign out of <strong>Tigers Gym Admin Portal</strong>?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowLogoutModal(false)}>
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
