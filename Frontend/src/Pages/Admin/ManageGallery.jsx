import React, { useState, useEffect } from "react";
import {
  FaImages,
  FaTrophy,
  FaMedal,
  FaPlus,
  FaTrash,
  FaFilter,
  FaSearch,
  FaCalendarAlt,
  FaDumbbell,
  FaUpload,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getGalleryPhotos,
  uploadGalleryPhoto,
  deleteGalleryPhoto,
  getChampions,
  uploadChampion,
  deleteChampion,
  getRecords,
  uploadRecord,
  deleteRecord,
} from "../../services/api";
import "./ManageGallery.css";

export default function ManageGallery() {
  const [activeTab, setActiveTab] = useState("photos"); // photos | champions | records
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [photos, setPhotos] = useState([]);
  const [champions, setChampions] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Modal States
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showChampModal, setShowChampModal] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  // Image File & Preview States
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoForm, setPhotoForm] = useState({ title: "", category: "Strength Zone" });

  const [champFile, setChampFile] = useState(null);
  const [champPreview, setChampPreview] = useState("");
  const [champForm, setChampForm] = useState({ name: "", month: "January", year: "2025", attendance: "30 / 30 Days", prize: "Gold Medal" });

  const [recordFile, setRecordFile] = useState(null);
  const [recordPreview, setRecordPreview] = useState("");
  const [recordForm, setRecordForm] = useState({ member: "", recordType: "Deadlift", recordValue: "", date: "" });

  // Fetch initial live data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resPhotos, resChamps, resRecords] = await Promise.all([
        getGalleryPhotos().catch(() => ({ data: [] })),
        getChampions().catch(() => ({ data: [] })),
        getRecords().catch(() => ({ data: [] })),
      ]);

      if (resPhotos.data) setPhotos(resPhotos.data);
      if (resChamps.data) setChampions(resChamps.data);
      if (resRecords.data) setRecords(resRecords.data);
    } catch (err) {
      toast.error("Failed to load live gallery data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // File Selection & Validation (Image only, Max 5MB)
  const handleFileChange = (e, setFile, setPreview) => {
    const file = e.target.files[0];
    if (!file) return;

    // Security check: mime type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Security Alert: Only JPG, JPEG, PNG, and WEBP image files are allowed!");
      return;
    }

    // Security check: file size 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large! Maximum image size is 5MB.");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ── 1. Gym Photo Submit ── */
  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!photoForm.title || !photoFile) {
      toast.error("Please enter Title and select an Image File!");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", photoForm.title);
      formData.append("category", photoForm.category);
      formData.append("image", photoFile);

      const res = await uploadGalleryPhoto(formData);
      toast.success(res.message || "Photo uploaded to Cloudinary & saved!");
      setPhotos([res.data, ...photos]);
      setShowPhotoModal(false);
      setPhotoForm({ title: "", category: "Strength Zone" });
      setPhotoFile(null);
      setPhotoPreview("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload image to Cloudinary");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this gym photo?")) return;
    try {
      await deleteGalleryPhoto(id);
      setPhotos(photos.filter((p) => p._id !== id && p.id !== id));
      toast.success("Photo deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete photo");
    }
  };

  /* ── 2. Champion Submit ── */
  const handleAddChamp = async (e) => {
    e.preventDefault();
    if (!champForm.name || !champFile) {
      toast.error("Please enter Champion Name and select an Image File!");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", champForm.name);
      formData.append("month", champForm.month);
      formData.append("year", champForm.year);
      formData.append("attendance", champForm.attendance);
      formData.append("prize", champForm.prize);
      formData.append("image", champFile);

      const res = await uploadChampion(formData);
      toast.success(res.message || "Champion saved to Cloudinary!");
      setChampions([res.data, ...champions]);
      setShowChampModal(false);
      setChampForm({ name: "", month: "January", year: "2025", attendance: "30 / 30 Days", prize: "Gold Medal" });
      setChampFile(null);
      setChampPreview("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload champion photo");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteChamp = async (id) => {
    if (!window.confirm("Delete this champion record?")) return;
    try {
      await deleteChampion(id);
      setChampions(champions.filter((c) => c._id !== id && c.id !== id));
      toast.success("Champion deleted!");
    } catch (err) {
      toast.error("Failed to delete champion");
    }
  };

  /* ── 3. Record Holder Submit ── */
  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (!recordForm.member || !recordForm.recordValue || !recordFile) {
      toast.error("Please enter Member Name, Record Value and select an Image File!");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("member", recordForm.member);
      formData.append("recordType", recordForm.recordType);
      formData.append("recordValue", recordForm.recordValue);
      formData.append("date", recordForm.date || new Date().toLocaleDateString("en-IN"));
      formData.append("image", recordFile);

      const res = await uploadRecord(formData);
      toast.success(res.message || "Gym record saved to Cloudinary!");
      setRecords([res.data, ...records]);
      setShowRecordModal(false);
      setRecordForm({ member: "", recordType: "Deadlift", recordValue: "", date: "" });
      setRecordFile(null);
      setRecordPreview("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload record photo");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Delete this gym record?")) return;
    try {
      await deleteRecord(id);
      setRecords(records.filter((r) => r._id !== id && r.id !== id));
      toast.success("Record deleted!");
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  /* Filtered Data */
  const filteredPhotos = photos.filter((p) => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredChampions = champions.filter((c) =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.month?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecords = records.filter((r) =>
    r.member?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.recordType?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="manage-gallery-page">
      {/* Page Header */}
      <div className="gallery-header">
        <div>
          <h1 className="gallery-header__title">Gallery Management</h1>
          <p className="gallery-header__sub">
            Direct Cloudinary Image Upload & MongoDB Synchronization for Tigers Gym Website.
          </p>
        </div>
        <div className="gallery-header__actions">
          {activeTab === "photos" && (
            <button className="btn-mgr btn-mgr--gold" onClick={() => setShowPhotoModal(true)}>
              <FaUpload /> Upload Gym Photo
            </button>
          )}
          {activeTab === "champions" && (
            <button className="btn-mgr btn-mgr--gold" onClick={() => setShowChampModal(true)}>
              <FaUpload /> Upload Champion
            </button>
          )}
          {activeTab === "records" && (
            <button className="btn-mgr btn-mgr--gold" onClick={() => setShowRecordModal(true)}>
              <FaUpload /> Upload Gym Record
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
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

      {/* Controls */}
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

      {loading ? (
        <div className="loading-state">
          <FaSpinner className="spinner-icon" /> Fetching live data from backend...
        </div>
      ) : (
        <>
          {/* ── TAB 1: GYM PHOTOS ── */}
          {activeTab === "photos" && (
            <div className="gallery-photos-grid">
              {filteredPhotos.map((photo) => (
                <div key={photo._id || photo.id} className="photo-card">
                  <div className="photo-card__img-wrap">
                    <img src={photo.imageUrl || photo.image} alt={photo.title} className="photo-card__img" />
                    <span className="photo-card__category">{photo.category}</span>
                    <div className="photo-card__overlay">
                      <button
                        className="action-btn action-btn--danger"
                        onClick={() => handleDeletePhoto(photo._id || photo.id)}
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
                <div className="empty-state">No gym photos found. Click 'Upload Gym Photo' to add one!</div>
              )}
            </div>
          )}

          {/* ── TAB 2: WALL OF CHAMPIONS ── */}
          {activeTab === "champions" && (
            <div className="champions-mgr-grid">
              {filteredChampions.map((champ) => (
                <div key={champ._id || champ.id} className="champ-card">
                  <div className="champ-card__top">
                    <span className="champ-badge">
                      <FaTrophy /> Champion
                    </span>
                    <button
                      className="champ-icon-btn champ-icon-btn--delete"
                      onClick={() => handleDeleteChamp(champ._id || champ.id)}
                    >
                      <FaTrash />
                    </button>
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
                <div className="empty-state">No champions found. Click 'Upload Champion' to add one!</div>
              )}
            </div>
          )}

          {/* ── TAB 3: HALL OF RECORDS ── */}
          {activeTab === "records" && (
            <div className="records-mgr-grid">
              {filteredRecords.map((rec) => (
                <div key={rec._id || rec.id} className="rec-card">
                  <div className="rec-card__badge">Gym Record Holder</div>
                  <img src={rec.image} alt={rec.member} className="rec-card__img" />
                  <div className="rec-card__body">
                    <span className="rec-card__type">{rec.recordType}</span>
                    <h3 className="rec-card__val">{rec.recordValue}</h3>
                    <p className="rec-card__name">{rec.member}</p>
                    <span className="rec-card__date">{rec.date}</span>

                    <div className="rec-card__actions">
                      <button
                        className="btn-mgr-sm btn-mgr-sm--delete"
                        onClick={() => handleDeleteRecord(rec._id || rec.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredRecords.length === 0 && (
                <div className="empty-state">No gym records found. Click 'Upload Gym Record' to register PRs!</div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── MODAL 1: UPLOAD GYM PHOTO (File Input) ── */}
      {showPhotoModal && (
        <div className="modal-backdrop" onClick={() => setShowPhotoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Gym Photo to Cloudinary</h3>
              <button className="modal-close" onClick={() => setShowPhotoModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="modal-form">
              <div className="form-group">
                <label>Photo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Heavy Dumbbell Zone"
                  value={photoForm.title}
                  onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
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

              {/* Secure File Input */}
              <div className="form-group">
                <label>Select Image File (JPG, PNG, WEBP, max 5MB) *</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileChange(e, setPhotoFile, setPhotoPreview)}
                  required
                />
              </div>

              {photoPreview && (
                <div className="file-preview-box">
                  <span className="preview-label">Image Preview:</span>
                  <img src={photoPreview} alt="Preview" className="preview-img" />
                </div>
              )}

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowPhotoModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? <><FaSpinner className="spinner-icon" /> Uploading...</> : "Upload Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 2: UPLOAD CHAMPION (File Input) ── */}
      {showChampModal && (
        <div className="modal-backdrop" onClick={() => setShowChampModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Monthly Champion</h3>
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
                    placeholder="January"
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
              <div className="form-row">
                <div className="form-group">
                  <label>Attendance Record</label>
                  <input
                    type="text"
                    placeholder="30 / 30 Days"
                    value={champForm.attendance}
                    onChange={(e) => setChampForm({ ...champForm, attendance: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Prize / Badge</label>
                  <input
                    type="text"
                    placeholder="Gold Medal"
                    value={champForm.prize}
                    onChange={(e) => setChampForm({ ...champForm, prize: e.target.value })}
                  />
                </div>
              </div>

              {/* Secure File Input */}
              <div className="form-group">
                <label>Champion Photo File (JPG, PNG, WEBP, max 5MB) *</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileChange(e, setChampFile, setChampPreview)}
                  required
                />
              </div>

              {champPreview && (
                <div className="file-preview-box">
                  <span className="preview-label">Image Preview:</span>
                  <img src={champPreview} alt="Preview" className="preview-img" />
                </div>
              )}

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowChampModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? <><FaSpinner className="spinner-icon" /> Uploading...</> : "Upload Champion"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL 3: UPLOAD RECORD (File Input) ── */}
      {showRecordModal && (
        <div className="modal-backdrop" onClick={() => setShowRecordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload Gym Record Holder</h3>
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
                    placeholder="Deadlift / Bench / Squats"
                    value={recordForm.recordType}
                    onChange={(e) => setRecordForm({ ...recordForm, recordType: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Record Value *</label>
                  <input
                    type="text"
                    placeholder="e.g. 220 KG"
                    value={recordForm.recordValue}
                    onChange={(e) => setRecordForm({ ...recordForm, recordValue: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Secure File Input */}
              <div className="form-group">
                <label>Member Photo File (JPG, PNG, WEBP, max 5MB) *</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleFileChange(e, setRecordFile, setRecordPreview)}
                  required
                />
              </div>

              {recordPreview && (
                <div className="file-preview-box">
                  <span className="preview-label">Image Preview:</span>
                  <img src={recordPreview} alt="Preview" className="preview-img" />
                </div>
              )}

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowRecordModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? <><FaSpinner className="spinner-icon" /> Uploading...</> : "Upload Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
