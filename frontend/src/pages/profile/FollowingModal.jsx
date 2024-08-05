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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = ''; // Reset body overflow style
        }
        
        return () => {
            document.body.style.overflow = ''; // Clean up overflow style when modal is closed
        };
    }, [isOpen, userId]);

    // Handle route change to close the modal
    useEffect(() => {
        if (isOpen) {
            const handleRouteChange = () => {
                onClose();
            };

            // Add event listener for route changes
            window.addEventListener('popstate', handleRouteChange);

            // Cleanup on component unmount
            return () => window.removeEventListener('popstate', handleRouteChange);
        }
    }, [location, isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='bg-[#1d232a] border border-[#87df2c] p-4 rounded-lg w-80 max-h-96 overflow-hidden'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-lg font-bold text-white'>Following</h2>
                        <AiOutlineClose
                            className='cursor-pointer text-white'
                            onClick={onClose}
                        />
                </div>
                <div className='max-h-80 overflow-y-auto'>
                    <ul className='text-white'>
                        {followingList.length > 0 ? (
                            followingList.map(user => (
                                <li key={user._id} className='flex items-center gap-2 mb-2 p-2 bg-[#27403e] rounded-lg'>
                                    <img
                                        src={user.profileImg || "/avatar-placeholder.png"}
                                        alt={user.username}
                                        className='w-10 h-10 rounded-full'
                                    />
                                    <Link 
                                        to={`/profile/${user.username}`} 
                                        className='font-bold'
                                        onClick={() => onClose()} // Close modal on user click
                                    >
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
        </div>
    );
};

export default FollowingModal;
