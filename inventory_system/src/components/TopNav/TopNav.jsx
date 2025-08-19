import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { IoSearch, IoMoonOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import NotificationDropdown from "../DropdownNotification/dropDownNotif";

const TopNav = ({
  scrolled,
  sidebarOpen,
  setSidebarOpen,
  sidebarExpanded,
  setSidebarExpanded,
  unreadCount,
  notificationRef,
  dropdownRef,
  activePanel,
  setActivePanel,
  notifications,
  handleNotificationClick,
  user,
  darkMode,
  setDarkMode,
  handleLogout,
}) => (
  <header className={`flex items-center justify-between gap-2 px-4 py-3 sticky top-0 z-30 transition-shadow dark:border-white/10 dark:border-1 ${scrolled ? "shadow-md" : ""}`}>
    <div className="flex items-center space-x-5">
      {/* Mobile menu toggle */}
      <button
        className="lg:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>
      {/* Desktop sidebar expand/collapse */}
      <button
        className="hidden lg:block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
      >
        {sidebarExpanded ? (
          <FiChevronLeft size={20} />
        ) : (
          <FiChevronRight size={20} />
        )}
      </button>
      {/* Search bar */}
      <form className="flex items-center w-full mx-auto">
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <IoSearch />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search brands, SKUs..."
          />
        </div>
      </form>
    </div>
    {/* Right Side */}
    <div className="flex items-center gap-3">
      {/* Notifications Desktop */}
      <div
        ref={notificationRef}
        className="relative hidden md:flex items-center justify-center w-10 h-10 rounded-sm shadow-lg shadow-gray-500/50 cursor-pointer"
        onClick={() =>
          setActivePanel(
            activePanel === "notifications" ? null : "notifications"
          )
        }
      >
        <IoMdNotificationsOutline className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 text-xs flex items-center justify-center bg-red-500 text-white rounded-full">
            {unreadCount}
          </span>
        )}
        {/* Show dropdown only on desktop */}
        {activePanel === "notifications" && (
          <div className="absolute top-10 right-0 mt-2 w-96 max-w-[99vw] bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 md:block hidden">
            <NotificationDropdown
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
              onClose={() => setActivePanel(null)}
            />
          </div>
        )}
      </div>
      {/* Avatar dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex w-10 h-10 items-center space-x-3 cursor-pointer shadow-lg shadow-gray-500/50"
          onClick={() =>
            setActivePanel(activePanel === "menu" ? null : "menu")
          }
        >
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-full h-auto rounded-sm object-cover"
          />
          <span className="absolute bottom-0 left-8 transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          {activePanel !== "menu" && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full md:hidden">
              {unreadCount}
            </span>
          )}
        </div>
        {activePanel === "menu" && (
          <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden z-50 p-2">
            <Link
              to="settings"
              onClick={() => setActivePanel(null)}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-b-2 border-zinc-600/70 mb-2"
            >
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-sm object-cover"
              />
              <span className="ml-3 text-xl font-bold">
                {user?.name}
              </span>
            </Link>
            {/* Mobile notifications shortcut */}
            <div
              className="flex md:hidden items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                setActivePanel(
                  activePanel === "notifications" ? null : "notifications"
                );
              }}
            >
              <IoMdNotificationsOutline className="mr-2" /> Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white px-2 py-0.5 text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            {/* Dark mode toggle */}
            <div className="flex justify-between w-full items-center px-4 py-2">
              <span className="flex gap-1 items-center">
                <IoMoonOutline className="mr-2" /> Dark Mode
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div
                  className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 
                    peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                    after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-700"
                ></div>
              </label>
            </div>
            {/* Logout */}
            <button
              onClick={() => {
                setActivePanel(null);
                handleLogout();
              }}
              className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        )}
        {/* Notification Mobile */}
        {activePanel === "notifications" && (
          <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-start justify-center pt-16 z-50 md:hidden">
            <div 
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-[95vw] h-auto max-w-md overflow-hidden mx-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                <NotificationDropdown
                  notifications={notifications}
                  onNotificationClick={handleNotificationClick}
                  onClose={() => setActivePanel(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </header>
);

export default TopNav;