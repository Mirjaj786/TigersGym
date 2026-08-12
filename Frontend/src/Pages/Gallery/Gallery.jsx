import React from "react";
import { Link } from "react-router-dom";
import {
  FaTrophy,
  FaMedal,
  FaCalendarAlt,
  FaUsers,
  FaCheckCircle,
  FaDumbbell,
  FaFire,
  FaRunning,
  FaHeartbeat,
  FaLeaf,
  FaBolt,
} from "react-icons/fa";
import "./Gallery.css";
import {
  getGalleryPhotos,
  getChampions,
  getRecords,
} from "../../services/api";

/* ─── Static Data ─────────────────────────────────────────── */

/* Gym Gallery Images */
const galleryImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    title: "Strength Zone",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    title: "Personal Training",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    title: "Cardio Area",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80",
    title: "Free Weights",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80",
    title: "CrossFit Floor",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80",
    title: "Weight Room",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=600&q=80",
    title: "Group Session",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80",
    title: "Yoga Studio",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
    title: "Functional Zone",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=80",
    title: "Treadmill Row",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80",
    title: "Pull-Up Rig",
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80",
    title: "Stretching Area",
  },
];

/* Wall of Champions */
const champions = [
  {
    id: 1,
    name: "Arjun Mehta",
    month: "January",
    year: "2025",
    attendance: "30 / 30 Days",
    prize: "Gold Medal",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
  },
  {
    id: 2,
    name: "Priya Sharma",
    month: "February",
    year: "2025",
    attendance: "28 / 28 Days",
    prize: "Gold Medal",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&q=80",
  },
  {
    id: 3,
    name: "Rohit Das",
    month: "March",
    year: "2025",
    attendance: "31 / 31 Days",
    prize: "Gold Medal",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80",
  },
  {
    id: 4,
    name: "Sneha Patel",
    month: "April",
    year: "2025",
    attendance: "29 / 30 Days",
    prize: "Gold Medal",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&q=80",
  },
  {
    id: 5,
    name: "Vikram Singh",
    month: "May",
    year: "2025",
    attendance: "31 / 31 Days",
    prize: "Gold Medal",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80",
  },
  {
    id: 6,
    name: "Ananya Roy",
    month: "June",
    year: "2025",
    attendance: "29 / 30 Days",
    prize: "Gold Medal",
    image: "https://images.unsplash.com/photo-1520626964073-8d87e3c5e7a3?w=300&q=80",
  },
];

/* Gym Record Holders */
const records = [
  {
    id: 1,
    member: "Arjun Mehta",
    recordType: "Deadlift",
    recordValue: "220 KG",
    date: "12 Mar 2025",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
    icon: <FaDumbbell />,
  },
  {
    id: 2,
    member: "Vikram Singh",
    recordType: "Bench Press",
    recordValue: "160 KG",
    date: "5 Apr 2025",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80",
    icon: <FaBolt />,
  },
  {
    id: 3,
    member: "Rohit Das",
    recordType: "Push-Ups",
    recordValue: "120 Reps",
    date: "19 Feb 2025",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80",
    icon: <FaFire />,
  },
  {
    id: 4,
    member: "Priya Sharma",
    recordType: "Pull-Ups",
    recordValue: "42 Reps",
    date: "8 Jan 2025",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&q=80",
    icon: <FaRunning />,
  },
  {
    id: 5,
    member: "Sneha Patel",
    recordType: "Squats",
    recordValue: "180 KG",
    date: "23 May 2025",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&q=80",
    icon: <FaHeartbeat />,
  },
  {
    id: 6,
    member: "Ananya Roy",
    recordType: "Plank Hold",
    recordValue: "18 Minutes",
    date: "30 Jun 2025",
    image: "https://images.unsplash.com/photo-1520626964073-8d87e3c5e7a3?w=300&q=80",
    icon: <FaLeaf />,
  },
];

/* Gym Highlights */
const highlights = [
  {
    icon: <FaDumbbell />,
    title: "Modern Equipment",
    desc: "State-of-the-art machines and free weights maintained daily to the highest safety and quality standards.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Clean Environment",
    desc: "Sanitised facilities, fresh air, and a spotless training space — always kept to the highest hygiene standards.",
  },
  {
    icon: <FaMedal />,
    title: "Affordable Membership",
    desc: "Premium training at prices that work for everyone. Flexible monthly, quarterly, and annual plans available.",
  },
  {
    icon: <FaUsers />,
    title: "Friendly Community",
    desc: "A welcoming, judgment-free community where every member motivates and supports each other every single day.",
  },
];

/* ─── Component ───────────────────────────────────────────── */

export default function Gallery() {
  const [photosList, setPhotosList] = React.useState(galleryImages);
  const [championsList, setChampionsList] = React.useState(champions);
  const [recordsList, setRecordsList] = React.useState(records);

  React.useEffect(() => {
    const fetchLiveGallery = async () => {
      try {
        const [resP, resC, resR] = await Promise.all([
          getGalleryPhotos().catch(() => ({ data: null })),
          getChampions().catch(() => ({ data: null })),
          getRecords().catch(() => ({ data: null })),
        ]);

        if (resP?.data && resP.data.length > 0) setPhotosList(resP.data);
        if (resC?.data && resC.data.length > 0) setChampionsList(resC.data);
        if (resR?.data && resR.data.length > 0) setRecordsList(resR.data);
      } catch (err) {
        console.log("Using fallback initial data");
      }
    };
    fetchLiveGallery();
  }, []);
  return (
    <main className="gallery-page">

      {/* ── 1. HERO ── */}
      <section className="gal-hero">
        <div className="gal-hero__overlay" />
        <div className="gal-hero__content">
          <span className="section-tag">Our Gallery</span>
          <h1 className="gal-hero__heading">
            Explore Our Gym Community
          </h1>
          <p className="gal-hero__subtext">
            Take a look inside our gym, celebrate our champions, and discover
            the achievements that inspire our fitness family every day.
          </p>
          <nav className="gal-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="gal-hero__crumb-link">Home</Link>
            <span className="gal-hero__crumb-sep" aria-hidden="true">/</span>
            <span className="gal-hero__crumb-current">Gallery</span>
          </nav>
        </div>
      </section>

      {/* ── 2. GYM GALLERY ── */}
      <section className="gym-gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Photo Tour</span>
            <h2 className="section-title">Inside Our Gym</h2>
            <p className="section-desc">
              Explore our workout space, premium equipment, cardio area, strength
              zone, and the motivating environment that helps members achieve
              their goals.
            </p>
          </div>

          <div className="gallery-grid">
            {photosList.map((item) => (
              <div className="gallery-card" key={item.id}>
                <img
                  src={item.image || item.imageUrl}
                  alt={item.title}
                  className="gallery-card__img"
                  loading="lazy"
                />
                <div className="gallery-card__overlay">
                  <span className="gallery-card__title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WALL OF CHAMPIONS ── */}
      <section className="champions">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Monthly Recognition</span>
            <h2 className="section-title">Wall of Champions</h2>
            <p className="section-desc">
              Every month we recognise members who show exceptional consistency
              and dedication. Their hard work inspires our entire fitness
              community.
            </p>
          </div>

          <div className="champions-grid">
            {championsList.map((c) => (
              <article className="champion-card" key={c.id}>
                {/* Congratulations badge */}
                <span className="champion-card__badge">
                  <FaTrophy className="champion-card__badge-icon" />
                  Monthly Champion
                </span>

                {/* Photo */}
                <div className="champion-card__img-wrap">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="champion-card__img"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="champion-card__body">
                  <h3 className="champion-card__name">{c.name}</h3>
                  <p className="champion-card__month">
                    <FaCalendarAlt className="champion-card__meta-icon" />
                    {c.month} {c.year}
                  </p>
                  <div className="champion-card__stats">
                    <div className="champion-card__stat">
                      <span className="champion-card__stat-label">Attendance</span>
                      <span className="champion-card__stat-value">{c.attendance}</span>
                    </div>
                    <div className="champion-card__stat">
                      <span className="champion-card__stat-label">Prize</span>
                      <span className="champion-card__stat-value">
                        <FaMedal className="champion-card__medal-icon" />
                        {c.prize}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. GYM RECORD HOLDERS ── */}
      <section className="records">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Hall of Records</span>
            <h2 className="section-title">Gym Record Holders</h2>
            <p className="section-desc">
              Meet the members who have set outstanding performance records and
              continue to inspire everyone in the gym.
            </p>
          </div>

          <div className="records-grid">
            {recordsList.map((r) => (
              <article className="record-card" key={r.id}>
                {/* Current Record Holder badge */}
                <span className="record-card__badge">
                  Current Record Holder
                </span>

                {/* Exercise icon */}
                <span className="record-card__exercise-icon">{r.icon || <FaDumbbell />}</span>

                {/* Member photo */}
                <div className="record-card__img-wrap">
                  <img
                    src={r.image}
                    alt={r.member}
                    className="record-card__img"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="record-card__body">
                  <p className="record-card__type">{r.recordType}</p>
                  <h3 className="record-card__value">{r.recordValue}</h3>
                  <p className="record-card__name">{r.member}</p>
                  <p className="record-card__date">
                    <FaCalendarAlt className="record-card__date-icon" />
                    {r.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GYM HIGHLIGHTS ── */}
      <section className="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why FITZONE</span>
            <h2 className="section-title">Gym Highlights</h2>
            <p className="section-desc">
              Four reasons thousands of members choose FITZONE as their home
              gym, month after month.
            </p>
          </div>

          <div className="highlights-grid">
            {highlights.map((h) => (
              <div className="highlight-card" key={h.title}>
                <span className="highlight-card__icon">{h.icon}</span>
                <h3 className="highlight-card__title">{h.title}</h3>
                <p className="highlight-card__desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CALL TO ACTION ── */}
      <section className="gal-cta">
        <div className="container gal-cta__inner">
          <h2 className="gal-cta__heading">
            Ready To Become Part Of Our Community?
          </h2>
          <p className="gal-cta__desc">
            Join today and start your fitness journey with a supportive
            community, exciting challenges, and rewarding achievements.
          </p>
          <div className="gal-cta__buttons">
            <Link to="/membership" className="btn btn--primary">Join Now</Link>
            <Link to="/contact" className="btn btn--ghost">Contact Us</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
