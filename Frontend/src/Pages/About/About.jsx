import React from "react";

import { Link } from "react-router-dom";
import "./About.css";
import {
  storyStats,
  mvCards,
  facilityFeatures,
  achievements,
} from "../../TempData/AboutPageData";

export default function About() {
  return (
    <main className="about">
      {/* ── 1. HERO ── */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <span className="section-tag">About FITZONE</span>
          <h1 className="about-hero__heading">
            Your Local Gym.
            <br />
            Your Fitness Journey.
          </h1>
          <p className="about-hero__subtext">
            FITZONE is a friendly neighbourhood gym dedicated to helping you get
            healthier, stronger and more consistent — no matter where you're
            starting from.
          </p>
          {/* Breadcrumb navigation */}
          <nav className="about-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="about-hero__crumb-link">
              Home
            </Link>
            <span className="about-hero__crumb-sep" aria-hidden="true">
              /
            </span>
            <span className="about-hero__crumb-current">About</span>
          </nav>
        </div>
      </section>

      {/* ── 2. OUR STORY ── */}
      <section className="story">
        <div className="container story__inner">
          {/* Left: image */}
          <div className="story__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
              alt="FITZONE gym floor"
              className="story__image"
              loading="lazy"
            />
          </div>

          {/* Right: text content */}
          <div className="story__content">
            <span className="section-tag">Our Story</span>
            <h2 className="story__title">Who We Are</h2>
            <p className="story__text">
              FITZONE started with a simple idea — to create an affordable,
              welcoming gym where local people could work on their fitness
              without feeling intimidated or overpaying for it.
            </p>
            <p className="story__text">
              We are a small local gym, personally run by someone who is
              passionate about fitness and genuinely wants to help members
              improve. Whether you are just starting out or getting back into a
              routine, you will always receive personal attention and honest
              guidance here.
            </p>

            {/* Quick-stat chips — honest, no fake numbers */}
            <div className="story__stats">
              {storyStats.map((s) => (
                <div className="story__stat" key={s.label}>
                  <span className="story__stat-value">{s.value}</span>
                  <span className="story__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <Link to="/programs" className="btn btn--primary">
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION ── */}
      <section className="mv">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Purpose</span>
            <h2 className="section-title">Mission &amp; Vision</h2>
            <p className="section-desc">
              The values that guide everything we do at FITZONE.
            </p>
          </div>
          <div className="mv__grid">
            {mvCards.map((card) => (
              <div className="mv-card" key={card.title}>
                <span className="mv-card__icon">{card.icon}</span>
                <h3 className="mv-card__title">{card.title}</h3>
                <p className="mv-card__desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE FITZONE ── */}
      <section className="why">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why FITZONE</span>
            <h2 className="section-title">
              Everything You Need to Stay Consistent
            </h2>
            <p className="section-desc">
              We have built a space that keeps things simple, supportive and
              affordable so you can focus on what matters — your progress.
            </p>
          </div>
          <div className="why__grid">
            {facilityFeatures.map((f) => (
              <div className="why-card" key={f.title}>
                <span className="why-card__icon" key={f.title}>{f.icon}</span>
                <h3 className="why-card__title">{f.title}</h3>
                <p className="why-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. OUR FACILITY ── */}
      <section className="facility">
        <div className="container facility__inner">
          {/* Left: text */}
          <div className="facility__content">
            <span className="section-tag">Our Facility</span>
            <h2 className="facility__title">A Clean, Well-Equipped Gym</h2>
            <p className="facility__desc">
              FITZONE is equipped with everything you need for a productive
              workout. Our equipment is well-maintained and the space is kept
              clean so you can train comfortably every day.
            </p>
            <ul className="facility__list">
              {facilityFeatures.map((item) => (
                <li className="facility__list-item" key={item}>
                  <span className="facility__list-check" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/membership" className="btn btn--primary">
              View Membership Plans
            </Link>
          </div>

          {/* Right: image */}
          <div className="facility__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="FITZONE gym facility"
              className="facility__image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ── 6. ACHIEVEMENTS — replaced fake counters with program highlights ── */}
      <section className="achievements">
        <div className="container achievements__grid">
          {achievements.map((a, index) => (
            <div className="achievement" key={a.label}>
              <span className="achievement__number">{a.number}</span>
              <span className="achievement__label">{a.label}</span>
              {/* Red divider — hidden after last item */}
              {index < achievements.length - 1 && (
                <span className="achievement__divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CALL TO ACTION ── */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <h2 className="about-cta__heading">
            Ready To Start Your Fitness Journey?
          </h2>
          <p className="about-cta__desc">
            Start your fitness journey with FITZONE. Whether your goal is weight
            loss, muscle building or simply staying active, we are here to
            support you every step of the way.
          </p>
          <div className="about-cta__buttons">
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
