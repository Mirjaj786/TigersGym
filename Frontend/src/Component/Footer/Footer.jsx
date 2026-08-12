import "./Footer.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaClock,
} from "react-icons/fa";
import logo from "../../assets/logo.jpeg";
import { Link, NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ── Brand ── */}
        <div className="footer-section footer-brand">
          <Link to="/" className="logo">
            <img
              src={logo}
              alt="logo"
              className="logo-img"
              style={{ height: "90px" }}
            />
          </Link>

          <p>
            Your friendly local gym helping people build strength, improve
            fitness, and stay consistent every day.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF style={{ color: "#e5e5e5" }} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* ── Contact ── */}
        <div className="footer-section">
          <h3>Contact</h3>

          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <a href="https://www.google.com/maps/place/Tiger's+Gym/@25.4476007,87.856794,1577m/data=!3m1!1e3!4m6!3m5!1s0x39fac794a048c527:0x699cadda6576ed02!8m2!3d25.4474201!4d87.8589763!16s%2Fg%2F11zj6t2x_6?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D">
              Sultannagar, Harishchandra Pur, Malda
            </a>
          </div>

          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>+91 6294557732</span>
          </div>

          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:www.tigersgym@gmail.com" className="contact-link">
              www.tigersgym@gmail.com
            </a>
          </div>

          <div className="contact-item">
            <FaClock className="contact-icon" />
            <span>
              5:00 AM – 12:00 PM
              <br />
              3:00 PM – 10:00 PM
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FITZONE. Built with ❤️ for the local fitness community.
      </div>
    </footer>
  );
}

export default Footer;
