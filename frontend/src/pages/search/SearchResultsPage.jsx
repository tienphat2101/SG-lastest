// src/pages/search/SearchResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Search Results for "{query}"</h1>
            {users.length === 0 ? (
                <p>No users found</p>
            ) : (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <a href={`/profile/${user.username}`}>{user.fullName}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResultsPage;
