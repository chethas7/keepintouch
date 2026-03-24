import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes, FaRegCommentAlt } from "react-icons/fa";

import { GrHomeRounded } from "react-icons/gr";
import { SlBell } from "react-icons/sl";
import { FiUser } from "react-icons/fi";
import { IoMoonOutline, IoLogOutOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

import DarkModeToggle from "../utils/DarkModeToggle";

const Navbar = ({ user, onLogout, setRightPanel }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const getIconStyle = (tab) =>
    `p-2 transition ${
      activeTab === tab
        ? "text-blue-500"
        : "text-gray-600 dark:text-white hover:text-blue-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:grid lg:grid-cols-[25%_50%_25%]">
          {/* LEFT : LOGO */}

          <div className="flex items-center">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter cursor-pointer">
              keepintouch
            </h1>{" "}
            {/* USER GREETING */}
            {user && (
              <span className="hidden lg:block text-sm text-gray-700 dark:text-gray-300">
                Hi, {user.fullName}
              </span>
            )}
          </div>

          {/* MIDDLE : SEARCH */}

          <div className="hidden md:flex justify-center w-full px-4">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>

              <input
                type="text"
                placeholder="Search community..."
                className="block w-full pl-10 pr-3 py-2 rounded-full bg-gray-100 dark:bg-neutral-800 text-sm placeholder-gray-500 focus:ring-2 focus:ring-blue-500/20 outline-none dark:text-white"
              />
            </div>
          </div>

          {/* RIGHT ACTIONS */}

          <div className="flex items-center justify-end gap-3">
            {/* HOME */}

            <Link
              to="/home"
              onClick={() => {
                setActiveTab("home");
                setRightPanel("home");
              }}
              className={getIconStyle("home")}
            >
              <GrHomeRounded size={20} />
            </Link>

            {/* NOTIFICATIONS */}
            <button
              onClick={() => {
                setActiveTab("notifications");
                setRightPanel("notifications");
              }}
              className={getIconStyle("notifications")}
            >
              <SlBell size={20} />
            </button>

            {/* MESSAGES */}

            <button
              onClick={() => {
                setActiveTab("chat");
                setRightPanel("chat");
              }}
              className={getIconStyle("chat")}
            >
              <FaRegCommentAlt size={20} />
            </button>

            {/* DARK MODE */}

            <DarkModeToggle />

            {/* PROFILE */}

            <Link
              to={`/profile/${user?.id || "user1"}`}
              onClick={() => setActiveTab("profile")}
              className={getIconStyle("profile")}
              title="Profile"
            >
              <FiUser size={20} />
            </Link>

            {/* LOGOUT */}

            <button
              onClick={onLogout} // Change handleLogout to onLogout
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              title="Logout"
            >
              <IoLogOutOutline size={22} />
            </button>

            {/* MOBILE MENU BUTTON */}

            <button
              className="lg:hidden p-2 text-gray-600 dark:text-neutral-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 px-4 py-4 space-y-3">
          <MobileItem icon={<GrHomeRounded />} label="Home" />
          <MobileItem icon={<SlBell />} label="Notifications" />
          <MobileItem icon={<FaRegCommentAlt />} label="Messages" />
          <MobileItem icon={<FiUser />} label="Profile" />
          <MobileItem icon={<IoLogOutOutline />} label="Logout" danger />
        </div>
      )}
    </nav>
  );
};

const MobileItem = ({ icon, label, danger = false }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg ${
      danger ? "text-red-500" : "text-gray-700 dark:text-neutral-300"
    } hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Navbar;
