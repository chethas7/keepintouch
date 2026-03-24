import { useEffect, useRef } from "react";

import RightSidebar from "./RightSideBar/RightSidebar";
import NotificationsPanel from "./RightSideSwitching/NotificationsPanel";
import ChatSidebar from "./RightSideSwitching/ChatSidebar";

const RightPanel = ({ panel, openChatModal }) => {
  return (
    <div className="space-y-4">
      {/* TOP PANEL (SCROLLABLE FIRST) */}
      {(panel === "notifications" || panel === "chat") && (
        <div className="max-h-[300px] overflow-y-auto pr-1">
          {panel === "notifications" && <NotificationsPanel />}
          {panel === "chat" && <ChatSidebar openModal={openChatModal} />}
        </div>
      )}

      {/* DIVIDER */}
      {(panel === "notifications" || panel === "chat") && (
        <hr className="border-gray-300 dark:border-gray-700" />
      )}

      {/* DEFAULT WIDGETS */}
      <RightSidebar panel={panel} />
    </div>
  );
};

export default RightPanel;
