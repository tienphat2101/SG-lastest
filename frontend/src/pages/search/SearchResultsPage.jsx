// src/pages/search/SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/search/UserSearch'; // Import UserSearch component

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Check if the device is mobile

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`/api/users/search`, { params: { query } });
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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            {isMobile && <SearchBar className="mb-6" />} {/* Show UserSearch on mobile */}
            <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li 
                            key={user._id} 
                            className="border border-gray-400 bg-[#27403e] mb-2 p-3 rounded-lg"
                        >
                            <a 
                                href={`/profile/${user.username}`} 
                                className="text-white text-lg font-semibold"
                            >
                                {user.fullName}
                            </a>
                            <span className="text-gray-300 text-sm ml-2">@{user.username}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResultsPage;
