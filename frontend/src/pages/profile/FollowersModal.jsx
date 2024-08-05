import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; 
import { Link } from "react-router-dom";

const FollowersModal = ({ isOpen, onClose, userId }) => {
    const [followersList, setFollowersList] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchFollowersList = async () => {
                try {
                    const res = await fetch(`/api/users/${userId}/followers`);
                    const data = await res.json();
                    if (!res.ok) {
                        throw new Error(data.error || "Something went wrong");
                    }
                    setFollowersList(data);
                } catch (error) {
                    console.error("Error fetching followers list:", error.message);
                }
            };

            fetchFollowersList();
        }
    }, [isOpen, userId]);

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='bg-white p-4 rounded-lg w-80 max-h-96 overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-bold'>Followers</h2>
                    <AiOutlineClose
                        className='cursor-pointer'
                        onClick={onClose}
                    />
                </div>
                <ul>
                    {followersList.length > 0 ? (
                        followersList.map(user => (
                            <li key={user._id} className='flex items-center gap-2 mb-2'>
                                <img
                                    src={user.profileImg || "/avatar-placeholder.png"}
                                    alt={user.username}
                                    className='w-10 h-10 rounded-full'
                                />
                                <Link to={`/profile/${user.username}`} className='font-bold'>
                                    {user.fullName}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No one to show</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FollowersModal;
