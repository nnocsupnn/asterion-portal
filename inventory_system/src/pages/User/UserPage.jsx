import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import SignOffLoader from "../../components/Loader/signoffLoader";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopNav from "../../components/TopNav/TopNav";
import { mockNotifications } from "../../data/mockdata";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
} from "react-icons/fi";

const UserPage = () => {
  const [loadingSignOff, setLoadingSignOff] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activePanel, setActivePanel] = useState(null); // 'menu' | 'notifications' | null
  const [notifications, setNotifications] = useState(mockNotifications);

  const notificationRef = useRef(null);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

   const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "dashboard" },
    { name: "Inventory", icon: <FiBox />, path: "inventory" },
    { name: "Orders", icon: <FiShoppingCart />, path: "orders" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
      if (
        activePanel &&
        !dropdownRef.current?.contains(event.target) &&
        !notificationRef.current?.contains(event.target)
      ) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, activePanel]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    setLoadingSignOff(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  // Mark notification as read
  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setActivePanel(null);
  };

  return (
    <>
      {loadingSignOff && <SignOffLoader message="Signing out..." />}
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar */}
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
          sidebarRef={sidebarRef}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <TopNav
            scrolled={scrolled}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
            unreadCount={unreadCount}
            notificationRef={notificationRef}
            dropdownRef={dropdownRef}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            notifications={notifications}
            handleNotificationClick={handleNotificationClick}
            user={user}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            handleLogout={handleLogout}
          />
          <main className="p-4 sm:p-6 overflow-auto">
            <Outlet context={{ notifications, handleNotificationClick }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default UserPage;