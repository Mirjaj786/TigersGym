import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FiLock, FiArrowLeft, FiShield, FiCheckCircle } from "react-icons/fi";
import "./ResetPass.css";
import logo from "../../assets/logo.jpeg";

const API_BASE = import.meta.env.VITE_API_URL || "https://tigers-gym-zeta.vercel.app";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Auto-redirect countdown after successful reset
  useEffect(() => {
    if (!success) return;

    if (countdown === 0) {
      navigate("/admin/login");
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [success, countdown, navigate]);

  // Submit new password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || !newPassword) return;

    setSubmitting(true);

    try {
      await axios.post(`${API_BASE}/user/reset-password/${token}`, {
        password: newPassword,
      });
      toast.success("Password reset successful!");
      setSuccess(true);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to reset password. Token may be expired.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-page__bg" aria-hidden="true" />
        <div className="auth-page__overlay" aria-hidden="true" />

        <div className="auth-card" role="main">
          <div className="auth-card__logo">
            <img src={logo} alt="Tigers Gym Logo" className="logo-img" style={{ height: "90px" }} />
          </div>
          <div className="auth-card__divider" aria-hidden="true" />

          <div className="auth-card__success">
            <span className="auth-card__success-icon" aria-hidden="true">
              <FiCheckCircle />
            </span>
            <h2 className="auth-card__success-heading">
              Password Updated Successfully
            </h2>
            <p className="auth-card__success-text">
              Your admin password has been updated. You can now log in using your new password.
            </p>
            <Link
              to="/admin/login"
              className="auth-btn auth-btn--primary auth-btn--full"
            >
              BACK TO LOGIN
            </Link>
            <p className="auth-card__redirect-text">
              Redirecting to Login... ({countdown})
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main reset form
  return (
    <div className="auth-page">
      <div className="auth-page__bg" aria-hidden="true" />
      <div className="auth-page__overlay" aria-hidden="true" />

      <div className="auth-card" role="main">
        {/* Logo */}
        <div className="auth-card__logo">
          <img src={logo} alt="Tigers Gym Logo" className="logo-img" style={{ height: "90px" }} />
        </div>

        <div className="auth-card__divider" aria-hidden="true" />

        {/* Heading */}
        <div className="auth-card__header">
          <h1 className="auth-card__heading">Reset Password</h1>
          <p className="auth-card__subtitle">
            Create a new secure password for your admin account.
          </p>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__group">
            <label htmlFor="rp-new-password" className="auth-form__label">
              New Password
            </label>
            <div className="auth-form__input-wrap">
              <span className="auth-form__icon" aria-hidden="true">
                <FiLock />
              </span>
              <input
                id="rp-new-password"
                type="password"
                className="auth-form__input"
                placeholder="Create new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            {newPassword.length > 0 && (
              <p className="auth-form__hint">
                Use 6+ characters with numbers and letters.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="auth-btn auth-btn--primary auth-btn--full"
            disabled={submitting || !newPassword}
          >
            {submitting ? (
              <>
                <span className="loader" aria-hidden="true" />
                Updating Password...
              </>
            ) : (
              "RESET PASSWORD"
            )}
          </button>

          <p className="auth-form__security">
            <FiShield className="auth-form__security-icon" aria-hidden="true" />
            Authorized access only. Intended for Tigers Gym management.
          </p>
        </form>
      </div>

      <Link
        to="/admin/login"
        className="auth-page__back"
        aria-label="Back to login"
      >
        <FiArrowLeft className="auth-page__back-icon" aria-hidden="true" />
        Back to Login
      </Link>
    </div>
  );
}
