import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const FollowingModal = ({ isOpen, onClose, userId }) => {
  const [followingList, setFollowingList] = useState([]);
  const location = useLocation(); // Hook to track route changes

  useEffect(() => {
    if (isOpen) {
      const fetchFollowingList = async () => {
        try {
          const res = await fetch(`/api/users/${userId}/following`);
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
          }
          setFollowingList(data);
        } catch (error) {
          console.error("Error fetching following list:", error.message);
        }
      };

      fetchFollowingList();

      // Add a class to the body to prevent scrolling
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset body overflow style
    }

    return () => {
      document.body.style.overflow = ""; // Clean up overflow style when modal is closed
    };
  }, [isOpen, userId]);

  // Handle route change to close the modal
  useEffect(() => {
    if (isOpen) {
      const handleRouteChange = () => {
        onClose();
      };

      // Add event listener for route changes
      window.addEventListener("popstate", handleRouteChange);

      // Cleanup on component unmount
      return () => window.removeEventListener("popstate", handleRouteChange);
    }
  }, [location, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#1d232a] border border-[#87df2c] p-6 rounded-xl w-96 max-h-[80vh] overflow-hidden shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Đang theo dõi</h2>
          <button
            className="text-gray-400 hover:text-white transition-colors"
            onClick={onClose}
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="max-h-[calc(80vh-100px)] overflow-y-auto">
          <ul className="space-y-4">
            {followingList.length > 0 ? (
              followingList.map((user) => (
                <li
                  key={user._id}
                  className="bg-[#27403e] rounded-lg p-3 hover:bg-[#2f4d4a] transition-colors"
                >
                  <Link
                    to={`/profile/${user.username}`}
                    className="flex items-center gap-4"
                    onClick={onClose}
                  >
                    <img
                      src={user.profileImg || "/avatar-placeholder.png"}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Không có ai để hiển thị
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowingModal;
