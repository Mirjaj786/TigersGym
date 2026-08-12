import React, { useState, useEffect } from "react";
import {
  FaImages,
  FaTrophy,
  FaMedal,
  FaPlus,
  FaTrash,
  FaEdit,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaDumbbell,
  FaBolt,
  FaFire,
  FaRunning,
  FaHeartbeat,
  FaLeaf,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./ManageGallery.css";

/* Initial Static Data Fallbacks */
const initialGymPhotos = [
  { id: 1, title: "Strength Zone", category: "Strength Zone", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
  { id: 2, title: "Personal Training", category: "Functional Zone", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80" },
  { id: 3, title: "Cardio Area", category: "Cardio Area", imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80" },
  { id: 4, title: "Free Weights", category: "Weight Room", imageUrl: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80" },
  { id: 5, title: "CrossFit Floor", category: "CrossFit Floor", imageUrl: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&q=80" },
  { id: 6, title: "Yoga Studio", category: "Yoga Studio", imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80" },
];

const initialChampions = [
  { id: 1, name: "Arjun Mehta", month: "January", year: "2025", attendance: "30 / 30 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
  { id: 2, name: "Priya Sharma", month: "February", year: "2025", attendance: "28 / 28 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&q=80" },
  { id: 3, name: "Rohit Das", month: "March", year: "2025", attendance: "31 / 31 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80" },
  { id: 4, name: "Sneha Patel", month: "April", year: "2025", attendance: "29 / 30 Days", prize: "Gold Medal", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=300&q=80" },
];

const initialRecords = [
  { id: 1, member: "Arjun Mehta", recordType: "Deadlift", recordValue: "220 KG", date: "12 Mar 2025", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80" },
  { id: 2, member: "Vikram Singh", recordType: "Bench Press", recordValue: "160 KG", date: "5 Apr 2025", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80" },
  { id: 3, member: "Rohit Das", recordType: "Push-Ups", recordValue: "120 Reps", date: "19 Feb 2025", image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=300&q=80" },
  { id: 4, member: "Priya Sharma", recordType: "Pull-Ups", recordValue: "42 Reps", date: "8 Jan 2025", image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&q=80" },
];

export default function ManageGallery() {
  const [activeTab, setActiveTab] = useState("photos"); // photos | champions | records
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Local storage state management for instant persistence
  const [photos, setPhotos] = useState(() => {
    const saved = localStorage.getItem("tigers_gym_photos");
    return saved ? JSON.parse(saved) : initialGymPhotos;
  });

  const [champions, setChampions] = useState(() => {
    const saved = localStorage.getItem("tigers_gym_champions");
    return saved ? JSON.parse(saved) : initialChampions;
  });

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("tigers_gym_records");
    return saved ? JSON.parse(saved) : initialRecords;
  });

  // Modal States
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showChampModal, setShowChampModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  // Form inputs
  const [photoForm, setPhotoForm] = useState({ title: "", category: "Strength Zone", imageUrl: "" });
  const [champForm, setChampForm] = useState({ name: "", month: "January", year: "2025", attendance: "30 / 30 Days", prize: "Gold Medal", image: "" });
  const [recordForm, setRecordForm] = useState({ member: "", recordType: "Deadlift", recordValue: "", date: "", image: "" });

  useEffect(() => {
    localStorage.setItem("tigers_gym_photos", JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem("tigers_gym_champions", JSON.stringify(champions));
  }, [champions]);

  useEffect(() => {
    localStorage.setItem("tigers_gym_records", JSON.stringify(records));
  }, [records]);

  /* ── 1. Photo Handlers ── */
  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.imageUrl) {
      toast.error("Please enter Title and Image URL!");
      return;
    }
    const newPhoto = {
      id: Date.now(),
      title: photoForm.title,
      category: photoForm.category,
      imageUrl: photoForm.imageUrl,
    };
    setPhotos([newPhoto, ...photos]);
    toast.success("Gym Photo added successfully!");
    setPhotoForm({ title: "", category: "Strength Zone", imageUrl: "" });
    setShowPhotoModal(false);
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm("Are you sure you want to delete this gym photo?")) {
      setPhotos(photos.filter((p) => p.id !== id));
      toast.success("Photo deleted successfully!");
    }
  };

  /* ── 2. Champion Handlers ── */
  const handleAddChamp = (e) => {
    e.preventDefault();
    if (!champForm.name || !champForm.image) {
      toast.error("Please fill Name and Image URL!");
      return;
    }

    if (editingItem) {
      setChampions(
        champions.map((c) => (c.id === editingItem.id ? { ...c, ...champForm } : c))
      );
      toast.success("Champion updated!");
      setEditingItem(null);
    } else {
      const newChamp = { id: Date.now(), ...champForm };
      setChampions([newChamp, ...champions]);
      toast.success("New Champion added!");
    }
    setChampForm({ name: "", month: "January", year: "2025", attendance: "30 / 30 Days", prize: "Gold Medal", image: "" });
    setShowChampModal(false);
  };

  const handleDeleteChamp = (id) => {
    if (window.confirm("Delete this champion record?")) {
      setChampions(champions.filter((c) => c.id !== id));
      toast.success("Champion deleted!");
    }
  };

  /* ── 3. Record Handlers ── */
  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!recordForm.member || !recordForm.recordValue || !recordForm.image) {
      toast.error("Please fill Member Name, Record Value & Image URL!");
      return;
    }

    if (editingItem) {
      setRecords(
        records.map((r) => (r.id === editingItem.id ? { ...r, ...recordForm } : r))
      );
      toast.success("Record holder updated!");
      setEditingItem(null);
    } else {
      const newRecord = { id: Date.now(), ...recordForm };
      setRecords([newRecord, ...records]);
      toast.success("New Gym Record added!");
    }
    setRecordForm({ member: "", recordType: "Deadlift", recordValue: "", date: new Date().toLocaleDateString(), image: "" });
    setShowRecordModal(false);
  };

  const handleDeleteRecord = (id) => {
    if (window.confirm("Delete this gym record?")) {
      setRecords(records.filter((r) => r.id !== id));
      toast.success("Record deleted!");
    }
  };

  /* Filtered Lists */
  const filteredPhotos = photos.filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredChampions = champions.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.month.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecords = records.filter((r) =>
    r.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.recordType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-gallery-page">
      {/* ── Page Header ── */}
      <div className="gallery-header">
        <div className="gallery-header__left">
          <h1 className="gallery-header__title">Gallery Management</h1>
          <p className="gallery-header__sub">
            Manage your Gym Tour Photos, Wall of Champions, and Hall of Records displayed on the public website.
          </p>
        </div>
        <div className="gallery-header__actions">
          {activeTab === "photos" && (
            <button className="btn-mgr btn-mgr--gold" onClick={() => setShowPhotoModal(true)}>
              <FaPlus /> Add Gym Photo
            </button>
          )}
          {activeTab === "champions" && (
            <button className="btn-mgr btn-mgr--gold" onClick={() => { setEditingItem(null); setShowChampModal(true); }}>
              <FaPlus /> Add Champion
            </button>
          )}
          {activeTab === "records" && (
            <button className="btn-mgr btn-mgr--gold" onClick={() => { setEditingItem(null); setShowRecordModal(true); }}>
              <FaPlus /> Add Gym Record
            </button>
          )}
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="gallery-tabs">
        <button
          className={`tab-btn ${activeTab === "photos" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("photos")}
        >
          <FaImages /> Gym Photos ({photos.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "champions" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("champions")}
        >
          <FaTrophy /> Wall of Champions ({champions.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "records" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("records")}
        >
          <FaDumbbell /> Hall of Records ({records.length})
        </button>
      </div>

      {/* ── Controls Bar (Search & Filter) ── */}
      <div className="gallery-controls">
        <div className="controls-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={`Search in ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="controls-search-input"
          />
        </div>

        {activeTab === "photos" && (
          <div className="controls-filter">
            <FaFilter className="filter-icon" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="controls-filter-select"
            >
              <option value="All">All Categories</option>
              <option value="Strength Zone">Strength Zone</option>
              <option value="Cardio Area">Cardio Area</option>
              <option value="CrossFit Floor">CrossFit Floor</option>
              <option value="Weight Room">Weight Room</option>
              <option value="Yoga Studio">Yoga Studio</option>
              <option value="Functional Zone">Functional Zone</option>
            </select>
          </div>
        )}
      </div>

      {/* ── TAB 1: GYM PHOTOS ── */}
      {activeTab === "photos" && (
        <div className="gallery-photos-grid">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <div className="photo-card__img-wrap">
                <img src={photo.imageUrl} alt={photo.title} className="photo-card__img" />
                <span className="photo-card__category">{photo.category}</span>
                <div className="photo-card__overlay">
                  <button
                    className="action-btn action-btn--danger"
                    onClick={() => handleDeletePhoto(photo.id)}
                    title="Delete Photo"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
              <div className="photo-card__body">
                <h3 className="photo-card__title">{photo.title}</h3>
              </div>
            </div>
          ))}
          {filteredPhotos.length === 0 && (
            <div className="empty-state">No gym photos found. Click 'Add Gym Photo' to upload!</div>
          )}
        </div>
      )}

      {/* ── TAB 2: WALL OF CHAMPIONS ── */}
      {activeTab === "champions" && (
        <div className="champions-mgr-grid">
          {filteredChampions.map((champ) => (
            <div key={champ.id} className="champ-card">
              <div className="champ-card__top">
                <span className="champ-badge">
                  <FaTrophy /> Champion
                </span>
                <div className="champ-card__actions">
                  <button
                    className="champ-icon-btn champ-icon-btn--edit"
                    onClick={() => {
                      setEditingItem(champ);
                      setChampForm(champ);
                      setShowChampModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="champ-icon-btn champ-icon-btn--delete"
                    onClick={() => handleDeleteChamp(champ.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <img src={champ.image} alt={champ.name} className="champ-card__img" />

              <div className="champ-card__info">
                <h3 className="champ-card__name">{champ.name}</h3>
                <p className="champ-card__date">
                  <FaCalendarAlt /> {champ.month} {champ.year}
                </p>
                <div className="champ-card__stats">
                  <div className="stat-pill">
                    <span className="stat-pill__label">Attendance</span>
                    <span className="stat-pill__val">{champ.attendance}</span>
                  </div>
                  <div className="stat-pill">
                    <span className="stat-pill__label">Prize</span>
                    <span className="stat-pill__val text-gold">
                      <FaMedal /> {champ.prize}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredChampions.length === 0 && (
            <div className="empty-state">No champions recorded yet. Click 'Add Champion' to add one!</div>
          )}
        </div>
      )}

      {/* ── TAB 3: HALL OF RECORDS ── */}
      {activeTab === "records" && (
        <div className="records-mgr-grid">
          {filteredRecords.map((rec) => (
            <div key={rec.id} className="rec-card">
              <div className="rec-card__badge">Gym Record Holder</div>
              <img src={rec.image} alt={rec.member} className="rec-card__img" />
              <div className="rec-card__body">
                <span className="rec-card__type">{rec.recordType}</span>
                <h3 className="rec-card__val">{rec.recordValue}</h3>
                <p className="rec-card__name">{rec.member}</p>
                <span className="rec-card__date">{rec.date}</span>

                <div className="rec-card__actions">
                  <button
                    className="btn-mgr-sm btn-mgr-sm--edit"
                    onClick={() => {
                      setEditingItem(rec);
                      setRecordForm(rec);
                      setShowRecordModal(true);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn-mgr-sm btn-mgr-sm--delete"
                    onClick={() => handleDeleteRecord(rec.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredRecords.length === 0 && (
            <div className="empty-state">No records added yet. Click 'Add Gym Record' to register PRs!</div>
          )}
        </div>
      )}

      {/* ── MODAL 1: ADD GYM PHOTO ── */}
      {showPhotoModal && (
        <div className="modal-backdrop" onClick={() => setShowPhotoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Gym Photo</h3>
              <button className="modal-close" onClick={() => setShowPhotoModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="modal-form">
              <div className="form-group">
                <label>Photo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Heavy Weight Bench Section"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gym Category</label>
                <select
                  value={photoForm.category}
                  onChange={(e) => setPhotoForm({ ...photoForm, category: e.target.value })}
                >
                  <option value="Strength Zone">Strength Zone</option>
                  <option value="Cardio Area">Cardio Area</option>
                  <option value="CrossFit Floor">CrossFit Floor</option>
                  <option value="Weight Room">Weight Room</option>
                  <option value="Yoga Studio">Yoga Studio</option>
                  <option value="Functional Zone">Functional Zone</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoForm.imageUrl}
                  onChange={(e) => setPhotoForm({ ...photoForm, imageUrl: e.target.value })}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowPhotoModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: ADD / EDIT CHAMPION ── */}
      {showChampModal && (
        <div className="modal-backdrop" onClick={() => setShowChampModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? "Edit Champion" : "Add Monthly Champion"}</h3>
              <button className="modal-close" onClick={() => setShowChampModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddChamp} className="modal-form">
              <div className="form-group">
                <label>Member Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Arjun Mehta"
                  value={champForm.name}
                  onChange={(e) => setChampForm({ ...champForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Month</label>
                  <input
                    type="text"
                    placeholder="e.g. January"
                    value={champForm.month}
                    onChange={(e) => setChampForm({ ...champForm, month: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={champForm.year}
                    onChange={(e) => setChampForm({ ...champForm, year: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Attendance Record</label>
                <input
                  type="text"
                  placeholder="e.g. 30 / 30 Days"
                  value={champForm.attendance}
                  onChange={(e) => setChampForm({ ...champForm, attendance: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Prize / Medal</label>
                <input
                  type="text"
                  placeholder="e.g. Gold Medal"
                  value={champForm.prize}
                  onChange={(e) => setChampForm({ ...champForm, prize: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Member Photo URL *</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={champForm.image}
                  onChange={(e) => setChampForm({ ...champForm, image: e.target.value })}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowChampModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Champion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 3: ADD / EDIT RECORD ── */}
      {showRecordModal && (
        <div className="modal-backdrop" onClick={() => setShowRecordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingItem ? "Edit Record Holder" : "Add Gym Record Holder"}</h3>
              <button className="modal-close" onClick={() => setShowRecordModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddRecord} className="modal-form">
              <div className="form-group">
                <label>Member Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Vikram Singh"
                  value={recordForm.member}
                  onChange={(e) => setRecordForm({ ...recordForm, member: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Record Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Deadlift / Bench Press / Plank"
                    value={recordForm.recordType}
                    onChange={(e) => setRecordForm({ ...recordForm, recordType: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Record Value *</label>
                  <input
                    type="text"
                    placeholder="e.g. 220 KG / 18 Mins"
                    value={recordForm.recordValue}
                    onChange={(e) => setRecordForm({ ...recordForm, recordValue: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Date Accomplished</label>
                <input
                  type="text"
                  placeholder="e.g. 12 Mar 2025"
                  value={recordForm.date}
                  onChange={(e) => setRecordForm({ ...recordForm, date: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Member Photo URL *</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={recordForm.image}
                  onChange={(e) => setRecordForm({ ...recordForm, image: e.target.value })}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowRecordModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
