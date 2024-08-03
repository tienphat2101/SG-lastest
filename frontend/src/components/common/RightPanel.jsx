import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import UserSearch from "../search/UserSearch"; // Import UserSearch component

import useFollow from "../../hooks/useFollow";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
    const { data: suggestedUsers, isLoading } = useQuery({
        queryKey: ["suggestedUsers"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/users/suggested");
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    });

    const { follow, isPending } = useFollow();
    const location = useLocation();

    if (suggestedUsers?.length === 0 || location.pathname === '/pomodoro') return null; //xóa who to follow khi ở trong podomoro page

    return (
        <div className='hidden lg:block my-4 mx-2'>
            <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
                <UserSearch className="mb-6" /> {/* Add UserSearch component here */}
                <p className='font-bold mt-4'>Who to follow</p>
                <div className='flex flex-col gap-4'>
                    {/* item */}
                    {isLoading && (
                        <>
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                        </>
                    )}
                    {!isLoading &&
                        suggestedUsers?.map((user) => (
                            <Link
                                to={`/profile/${user.fullName}`}
                                className='flex items-center justify-between gap-4'
                                key={user._id}
                            >
                                <div className='flex gap-2 items-center'>
                                    <div className='avatar'>
                                        <div className='w-8 rounded-full'>
                                            <img src={user.profileImg || "/avatar-placeholder.png"} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold tracking-tight truncate w-35'>
                                            {user.fullName}
                                        </span>
                                        <span className='text-sm text-slate-500'>@{user.username}</span>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            follow(user._id);
                                        }}
                                    >
                                        {isPending ? <LoadingSpinner size='sm' /> : "Follow"}
                                    </button>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
