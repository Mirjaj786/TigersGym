import React from "react";

import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaFire,
  FaHeartbeat,
  FaUserTie,
  FaRunning,
  FaLeaf,
  FaChalkboardTeacher,
  FaClipboardList,
  FaClock,
  FaSmile,
} from "react-icons/fa";
import "./Programs.css";
import { programs, whyFeatures, schedule } from "../../TempData/ProgramData";

/* badge colour based on level */
const levelClass = (level) => {
  if (level === "Beginner") return "badge--green";
  if (level === "Advanced") return "badge--red";
  return "badge--gray";
};

/* ─── Component ───────────────────────────────────────────── */

export default function Programs() {
  return (
    <main className="programs-page">
      {/* ── 1. HERO ── */}
      <section className="prog-hero">
        <div className="prog-hero__overlay" />
        <div className="prog-hero__content">
          <span className="section-tag">Our Programs</span>
          <h1 className="prog-hero__heading">
            Train Smarter.
            <br />
            Get Stronger.
            <br />
            Stay Consistent.
          </h1>
          <p className="prog-hero__subtext">
            Choose the perfect training program designed to match your fitness
            goals, whether you're a beginner or an experienced athlete.
          </p>
          <nav className="prog-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="prog-hero__crumb-link">
              Home
            </Link>
            <span className="prog-hero__crumb-sep" aria-hidden="true">
              /
            </span>
            <span className="prog-hero__crumb-current">Programs</span>
          </nav>
        </div>
      </section>

      {/* ── 2. OUR TRAINING PROGRAMS ── */}
      <section className="prog-list">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Our Training Programs</h2>
            <p className="section-desc">
              Six expert-led programs covering every fitness goal — from fat
              loss to elite strength. Pick yours and start today.
            </p>
          </div>

          <div className="prog-list__grid">
            {programs.map((prog) => (
              <article className="prog-card" key={prog.name}>
                {/* Icon */}
                <span className="prog-card__icon">{prog.icon}</span>

                {/* Name + description */}
                <h3 className="prog-card__name">{prog.name}</h3>
                <p className="prog-card__desc">{prog.desc}</p>

                {/* Meta row */}
                <div className="prog-card__meta">
                  <span className="prog-card__meta-item">
                    <FaClock className="prog-card__meta-icon" />
                    {prog.duration}
                  </span>
                  <span className={`badge ${levelClass(prog.level)}`}>
                    {prog.level}
                  </span>
                </div>

                {/* CTA */}
                <Link to="/membership" className="btn btn--dark prog-card__btn">
                  Learn More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHY CHOOSE OUR PROGRAMS ── */}
      <section className="prog-why">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">Why Choose Our Programs</h2>
            <p className="section-desc">
              Every program is built on four pillars that guarantee you make
              progress every single session.
            </p>
          </div>

          <div className="prog-why__grid">
            {whyFeatures.map((f) => (
              <div className="prog-why-card" key={f.title}>
                <span className="prog-why-card__icon">{f.icon}</span>
                <h3 className="prog-why-card__title">{f.title}</h3>
                <p className="prog-why-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WEEKLY TRAINING SCHEDULE ── */}
      <section className="prog-schedule">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Schedule</span>
            <h2 className="section-title">Weekly Training Schedule</h2>
            <p className="section-desc">
              Plan your week with our fixed program timetable. Every session is
              led by a certified trainer.
            </p>
          </div>

          {/* Scrollable wrapper for small screens */}
          <div className="schedule-table-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Program</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.day}>
                    <td className="schedule-table__day">{row.day}</td>
                    <td>{row.program}</td>
                    <td className="schedule-table__time">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. CALL TO ACTION ── */}
      <section className="prog-cta">
        <div className="container prog-cta__inner">
          <h2 className="prog-cta__heading">
            Ready To Start Your Fitness Journey?
          </h2>
          <p className="prog-cta__desc">
            Take the first step toward a healthier and stronger lifestyle. Join
            our gym today and achieve your fitness goals with expert guidance.
          </p>
          <div className="prog-cta__buttons">
            <Link to="/membership" className="btn btn--primary">
              Join Now
            </Link>
            <Link to="/contact" className="btn btn--dark">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
