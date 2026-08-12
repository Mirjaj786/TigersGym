import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../Layouts/MainLayout/MainLayout";
import AdminLayout from "../Layouts/AdminLayout/AdminLayout";
import ProtectedRoute from "../Component/ProtectedRoute";

import Home from "../Pages/Home/Home.jsx";
import About from "../Pages/About/About.jsx";
import Programs from "../Pages/Programs/Programs.jsx";
import Membership from "../Pages/Membership/MemberShip.jsx";
import Gallery from "../Pages/Gallery/Gallery.jsx";
import Contact from "../Pages/Contact/Contact";

import Login from "../Pages/LoginPage/AdminLogin.jsx";
import ForgotPassword from "../Pages/LoginPage/ForgotPass.jsx";
import ResetPassword from "../Pages/LoginPage/ResetPass.jsx";

import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageGallery from "../Pages/Admin/ManageGallery";
import ContactMessages from "../Pages/Admin/ContactMessages";
import ComingSoonPage from "../Pages/Admin/ComingSoonPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="programs" element={<Programs />} />
        <Route path="membership" element={<Membership />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Admin Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/gallery" element={<ManageGallery />} />
          <Route path="/admin/messages" element={<ContactMessages />} />
          <Route path="/admin/customers" element={<ComingSoonPage />} />
          <Route path="/admin/attendance" element={<ComingSoonPage />} />
          <Route path="/admin/fees" element={<ComingSoonPage />} />
          <Route path="/admin/trainers" element={<ComingSoonPage />} />
          <Route path="/admin/plans" element={<ComingSoonPage />} />
          <Route path="/admin/settings" element={<ComingSoonPage />} />
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
