import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Feed from "../components/Feed/Feed";
import { useRef, useEffect } from "react";
import LeftSidebar from "../components/LeftSideBar/LeftSidebar";
import NotificationsPanel from "../components/RightSideSwitching/NotificationsPanel";
import ChatSidebar from "../components/RightSideSwitching/ChatSidebar";
import RightPanel from "../components/RightPanel";
import ChatModal from "../components/Chat/ChatModal";

const HomePage = () => {
  const dispatch = useDispatch();
  const rightRef = useRef();
  const { user } = useSelector((state) => state.auth);
  const [openChatModal, setOpenChatModal] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
  };
  const [rightPanel, setRightPanel] = useState("home");
  useEffect(() => {
    if (rightRef.current) {
      rightRef.current.scrollTop = 0;
    }
  }, [rightPanel]);
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors">
      <Navbar
        user={user}
        onLogout={handleLogout}
        setRightPanel={setRightPanel}
      />

      {/* 3-Column Grid Container */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[25%_50%_25%] gap-6 p-4 md:p-6">
        {/* Left Section (Sticky) */}
        <div className="hidden lg:block sticky top-24 h-fit">
          <LeftSidebar />
        </div>
        {/* Center Section (Scrollable) */}
        <div className="space-y-6">
          <Feed />
        </div>
        {/* Right Section (Sticky) */}

        <div
          ref={rightRef}
          className="sticky top-24 h-[calc(100vh-100px)] overflow-y-auto pr-2"
        >
          <RightPanel panel={rightPanel} openChatModal={setOpenChatModal} />
        </div>
      </div>
      {openChatModal && <ChatModal onClose={() => setOpenChatModal(false)} />}
    </div>
  );
};

export default HomePage;
