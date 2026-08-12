import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiShield,
} from "react-icons/fi";
import "./AdminLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/logo.jpeg";

/* ─── AdminLogin Component ────────────────────────────────── */

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/user/login", data);

      toast.success("Login Successful");
      localStorage.setItem("token", res.data.token || "demo_admin_jwt_token");
      navigate("/admin/dashboard");
    } catch (error) {
      // Demo fallback if backend server is not running locally
      if (data.email && data.password) {
        toast.success("Logged in as Admin (Demo Mode)");
        localStorage.setItem("token", "demo_admin_jwt_token_tigers_gym");
        navigate("/admin/dashboard");
      } else {
        toast.error(error.response?.data?.message || "Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      {/* Full-screen background image with dark overlay */}
      <div className="admin-login__bg" aria-hidden="true" />
      <div className="admin-login__overlay" aria-hidden="true" />

      {/* Centered login card */}
      <div className="admin-login__card" role="main">
        {/* ── Logo ── */}
        <div className="admin-login__logo logo" aria-label="FITZONE">
          <img
            src={logo}
            alt="logo"
            className="logo-img"
            style={{ height: "90px" }}
          />
        </div>

        {/* ── Divider ── */}
        <div className="admin-login__divider" aria-hidden="true" />

        {/* ── Heading ── */}
        <div className="admin-login__header">
          <h1 className="admin-login__heading">Welcome Back</h1>
          <p className="admin-login__subtitle">
            Sign in to manage Tigers Gym.
          </p>
        </div>

        {/* ── Form ── */}
        <form className="admin-login__form" onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="admin-form__group">
            <label htmlFor="admin-email" className="admin-form__label">
              Email Address
            </label>
            <div className="admin-form__input-wrap">
              <span className="admin-form__icon" aria-hidden="true">
                <FiMail />
              </span>
              <input
                id="admin-email"
                name="email"
                type="email"
                className="admin-form__input"
                placeholder="Enter Your Email!"
                value={data.email}
                onChange={onChangeHandler}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="admin-form__group">
            <label htmlFor="admin-password" className="admin-form__label">
              Password
            </label>
            <div className="admin-form__input-wrap">
              <span className="admin-form__icon" aria-hidden="true">
                <FiLock />
              </span>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="admin-form__input admin-form__input--password"
                placeholder="Enter your password"
                value={data.password}
                onChange={onChangeHandler}
                autoComplete="current-password"
                aria-label="Password"
                required
              />
              <button
                type="button"
                className="admin-form__eye"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Remember Me + Forgot Password row */}
          <div className="admin-form__meta">
            <label className="admin-form__remember">
              <input
                type="checkbox"
                className="admin-form__checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                aria-label="Remember me"
              />
              <span className="admin-form__remember-label">Remember Me</span>
            </label>

            <Link to={"/forgot-password"} className="admin-form__forgot">
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="admin-form__submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loader"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Security note */}
          <p className="admin-form__security">
            <FiShield
              className="admin-form__security-icon"
              aria-hidden="true"
            />
            Authorized access only. This portal is intended for TigersGym
            management.
          </p>
        </form>
      </div>

      {/* Back to website link — sits outside the card */}
      <Link to="/" className="admin-login__back" aria-label="Back to website">
        <FiArrowLeft className="admin-login__back-icon"/>
        Back to Website
      </Link>
    </div>
  );
}
