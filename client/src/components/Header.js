import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"; // Import user icon

const Header = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isDashboardOpen && !e.target.closest(".dashboard")) {
        setIsDashboardOpen(false);
      }
    };

    if (isDashboardOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDashboardOpen]);

  return (
    <nav className="sticky top-0 z-40 flex justify-between px-8 items-center bg-slate-200 h-16 shadow-md">
      {/* Logo Section */}
      <div className="text-xl font-bold text-gray-800 hover:cursor-pointer hover:underline">
        <a href="/home">Logo</a>
      </div>

      {/* Navigation Links */}
      <div className="flex space-x-8 text-gray-700 font-medium">
        <a href="/home" className="hover:text-[#6366F1] hover:underline">
          Projects
        </a>
        <a href="/my-projects" className="hover:text-[#6366F1] hover:underline">
          MyProjects
        </a>
        <a href="/new-project" className="hover:text-[#6366F1] hover:underline">
          NewProjects
        </a>
        <a href="/save" className="hover:text-[#6366F1] hover:underline">
          SavedProjects
        </a>
        <a href="/chat" className="hover:text-[#6366F1] hover:underline">
          chat
        </a>
      </div>

      {/* Dashboard Dropdown with Profile Icon */}
      <div
        className="relative hover:cursor-pointer text-gray-700 font-medium"
        onClick={(e) => {
          e.stopPropagation();
          toggleDashboard();
        }}
      >
        {/* Profile Icon */}
        <FontAwesomeIcon icon={faUserCircle} size="2x" />

        {isDashboardOpen && (
          <div
            className="dashboard absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
            <a href="/profile">
              <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 cursor-pointer">
                Profile
              </div>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
