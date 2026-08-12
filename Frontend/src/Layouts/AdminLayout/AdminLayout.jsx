import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "./AdminLayout.css";

const PAGE_TITLES = {
  "/admin/dashboard": "Dashboard Overview",
  "/admin/gallery": "Gallery Management",
  "/admin/messages": "Contact Inquiries",
  "/admin/customers": "Customer Management",
  "/admin/attendance": "Attendance Tracking",
  "/admin/fees": "Fee Management",
  "/admin/trainers": "Trainer & Staff Management",
  "/admin/plans": "Membership Plans",
  "/admin/settings": "Gym Settings",
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title = PAGE_TITLES[location.pathname] || "Admin Portal";

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="admin-layout__main">
        <AdminHeader
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          pageTitle={title}
        />
        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
