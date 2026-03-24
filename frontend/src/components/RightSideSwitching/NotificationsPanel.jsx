import { useState } from "react";
import { notifications } from "../../assets/dummyData";

const NotificationsPanel = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleNotifications = showAll
    ? notifications
    : notifications.slice(0, 10);

  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Notifications
      </h3>

      <div className="space-y-3">
        {visibleNotifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition
              ${
                !notif.read
                  ? "bg-blue-100 dark:bg-[#2a2a2a]"
                  : "hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
              }`}
          >
            {/* Avatar */}
            <img src={notif.user.avatar} className="w-9 h-9 rounded-full" />

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {notif.message}
              </p>

              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
            </div>

            {/* Unread dot */}
            {!notif.read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
            )}
          </div>
        ))}
      </div>

      {/* SEE MORE */}
      {notifications.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 text-blue-500 text-sm hover:underline"
        >
          {showAll ? "Show Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default NotificationsPanel;
