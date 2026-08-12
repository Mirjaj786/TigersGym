import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="logo" className="logo-img" />
        </Link>

        {/* Navigation */}
        <nav className={`nav-links ${isOpen ? "nav-open" : ""}`}>

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>

          <NavLink to="/programs" onClick={closeMenu}>
            Programs
          </NavLink>

          <NavLink to="/membership" onClick={closeMenu}>
            Membership
          </NavLink>

          <NavLink to="/gallery" onClick={closeMenu}>
            Gallery
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

          {/* Mobile Buttons */}
          <div className="mobile-buttons">
            <Link
              to="/membership"
              className="mobile-join-btn"
              onClick={closeMenu}
            >
              Join Now
            </Link>

            <Link
              to="/admin/login"
              className="mobile-admin-btn"
              onClick={closeMenu}
            >
              Admin Login
            </Link>
          </div>
        </nav>

        {/* Desktop Buttons */}
        <div className="navbar-actions">
          <Link to="/admin/login" className="admin-link">
            Admin Login
          </Link>

          <Link to="/membership" className="join-btn">
            Join Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;