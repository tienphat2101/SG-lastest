import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${query}`);
    }
  };

  const handleSuggestionClick = (username) => {
    navigate(`/profile/${username}`);
  };

  const getSuggestions = async (query) => {
    const res = await fetch(`/api/users/suggestions?query=${query}`);
    const data = await res.json();
    setSuggestions(data);
  };

  return (
    <div className="relative flex items-center">
      <FaSearch className="absolute left-3 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          getSuggestions(e.target.value);
        }}
        placeholder="Find your friends..."
        className="pl-10 pr-4 py-0.8 border border-gray-300 rounded-md w-full sm:w-60" // Chiều rộng của search bar
      />
      <button
        onClick={handleSearch}
        className="ml-2 bg-[#87df2c] text-white px-3 py-1 rounded-md text-sm hover:bg-[#66c22f]" // Nút tìm kiếm
      >
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md z-10">
          {suggestions.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSuggestionClick(user.username)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
