import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [query, setQuery] = useState('');
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

    // Dummy suggestions; replace with actual data from API if needed
    const getSuggestions = async (query) => {
        const res = await fetch(`/api/users/suggestions?query=${query}`);
        const data = await res.json();
        setSuggestions(data);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    getSuggestions(e.target.value);
                }}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            {suggestions.length > 0 && (
                <ul>
                    {suggestions.map((user) => (
                        <li key={user._id} onClick={() => handleSuggestionClick(user.username)}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
