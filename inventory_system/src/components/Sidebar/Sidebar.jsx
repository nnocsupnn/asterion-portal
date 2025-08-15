import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoOnly from "../../assets/images/logoOnly.png";

const Sidebar = ({ sidebarExpanded, setSidebarExpanded, sidebarOpen, setSidebarOpen, menuItems, sidebarRef }) => {
  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-40 transform bg-white dark:bg-gray-800 shadow-lg transition-all duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static 
        ${sidebarExpanded ? "w-56" : "w-20"} flex flex-col h-full`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-14 border-b-1 border-b-neutral-400 dark:border-gray-700 p-2 space-x-1 my-3">
        <img
          src={sidebarExpanded ? Logo : LogoOnly}
          alt="Logo"
          className="h-full w-auto object-contain"
          style={{ filter: 'drop-shadow(0 0 1px white) drop-shadow(0 0 2px white)' }}
        />
        {sidebarExpanded && <span className="text-lg font-bold">Company</span>}
      </div>
     
      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((menu, idx) => (
          <NavLink
            key={idx}
            to={menu.path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-md mb-2 transition-colors
              ${isActive ? "bg-blue-500 text-white dark:bg-blue-600" : "hover:bg-blue-100 dark:hover:bg-gray-700"}`
            }
          >
            <span className="text-xl">{menu.icon}</span>
            {sidebarExpanded && <span>{menu.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 flex items-center justify-center gap-2">
        {sidebarExpanded ? (
          <span>© 2025 Powered by Asterion Solution</span>
        ) : (
          <span>©</span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;