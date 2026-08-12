import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiArrowLeft,
  FiShield,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import "./ForgotPass.css";
import logo from "../../assets/logo.jpeg";

const API_BASE = import.meta.env.VITE_API_URL || "https://tigers-gym-zeta.vercel.app";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/user/forget-password`, { email });
      toast.success(res.data.message || "Password reset link sent successfully!");
      setSubmitted(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send password reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/user/forget-password`, { email });
      toast.success(res.data.message || "Password reset link resent successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend password reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      {/* Background */}
      <div className="forgot-page__bg" />
      <div className="forgot-page__overlay" />

      {/* Card */}
      <div className="forgot-card">
        {/* Logo */}
        <div className="forgot-card__logo">
          <img src={logo} alt="Tigers Gym Logo" className="logo-img" style={{ height: "90px" }} />
        </div>

        <div className="forgot-card__divider" />

        {!submitted ? (
          <>
            {/* Header */}
            <div className="forgot-card__header">
              <h1>Forgot Password</h1>
              <p>
                Enter your registered admin email address and we'll send you a secure password reset link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="forgot-form">
              <div className="forgot-form__group">
                <label>Email Address</label>
                <div className="forgot-form__input-wrap">
                  <FiMail className="forgot-form__icon" />
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="forgot-btn forgot-btn--primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader"></span>
                    Sending Link...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <p className="forgot-security">
                <FiShield className="forgot-security-icon" />
                Authorized administrators access only.
              </p>
            </form>
          </>
        ) : (
          <div className="forgot-success">
            <FiCheckCircle className="forgot-success__icon" />

            <h2>Check Your Email</h2>

            <p>
              We've sent a password reset link to <strong>{email}</strong>.
            </p>

            <p className="forgot-success__note">
              Please check your inbox and spam folder.
            </p>

            <div className="forgot-success__actions">
              <button
                type="button"
                onClick={handleResend}
                className="forgot-btn forgot-btn--secondary"
                disabled={loading}
              >
                <FiRefreshCw />
                Resend Link
              </button>

              <Link to="/admin/login" className="forgot-btn forgot-btn--primary">
                Back To Login
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Back Link */}
      <Link to="/admin/login" className="forgot-page__back">
        <FiArrowLeft />
        Back to Login
      </Link>
    </div>
  );
}
