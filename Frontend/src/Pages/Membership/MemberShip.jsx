import { Link } from "react-router-dom";
import {
  FaDumbbell,
  FaCheckCircle,
  FaGift,
  FaUsers,
  FaFire,
  FaClock,
  FaMoneyBillWave,
  FaTags,
  FaSmile,
  FaStar,
  FaQuestionCircle,
  FaBullhorn,
} from "react-icons/fa";
import "./Membership.css";

import {
  membershipFeatures,
  registrationIncludes,
  benefits,
  whyJoin,
  faqs,
} from "../../TempData/MemberShipData";

export default function Membership() {
  return (
    <main className="mem-page">
      {/* ── 1. HERO ── */}
      <section className="mem-hero">
        <div className="overlay" />
        <div className="mem-hero__content">
          <span className="tag">Membership Plans</span>
          <h1 className="mem-hero__heading">
            Affordable Fitness
            <br />
            For Everyone
          </h1>
          <p className="mem-hero__sub">
            Join our gym and begin your fitness journey with affordable
            membership plans, a friendly environment, and quality equipment.
          </p>
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/" className="breadcrumb__link">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="breadcrumb__current">Membership</span>
          </nav>
        </div>
      </section>

      {/* ── 2. LIMITED TIME OFFER ── */}
      <section className="mem-offer">
        <div className="container">
          <div className="offer-banner">
            <div className="offer-banner__left">
              <p className="offer-banner__tag">
                <FaFire /> Limited Time Joining Offer
              </p>
              <h2 className="offer-banner__heading">
                Start your fitness journey today!
              </h2>
              <div className="offer-banner__prices">
                <span className="price-old">₹600</span>
                <span className="price-new">
                  ₹499<small>/month</small>
                </span>
                <span className="price-save">Save ₹101</span>
              </div>
              <ul className="offer-banner__notes">
                <li>
                  <FaCheckCircle /> For new members only
                </li>
                <li>
                  <FaCheckCircle /> Limited time offer
                </li>
                <li>
                  <FaCheckCircle /> Registration fee applies separately
                </li>
              </ul>
            </div>
            <Link to="/contact" className="btn btn--white">
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. PRICING ── */}
      <section className="mem-pricing">
        <div className="container">
          <div className="section-header">
            <span className="tag">Pricing</span>
            <h2 className="section-title">Membership Plans</h2>
            <p className="section-desc">Simple, honest pricing for everyone.</p>
          </div>
          <div className="pricing-grid">
            {/* Monthly */}
            <div className="price-card price-card--red">
              <span className="price-card__badge">Monthly Plan</span>
              <h3>Monthly Membership</h3>
              <div className="price-card__amount">
                <del style={{ color: "red" }}>₹600</del> ₹400<span>/month</span>
              </div>
              <ul className="price-card__list">
                {membershipFeatures.map((f) => (
                  <li key={f}>
                    <FaCheckCircle className="check-icon" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn btn--primary">
                Join Today
              </Link>
            </div>

            {/* Registration */}
            <div className="price-card price-card--dark">
              <span className="price-card__badge price-card__badge--gray">
                One-Time Fee
              </span>
              <h3>Registration Fee</h3>
              <div className="price-card__amount">
                <del style={{ color: "red" }}> ₹1600</del> ₹1,200
                <br />
                <span>one-time</span>
              </div>
              <ul className="price-card__list price-card__list2">
                {registrationIncludes.map((f) => (
                  <li key={f}>
                    <FaCheckCircle className="check-icon" /> {f}
                  </li>
                ))}
              </ul>
              <div className="btn-div">
                <Link to="/contact" className="btn btn--outline btn2">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BENEFITS ── */}
      <section className="mem-section bg-gray">
        <div className="container">
          <div className="section-header">
            <span className="tag">Benefits</span>
            <h2 className="section-title">Membership Benefits</h2>
            <p className="section-desc">
              Everything you get when you join FITZONE.
            </p>
          </div>
          <div className="cards-grid cards-grid--3">
            {benefits.map((b) => (
              <div className="feature-card" key={b.title}>
                <span className="feature-card__icon">{b.icon}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY JOIN ── */}
      <section className="mem-section bg-white">
        <div className="container">
          <div className="section-header">
            <span className="tag">Why Join</span>
            <h2 className="section-title">Why Join Our Gym</h2>
            <p className="section-desc">Honest reasons to choose FITZONE.</p>
          </div>
          <div className="cards-grid cards-grid--4">
            {whyJoin.map((w) => (
              <div className="feature-card" key={w.title}>
                <span className="feature-card__icon">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. REFERRAL ── */}
      <section className="mem-section bg-gray">
        <div className="container">
          <div className="referral-card">
            <div className="referral-card__body">
              <h2>
                <FaGift /> Bring a Friend
              </h2>
              <p>
                Refer a friend to FITZONE and you receive{" "}
                <strong style={{ color: "red" }}>₹100 OFF</strong> on your next
                month's membership.
              </p>
              <small>*Terms &amp; conditions apply.</small>
            </div>
            <div className="referral-card__badge">
              ₹100<span>OFF</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FESTIVAL OFFERS ── */}
      <section className="mem-section bg-white">
        <div className="container">
          <div className="festival-card">
            <span className="tag">
              <FaBullhorn /> Festival Offers
            </span>
            <h2>Special Festival Discounts</h2>
            <p>
              Special discounts may be available during festive seasons
              including:
            </p>
            <ul>
              <li>🎊 Durga Puja</li>
              <li>🎆 New Year</li>
              <li>🌙 Eid</li>
            </ul>
            <p className="festival-card__note">
              Visit our gym to know about current offers.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="mem-section bg-gray">
        <div className="container">
          <div className="section-header">
            <span className="tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Quick answers before you join.</p>
          </div>
          <div className="cards-grid cards-grid--2">
            {faqs.map((faq) => (
              <div className="faq-card" key={faq.q}>
                <FaQuestionCircle className="faq-card__icon" />
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA ── */}
      <section className="mem-cta">
        <div className="container mem-cta__inner">
          <h2>Start Your Fitness Journey Today</h2>
          <p>
            Join our growing fitness community and take the first step toward a
            healthier lifestyle.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn--primary">
              Join Now
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
