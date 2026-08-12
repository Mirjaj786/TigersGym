import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSearch, FaUserShield, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import logo from "../../assets/logo.jpeg";

export default function AdminHeader({ onToggleSidebar, pageTitle = "Dashboard" }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
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
          <span className="admin-header__subtitle">Tigers Gym Management Console</span>
        </div>
      </div>

      <div className="admin-header__right">
        {/* Search Input */}
        <div className="admin-header__search">
          <FaSearch className="admin-header__search-icon" />
          <input
            type="text"
            placeholder="Search features, members, gallery..."
            className="admin-header__search-input"
          />
        </div>

        {/* Live Badge */}
        <div className="admin-header__status">
          <span className="admin-header__status-dot"></span>
          <span className="admin-header__status-text">Gym Open</span>
        </div>

        {/* Profile Menu */}
        <div className="admin-header__profile-wrap">
          <button
            type="button"
            className="admin-header__profile-btn"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          >
            <img src={logo} alt="Admin Logo" className="admin-header__avatar" />
            <div className="admin-header__user-info">
              <span className="admin-header__user-name">Gym Manager</span>
              <span className="admin-header__user-role">Administrator</span>
            </div>
            <FaChevronDown className={`admin-header__chevron ${showProfileMenu ? "admin-header__chevron--open" : ""}`} />
          </button>

          {showProfileMenu && (
            <div className="admin-header__dropdown">
              <div className="admin-header__dropdown-header">
                <p className="admin-header__dropdown-name">Tigers Gym Admin</p>
                <p className="admin-header__dropdown-email">admin@tigersgym.com</p>
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
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
