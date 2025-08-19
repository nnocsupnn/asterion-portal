import React, { useState, useEffect, useRef } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import SignOffLoader from "../../components/Loader/signoffLoader";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopNav from "../../components/TopNav/TopNav";
import { mockNotifications } from "../../data/mockdata";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiDollarSign,
  FiBarChart2,
} from "react-icons/fi";
import { IoSyncOutline } from "react-icons/io5";

const UserPage = () => {
  const [loadingSignOff, setLoadingSignOff] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(
    window.innerWidth >= 1024
  );
  const [activePanel, setActivePanel] = useState(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  const notificationRef = useRef(null);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);
  const location = useLocation(); // Get current location

  const unreadCount = notifications.filter(n => !n.read).length;

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "dashboard" },
    { name: "Inventory", icon: <FiBox />, path: "inventory" },
    { name: "Transactions", icon: <FiShoppingCart />, path: "orders" },
    { name: "Platform Sync", icon: <IoSyncOutline />, path: "transactions" },
    { name: "Reports", icon: <FiBarChart2 />, path: "reports" }
  ];

  // Close sidebar when route changes (on mobile)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location]); // This will run when the route changes

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
        setSidebarExpanded(true);
      } else {
        setSidebarExpanded(false);
      }
    };

    if (window.innerWidth < 640) {
      setSidebarExpanded(false);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only close sidebar if clicking outside on mobile
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 1024
      ) {
        setSidebarOpen(false);
      }
      
      // Close dropdowns when clicking outside
      if (
        activePanel &&
        !dropdownRef.current?.contains(event.target) &&
        !notificationRef.current?.contains(event.target)
      ) {
        setActivePanel(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [sidebarOpen, activePanel]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
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

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setActivePanel(null);
  };

  return (
    <>
      {loadingSignOff && <SignOffLoader message="Signing out..." />}
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 z-50 lg:z-40 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:relative`}
        >
          <Sidebar
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            menuItems={menuItems}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
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
          
          {/* Mobile overlay when sidebar is open */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
            <Outlet context={{ notifications, handleNotificationClick }} />
          </main>
        </div>
      </div>
    </>
  );
};

export default UserPage;