import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Notifications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <div className="flex-[4_4_0] border-l border-r border-gray-800 min-h-screen bg-gray-900 text-gray-200">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <p className="font-bold text-white">Notifications</p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1 hover:text-white">
              <IoSettingsOutline className="w-5 h-5" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 rounded-box w-52"
            >
              <li>
                <a onClick={deleteNotifications} className="hover:bg-gray-700">
                  Delete all notifications
                </a>
              </li>
            </ul>
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center h-full items-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        {notifications?.length === 0 && (
          <div className="text-center p-4 font-bold">No notifications 🤔</div>
        )}
        {notifications?.map((notification) => (
          <div
            className="border-b border-gray-800 hover:bg-gray-800"
            key={notification._id}
          >
            <div className="flex items-center gap-3 p-4">
              {notification.type === "follow" && (
                <FaUser className="w-6 h-6 text-lime-500" />
              )}
              {notification.type === "like" && (
                <FaHeart className="w-6 h-6 text-red-500" />
              )}
              <Link
                to={`/profile/${notification.from.username}`}
                className="flex items-center gap-3"
              >
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={
                        notification.from.profileImg ||
                        "/avatar-placeholder.png"
                      }
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white">
                    @{notification.from.username}
                  </span>{" "}
                  <span className="text-gray-400">
                    {notification.type === "follow"
                      ? "followed you"
                      : "liked your post"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default NotificationPage;
