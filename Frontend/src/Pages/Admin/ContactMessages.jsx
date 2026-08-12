import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPaperPlane,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
  FaUser,
  FaPhone,
  FaTimes,
  FaReply,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./ContactMessages.css";

const initialInquiries = [
  {
    id: 1,
    name: "Rahul Verma",
    email: "rahul.v@gmail.com",
    phone: "+91 98765 43210",
    subject: "Personal Trainer Availability & Pricing",
    message: "Hi Tigers Gym team, I am looking for a personal trainer for muscle building and strength conditioning. Do you have slots available in the evening?",
    status: "Pending",
    createdAt: "2025-08-10T10:30:00Z",
    replyMessage: "",
  },
  {
    id: 2,
    name: "Pooja Das",
    email: "pooja.das@yahoo.com",
    phone: "+91 91234 56789",
    subject: "Monthly Membership Inquiry",
    message: "Hello! Can I get details about your quarterly vs annual membership packages and student discounts?",
    status: "Replied",
    createdAt: "2025-08-08T14:15:00Z",
    replyMessage: "Hi Pooja! Our quarterly package is ₹4,500 and annual is ₹14,000. Students get an additional 10% discount upon showing valid ID card.",
    repliedAt: "2025-08-08T16:00:00Z",
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.k@hotmail.com",
    phone: "+91 99887 76655",
    subject: "CrossFit Group Classes Timing",
    message: "Is there a morning CrossFit batch for beginners? Please share timings.",
    status: "Pending",
    createdAt: "2025-08-11T09:00:00Z",
    replyMessage: "",
  },
];

export default function ContactMessages() {
  const [inquiries, setInquiries] = useState(() => {
    const saved = localStorage.getItem("tigers_gym_inquiries");
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  const [activeFilter, setActiveFilter] = useState("All"); // All | Pending | Replied
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    localStorage.setItem("tigers_gym_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Fetch inquiries from backend if available
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:8000/contact", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.data?.data && res.data.data.length > 0) {
            setInquiries(res.data.data);
          }
        }
      } catch (err) {
        console.log("Backend offline or using fallback inquiries.");
      }
    };
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

    // Try backend update first
    try {
      const token = localStorage.getItem("token");
      if (token && selectedInquiry._id) {
        await axios.post(
          `http://localhost:8000/contact/${selectedInquiry._id}/reply`,
          { replyText },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.log("Updating locally");
    }

    // Update local state
    const updated = inquiries.map((item) =>
      (item.id === selectedInquiry.id || item._id === selectedInquiry._id)
        ? {
            ...item,
            status: "Replied",
            replyMessage: replyText,
            repliedAt: new Date().toISOString(),
          }
        : item
    );

    setInquiries(updated);
    toast.success(`Reply saved & marked as sent to ${selectedInquiry.name}!`);
    setReplyModalOpen(false);
    setSelectedInquiry(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact message?")) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await axios.delete(`http://localhost:8000/contact/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      } catch (err) {
        console.log("Deleted locally");
      }

      setInquiries(inquiries.filter((item) => item.id !== id && item._id !== id));
      toast.success("Inquiry deleted!");
      if (selectedInquiry && (selectedInquiry.id === id || selectedInquiry._id === id)) {
        setSelectedInquiry(null);
      }
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesFilter =
      activeFilter === "All" || item.status === activeFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="contact-messages-page">
      {/* Header */}
      <div className="messages-header">
        <div>
          <h1 className="messages-header__title">Contact Inquiries</h1>
          <p className="messages-header__sub">
            Review user messages sent from the public website contact form and send replies.
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

      {/* Main Grid: Left List + Right Detail View */}
      <div className="messages-main-grid">
        {/* List View */}
        <div className="messages-list">
          {filteredInquiries.map((item) => (
            <div
              key={item.id || item._id}
              className={`msg-item ${selectedInquiry && (selectedInquiry.id === item.id || selectedInquiry._id === item._id) ? "msg-item--active" : ""}`}
              onClick={() => setSelectedInquiry(item)}
            >
              <div className="msg-item__top">
                <span className="msg-item__name">{item.name}</span>
                <span className={`msg-status-badge ${item.status === "Replied" ? "badge--replied" : "badge--pending"}`}>
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
            <div className="empty-msg-list">No inquiries found for this filter.</div>
          )}
        </div>

        {/* Selected Message Detail View */}
        <div className="message-detail-panel">
          {selectedInquiry ? (
            <div className="detail-card">
              <div className="detail-card__header">
                <div>
                  <h2 className="detail-card__subject">{selectedInquiry.subject}</h2>
                  <span className={`msg-status-badge ${selectedInquiry.status === "Replied" ? "badge--replied" : "badge--pending"}`}>
                    {selectedInquiry.status}
                  </span>
                </div>
                <div className="detail-actions">
                  <button
                    className="btn-msg btn-msg--reply"
                    onClick={() => handleOpenReply(selectedInquiry)}
                  >
                    <FaReply /> Reply
                  </button>
                  <button
                    className="btn-msg btn-msg--delete"
                    onClick={() => handleDelete(selectedInquiry.id || selectedInquiry._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>

              {/* Sender Details */}
              <div className="sender-info-box">
                <div className="sender-field">
                  <FaUser className="sender-icon" />
                  <span><strong>From:</strong> {selectedInquiry.name}</span>
                </div>
                <div className="sender-field">
                  <FaEnvelope className="sender-icon" />
                  <span><strong>Email:</strong> {selectedInquiry.email}</span>
                </div>
                {selectedInquiry.phone && (
                  <div className="sender-field">
                    <FaPhone className="sender-icon" />
                    <span><strong>Phone:</strong> {selectedInquiry.phone}</span>
                  </div>
                )}
              </div>

              {/* Original Message */}
              <div className="message-body-box">
                <h4 className="box-title">Member Inquiry Message:</h4>
                <p className="message-text">{selectedInquiry.message}</p>
              </div>

              {/* Reply Box if already replied */}
              {selectedInquiry.status === "Replied" && selectedInquiry.replyMessage && (
                <div className="reply-body-box">
                  <h4 className="box-title text-green">
                    <FaCheckCircle /> Saved Reply Sent to {selectedInquiry.email}:
                  </h4>
                  <p className="message-text">{selectedInquiry.replyMessage}</p>
                  {selectedInquiry.repliedAt && (
                    <span className="reply-date">
                      Replied on: {new Date(selectedInquiry.repliedAt).toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="no-selection-placeholder">
              <FaEnvelope className="placeholder-icon" />
              <h3>Select a Message</h3>
              <p>Click on any inquiry from the left panel to view message details and send a reply.</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {replyModalOpen && selectedInquiry && (
        <div className="modal-backdrop" onClick={() => setReplyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Reply to {selectedInquiry.name}</h3>
              <button className="modal-close" onClick={() => setReplyModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSendReply} className="modal-form">
              <div className="form-group">
                <label>Recipient Email</label>
                <input type="text" value={selectedInquiry.email} disabled className="input-disabled" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" value={`Re: ${selectedInquiry.subject}`} disabled className="input-disabled" />
              </div>
              <div className="form-group">
                <label>Reply Message *</label>
                <textarea
                  rows="5"
                  placeholder="Type your response to the user here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="reply-textarea"
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setReplyModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <FaPaperPlane /> Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
