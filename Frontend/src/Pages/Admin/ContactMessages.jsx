import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaUser,
  FaPhone,
  FaTimes,
  FaReply,
  FaSpinner,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getContactInquiries,
  replyContactInquiry,
  deleteContactInquiry,
} from "../../services/api";
import "./ContactMessages.css";

export default function ContactMessages() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [activeFilter, setActiveFilter] = useState("All"); // All | Pending | Replied
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Fetch live inquiries from backend
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getContactInquiries();
      if (res?.data) {
        setInquiries(res.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load contact inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOpenReply = (inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyText(inquiry.replyMessage || "");
    setReplyModalOpen(true);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      toast.error("Reply text cannot be empty!");
      return;
    }

    setSending(true);
    try {
      const res = await replyContactInquiry(
        selectedInquiry._id || selectedInquiry.id,
        replyText
      );

      toast.success(res.message || `Reply email sent directly to ${selectedInquiry.email}!`);

      // Update local state item
      const updated = inquiries.map((item) =>
        item._id === selectedInquiry._id || item.id === selectedInquiry.id
          ? {
            ...item,
            status: "Replied",
            replyMessage: replyText,
            repliedAt: new Date().toISOString(),
          }
          : item
      );

      setInquiries(updated);
      setSelectedInquiry((prev) =>
        prev
          ? {
            ...prev,
            status: "Replied",
            replyMessage: replyText,
            repliedAt: new Date().toISOString(),
          }
          : null
      );
      setReplyModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send email reply");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;

    try {
      await deleteContactInquiry(id);
      setInquiries(inquiries.filter((item) => item._id !== id && item.id !== id));
      toast.success("Inquiry deleted!");
      if (selectedInquiry && (selectedInquiry._id === id || selectedInquiry.id === id)) {
        setSelectedInquiry(null);
      }
    } catch (err) {
      toast.error("Failed to delete inquiry");
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.status === activeFilter;
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="contact-messages-page">
      {/* Header */}
      <div className="messages-header">
        <div>
          <h1 className="messages-header__title">Contact Inquiries</h1>
          <p className="messages-header__sub">
            Directly reply via Email to user messages submitted from Tigers Gym website.
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="messages-controls">
        <div className="controls-tabs">
          {["All", "Pending", "Replied"].map((tab) => (
            <button
              key={tab}
              className={`msg-tab ${activeFilter === tab ? "msg-tab--active" : ""}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab === "Pending" && <FaClock className="tab-icon text-yellow" />}
              {tab === "Replied" && <FaCheckCircle className="tab-icon text-green" />}
              {tab} ({inquiries.filter((i) => tab === "All" || i.status === tab).length})
            </button>
          ))}
        </div>

        <div className="controls-search-wrap">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <FaSpinner className="spinner-icon" /> Loading...
        </div>
      ) : (
        /* Main Grid */
        <div className="messages-main-grid">
          {/* List View */}
          <div className="messages-list">
            {filteredInquiries.map((item) => (
              <div
                key={item._id || item.id}
                className={`msg-item ${selectedInquiry &&
                    (selectedInquiry._id === item._id || selectedInquiry.id === item.id)
                    ? "msg-item--active"
                    : ""
                  }`}
                onClick={() => setSelectedInquiry(item)}
              >
                <div className="msg-item__top">
                  <span className="msg-item__name">{item.name}</span>
                  <span
                    className={`msg-status-badge ${item.status === "Replied" ? "badge--replied" : "badge--pending"
                      }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="msg-item__subject">{item.subject}</p>
                <p className="msg-item__preview">{item.message}</p>
                <span className="msg-item__date">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}

            {filteredInquiries.length === 0 && (
              <div className="empty-msg-list">
                No inquiries found for this filter.
              </div>
            )}
          </div>

          {/* Selected Message Detail View */}
          <div className="message-detail-panel">
            {selectedInquiry ? (
              <div className="detail-card">
                <div className="detail-card__header">
                  <div>
                    <h2 className="detail-card__subject">{selectedInquiry.subject}</h2>
                    <span
                      className={`msg-status-badge ${selectedInquiry.status === "Replied"
                          ? "badge--replied"
                          : "badge--pending"
                        }`}
                    >
                      {selectedInquiry.status}
                    </span>
                  </div>
                  <div className="detail-actions">
                    {/* Only show Reply button if NOT already replied */}
                    {selectedInquiry.status !== "Replied" ? (
                      <button
                        className="btn-msg btn-msg--reply"
                        onClick={() => handleOpenReply(selectedInquiry)}
                      >
                        <FaReply /> Send Email Reply
                      </button>
                    ) : (
                      <span className="badge-replied-done">
                        <FaCheckCircle /> Already Replied
                      </span>
                    )}

                    <button
                      className="btn-msg btn-msg--delete"
                      onClick={() => handleDelete(selectedInquiry._id || selectedInquiry.id)}
                      title="Delete Inquiry"
                    >
                      <FaTrash /> Delete
                    </button>

                    <button
                      className="btn-msg btn-msg--close"
                      onClick={() => setSelectedInquiry(null)}
                      title="Close Message Detail"
                    >
                      <FaTimes /> Close
                    </button>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="sender-info-box">
                  <div className="sender-field">
                    <FaUser className="sender-icon" />
                    <span>
                      <strong>From:</strong> {selectedInquiry.name}
                    </span>
                  </div>
                  <div className="sender-field">
                    <FaEnvelope className="sender-icon" />
                    <span>
                      <strong>Email:</strong> {selectedInquiry.email}
                    </span>
                  </div>
                  {selectedInquiry.phone && (
                    <div className="sender-field">
                      <FaPhone className="sender-icon" />
                      <span>
                        <strong>Phone:</strong> {selectedInquiry.phone}
                      </span>
                    </div>
                  )}
                </div>

                {/* Original Message */}
                <div className="message-body-box">
                  <h4 className="box-title">User Message:</h4>
                  <p className="message-text">{selectedInquiry.message}</p>
                </div>

                {/* Reply Box */}
                {selectedInquiry.status === "Replied" && selectedInquiry.replyMessage && (
                  <div className="reply-body-box">
                    <h4 className="box-title text-green">
                      <FaCheckCircle /> Email Response Sent to {selectedInquiry.email}:
                    </h4>
                    <p className="message-text">{selectedInquiry.replyMessage}</p>
                    {selectedInquiry.repliedAt && (
                      <span className="reply-date">
                        Sent on: {new Date(selectedInquiry.repliedAt).toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="no-selection-placeholder">
                <FaEnvelope className="placeholder-icon" />
                <h3>Select an Inquiry</h3>
                <p>Click on any message from the list to view full details and reply via email.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyModalOpen && selectedInquiry && (
        <div className="modal-backdrop" onClick={() => setReplyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Email Reply to {selectedInquiry.name}</h3>
              <button className="modal-close" onClick={() => setReplyModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSendReply} className="modal-form">
              <div className="form-group">
                <label>Recipient Email Address</label>
                <input
                  type="text"
                  value={selectedInquiry.email}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="form-group">
                <label>Email Subject</label>
                <input
                  type="text"
                  value={`Re: ${selectedInquiry.subject} - Tigers Gym`}
                  disabled
                  className="input-disabled"
                />
              </div>
              <div className="form-group">
                <label>Email Response Text *</label>
                <textarea
                  rows="6"
                  placeholder="Type your official email response to the member here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="reply-textarea"
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setReplyModalOpen(false)}
                  disabled={sending}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit" disabled={sending}>
                  {sending ? (
                    <>
                      <FaSpinner className="spinner-icon" /> Sending Email...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Email Reply
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
