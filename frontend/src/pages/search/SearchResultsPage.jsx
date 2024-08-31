// src/pages/search/SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "../../components/search/UserSearch"; // Import UserSearch component

const SearchResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Check if the device is mobile

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/search`, {
          params: { query },
        });
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Update isMobile based on window width
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Finding...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Lỗi: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isMobile && <SearchBar className="mb-6" />}{" "}
      {/* Show UserSearch on mobile */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search results for "{query}"
      </h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user._id}
              className="border border-gray-300 bg-gradient-to-r from-[#1f3634] to-[#27403e] p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <a
                href={`/profile/${user.username}`}
                className="flex items-center space-x-4"
              >
                <img
                  src={user.profileImg || "/avatar-placeholder.png"}
                  alt={`Ảnh đại diện của ${user.fullName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-white text-xl font-semibold">
                    {user.fullName}
                  </h2>
                  <span className="text-gray-300 text-sm">
                    @{user.username}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsPage;
