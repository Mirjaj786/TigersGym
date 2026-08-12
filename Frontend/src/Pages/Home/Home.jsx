import { Link } from "react-router-dom";
import "./Home.css";
import {
  features,
  programs,
  membershipFeatures,
} from "../../TempData/HomeData";
import {
  FaDumbbell,
  FaGift,
  FaHeartbeat,
  FaUsers,
  FaMoneyBillWave,
  FaRunning,
  FaAppleAlt,
  FaWeight,
  FaArrowRight,
  FaCheckCircle,
  FaFire,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import gym_owner from "../../assets/images/Gym_Owner.png";

/* ─── Component ───────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="home">
      {/* ── 1. HERO ── */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__heading">
            Start Your Fitness Journey <br />
            At Your <span className="hero__accent">Neighborhood</span> Gym
          </h1>
          <p className="hero__subtext">
            Affordable memberships, quality equipment, and personal guidance
            from our experienced gym owner. Whether you're a beginner or already
            into fitness, we're here to help you get healthier and stronger.
          </p>
          <div className="hero__buttons">
            <Link to="/membership" className="btn btn--primary">
              Join Now
            </Link>
            <Link to="/programs" className="btn btn--outline">
              Explore Programs
            </Link>
          </div>
        </div>

        {/* Feature highlights — replacing fake statistics */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-icon" style={{ color: "#ff3b3f" }}>
              <FaMoneyBillWave />
            </span>
            <span className="hero__stat-label">Affordable Membership</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-icon">
              <FaDumbbell />
            </span>
            <span className="hero__stat-label">Modern Equipment</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-icon">
              <FaClock />
            </span>
            <span className="hero__stat-label">Open Daily</span>
          </div>
        </div>
      </section>

      {/* ── 2. WHY CHOOSE US ── */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">A Gym That Feels Like Home</h2>
            <p className="section-desc">
              Everything you need to stay consistent and make real progress —
              without the premium price tag.
            </p>
          </div>
          <div className="features__grid">
            {features.map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROGRAMS ── */}
      <section className="programs">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Programs</span>
            <h2 className="section-title">Train With Purpose</h2>
            <p className="section-desc">
              Beginner-friendly programs for every fitness goal — all under one
              roof.
            </p>
          </div>
          <div className="programs__grid">
            {programs.map((p) => (
              <article className="program-card" key={p.title}>
                <div className="program-card__img-wrap">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="program-card__img"
                    loading="lazy"
                  />
                </div>
                <div className="program-card__body">
                  <span className="program-card__icon">{p.icon}</span>
                  <h3 className="program-card__title">{p.title}</h3>
                  <p className="program-card__desc">{p.desc}</p>
                  <Link to="/programs" className="program-card__link">
                    Learn More <FaArrowRight className="program-card__arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. MEMBERSHIP PREVIEW ── */}
      <section className="membership">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing</span>
            <h2 className="section-title">Simple, Honest Pricing</h2>
            <p className="section-desc">
              No hidden fees. No long-term lock-ins. Just straightforward,
              affordable membership for everyone.
            </p>
          </div>

          <div className="membership__grid">
            {/* Offer Card */}
            <div className="membership-offer">
              <span className="membership-offer__badge">
                <FaFire /> Limited Time Offer
              </span>
              <p className="membership-offer__label">Monthly Membership</p>
              <div className="membership-offer__pricing">
                <span className="membership-offer__old">₹600</span>
                <span className="membership-offer__new">₹349</span>
                <span className="membership-offer__save">Save ₹101</span>
              </div>
              <p className="membership-offer__note">
                * Valid for new members only
              </p>
              <Link to="/membership" className="btn btn--primary">
                Grab This Offer
              </Link>

              <div className="referral-card">
                <div className="referral-card__body">
                  <h2>
                    <FaGift /> Refer a friend
                  </h2>

                  <p>
                    To FITZONE and get{" "}
                    <strong style={{ color: "red" }}>₹100 OFF</strong> on your
                    next month's membership.
                  </p>
                  <small>*Terms &amp; conditions apply.</small>
                </div>
                {/* <div className="referral-card__badge">
                  ₹100<span>OFF</span>
                </div> */}
              </div>
            </div>

            {/* Regular Pricing */}
            <div className="membership-regular">
              <h3 className="membership-regular__title">Regular Pricing</h3>
              <div className="membership-regular__rows">
                <div className="membership-regular__row">
                  <span className="membership-regular__item">
                    Monthly Membership
                  </span>

                  <span className="membership-regular__price">
                    <del>₹600</del> ₹400/month
                  </span>
                </div>
                <div className="membership-regular__row">
                  <span className="membership-regular__item">
                    One-Time Registration
                  </span>
                  <span className="membership-regular__price">
                    {" "}
                    <del>₹1,600</del> &nbsp;₹1,200
                  </span>
                </div>
              </div>

              <ul className="membership-regular__features">
                {membershipFeatures.map((feat) => (
                  <li key={feat} className="membership-regular__feature">
                    <FaCheckCircle className="membership-regular__check" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link to="/membership" className="btn btn--dark">
                View Membership Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. MEET THE OWNER ── */}
      <section className="owner">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Team</span>
            <h2 className="section-title">Meet Your Coach</h2>
          </div>
          <div className="owner__inner">
            {/* Owner image — swap src with a real photo when available */}
            <div className="owner__img-wrap">
              <img
                src={gym_owner}
                alt="Gym Owner"
                className="owner__img"
                loading="lazy"
              />
            </div>
            <div className="owner__body">
              <span className="owner__tag">
                <FaMapMarkerAlt /> Your Neighborhood Gym
              </span>
              <h3 className="owner__name">The Gym Owner</h3>
              <p className="owner__bio">
                Our gym is guided by an experienced fitness enthusiast who
                personally helps members with workout techniques, exercise
                guidance, and motivation. With years of hands-on gym experience,
                they understand what beginners need and how to keep members
                consistent and progressing.
              </p>
              <p className="owner__bio">
                Whether you're walking into a gym for the first time or looking
                to get back on track, you'll always have someone in your corner
                to support your fitness journey.
              </p>
              <Link to="/contact" className="btn btn--primary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CALL TO ACTION ── */}
      <section className="cta">
        <div className="container cta__inner">
          <h2 className="cta__heading">Ready To Start Your Fitness Journey?</h2>
          <p className="cta__desc">
            Join our growing fitness community and take the first step toward a
            healthier lifestyle today.
          </p>
          <div className="cta__buttons">
            <Link to="/membership" className="btn btn--primary btn--lg">
              Join Now
            </Link>
            <Link to="/contact" className="btn btn--outline btn--lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
