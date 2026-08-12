import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { submitContactForm } from "../../services/api";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
  FaCheckCircle,
  FaDirections,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Contact.css";

import {
  contactCards,
  socialLinks,
  faqs,
} from "../../TempData/ContactPageData";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.DivIcon({
  className: "fitzone-marker-wrap",
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44"
              width="32" height="44"
              style="filter:drop-shadow(0 4px 10px rgba(255,59,63,.55));display:block;">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 10.667 14.222 26.667 15.111 27.733
             a1.185 1.185 0 001.778 0C17.778 42.667 32 26.667 32 16
             32 7.163 24.837 0 16 0z" fill="#ff3b3f"/>
    <circle cx="16" cy="16" r="7.5" fill="#ffffff"/>
    <circle cx="16" cy="16" r="4.5" fill="#ff3b3f"/>
  </svg>`,
  iconSize: [32, 44],
  iconAnchor: [16, 44] /* tip of the pin sits on the coordinate */,
  popupAnchor: [0, -48] /* popup opens above the pin */,
});

function MapReady({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    /* Small delay lets the browser finish painting the flex column */
    const t = setTimeout(() => {
      map.invalidateSize();
      map.setView([lat, lng], 16);
    }, 100);
    return () => clearTimeout(t);
  }, [map, lat, lng]);

  return null;
}

/* ─── Gym location ────────────────────────────────────────── */
const GYM_LAT = 25.4474201;
const GYM_LNG = 87.8589763;
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Tiger's+Gym/@25.4476007,87.856794,1573m/data=!3m1!1e3!4m6!3m5!1s0x39fac794a048c527:0x699cadda6576ed02!8m2!3d25.4474201!4d87.8589763!16s%2Fg%2F11zj6t2x_6";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "Enter a valid email address.";
    }
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      // 1. Post to Backend via API service (deployed on Vercel)
      await submitContactForm(form);
    } catch (err) {
      console.log("Posting to backend failed.");
    }

    // 2. Save locally for instant persistence in admin dashboard
    const savedInquiries = JSON.parse(localStorage.getItem("tigers_gym_inquiries") || "[]");
    const newInquiry = {
      id: Date.now(),
      ...form,
      status: "Pending",
      createdAt: new Date().toISOString(),
      replyMessage: "",
    };
    localStorage.setItem("tigers_gym_inquiries", JSON.stringify([newInquiry, ...savedInquiries]));

    setSubmitted(true);
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="contact-page">
      {/* ── 1. HERO ── */}
      <section className="con-hero">
        <div className="con-hero__overlay" />
        <div className="con-hero__content">
          <span className="section-tag">Contact Us</span>
          <h1 className="con-hero__heading">
            Let's Build
            <br />
            Your Fitness Journey
            <br />
            Together
          </h1>
          <p className="con-hero__subtext">
            Have questions about memberships or our gym? We're always happy to
            help. Visit us, call us, or send us a message.
          </p>
          <nav className="con-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="con-hero__crumb-link">
              Home
            </Link>
            <span className="con-hero__crumb-sep" aria-hidden="true">
              /
            </span>
            <span className="con-hero__crumb-current">Contact</span>
          </nav>
        </div>
      </section>

      {/* ── 2. CONTACT INFO CARDS ── */}
      <section className="con-info">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Contact Information</h2>
            <p className="section-desc">
              Reach out through any of the channels below and we'll get back to
              you as soon as possible.
            </p>
          </div>
          <div className="con-info__grid">
            {contactCards.map((card) => (
              <div className="con-info-card" key={card.title}>
                <span className="con-info-card__icon">{card.icon}</span>
                <h3 className="con-info-card__title">{card.title}</h3>
                {card.lines.map((line) => (
                  <p className="con-info-card__line" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FORM + MAP ── */}
      <section className="con-form-map">
        <div className="container con-form-map__inner">
          {/* ── Contact Form ── */}
          <div className="con-form-wrap">
            <h2 className="con-form__title">Send Us a Message</h2>
            <p className="con-form__subtitle">
              Fill in the form below and we'll respond within 24 hours.
            </p>

            {submitted && (
              <div className="con-form__success">
                <FaCheckCircle className="con-form__success-icon" />
                Thank you! Your message has been sent. We'll get back to you
                soon.
              </div>
            )}

            <form className="con-form" onSubmit={handleSubmit} noValidate>
              <div className="con-form__row">
                <div className="con-form__field">
                  <label className="con-form__label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    className={`con-form__input${errors.name ? " con-form__input--error" : ""}`}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Arjun Mehta"
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <span className="con-form__error">{errors.name}</span>
                  )}
                </div>
                <div className="con-form__field">
                  <label className="con-form__label" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    className={`con-form__input${errors.phone ? " con-form__input--error" : ""}`}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+91 98300 12345"
                    value={form.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <span className="con-form__error">{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className="con-form__field">
                <label className="con-form__label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className={`con-form__input${errors.email ? " con-form__input--error" : ""}`}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="con-form__error">{errors.email}</span>
                )}
              </div>

              <div className="con-form__field">
                <label className="con-form__label" htmlFor="subject">
                  Subject
                </label>
                <input
                  className={`con-form__input${errors.subject ? " con-form__input--error" : ""}`}
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Membership Inquiry"
                  value={form.subject}
                  onChange={handleChange}
                />
                {errors.subject && (
                  <span className="con-form__error">{errors.subject}</span>
                )}
              </div>

              <div className="con-form__field">
                <label className="con-form__label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className={`con-form__textarea${errors.message ? " con-form__input--error" : ""}`}
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && (
                  <span className="con-form__error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--primary con-form__submit"
              >
                <FaPaperPlane className="con-form__submit-icon" />
                Send Message
              </button>
            </form>
          </div>

          {/* ── MAP ── */}
          <div className="con-map-wrap">
            {/* Dark header bar */}
            <div className="con-map__header">
              <div className="con-map__header-info">
                <h3 className="con-map__title">
                  <FaMapMarkerAlt className="con-map__title-icon" />
                  Find Us Here
                </h3>
                <p className="con-map__address">Malda, West Bengal</p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="con-map__directions-btn"
                aria-label="Get directions on Google Maps"
              >
                <FaDirections />
                Get Directions
              </a>
            </div>

            <div className="con-map__leaflet">
              <MapContainer
                center={[GYM_LAT, GYM_LNG]}
                zoom={16}
                scrollWheelZoom={false}
                zoomControl={true}
                style={{ width: "100%", height: "100%" }}
              >
                <MapReady lat={GYM_LAT} lng={GYM_LNG} />

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker
                  position={[GYM_LAT, GYM_LNG]}
                  icon={redIcon}
                  eventHandlers={{
                    mouseover: (e) => {
                      e.target.openPopup();
                    },
                  }}
                >
                  <Popup minWidth={200} maxWidth={260} className="pop-up">
                    <div className="fitzone-popup__inner">
                      <span className="fitzone-popup__badge">
                        📍 FITZONE Gym
                      </span>
                      <strong className="fitzone-popup__name">
                        Tiger's Gym
                      </strong>
                      <span className="fitzone-popup__address">
                        Malda, West Bengal
                      </span>
                      <a
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fitzone-popup__link"
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Footer strip */}
            <div className="con-map__footer">
              <FaClock className="con-map__footer-icon" />
              <span>
                Open Today: 5:00 AM – 12:00 PM &amp; 3:00 PM – 10:00 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BUSINESS HOURS ── */}
      <section className="con-hours">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Timings</span>
            <h2 className="section-title">Working Hours</h2>
            <p className="section-desc">
              Visit us during our working hours for memberships, gym tours, and
              personalised training consultations.
            </p>
          </div>
          <div className="hours-card">
            <div className="hours-card__row">
              <div className="hours-card__day">
                <span className="hours-card__day-name">Monday – Saturday</span>
                <div className="hours-card__slots">
                  <span className="hours-card__slot">
                    <span className="hours-card__slot-label">Morning</span>
                    <span className="hours-card__slot-time">
                      5:00 AM – 12:00 PM
                    </span>
                  </span>
                  <span className="hours-card__divider" aria-hidden="true" />
                  <span className="hours-card__slot">
                    <span className="hours-card__slot-label">Evening</span>
                    <span className="hours-card__slot-time">
                      3:00 PM – 10:00 PM
                    </span>
                  </span>
                </div>
              </div>
              <div className="hours-card__day hours-card__day--closed">
                <span className="hours-card__day-name">Sunday</span>
                <span className="hours-card__closed-badge">Closed</span>
              </div>
            </div>
            <p className="hours-card__note">
              Visit us during working hours for memberships, gym tours, and free
              fitness consultations.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. FOLLOW US ── */}
      <section className="con-social">
        <div className="container con-social__inner">
          <span className="section-tag">Stay Connected</span>
          <h2 className="section-title">Follow Us</h2>
          <p className="section-desc">
            Stay connected for fitness tips, gym updates, member achievements,
            and exciting events.
          </p>
          <div className="social-icons-row">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="social-icon-btn"
                aria-label={s.label}
                style={{ "--brand": s.color }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="con-social__tagline">
            Join Our Fitness Community Online
          </p>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="con-faq">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Quick answers to the questions we hear most often from new and
              prospective members.
            </p>
          </div>
          <div className="faq-grid">
            {faqs.map((faq) => (
              <div className="faq-card" key={faq.question}>
                <h3 className="faq-card__question">{faq.question}</h3>
                <p className="faq-card__answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="con-cta">
        <div className="container con-cta__inner">
          <h2 className="con-cta__heading">
            Ready To Begin
            <br />
            Your Fitness Journey?
          </h2>
          <p className="con-cta__desc">
            Become a part of our growing fitness family and take the first step
            toward a healthier lifestyle today.
          </p>
          <div className="con-cta__buttons">
            <Link to="/membership" className="btn btn--primary">
              Join Now
            </Link>
            <Link to="/membership" className="btn btn--ghost">
              View Membership Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
