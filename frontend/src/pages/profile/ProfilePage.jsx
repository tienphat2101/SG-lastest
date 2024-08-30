import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";
import FollowingModal from "./FollowingModal";
import FollowersModal from "./FollowersModal"; // Import FollowersModal mới

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";

import useFollow from "../../hooks/useFollow";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const socket = io("http://localhost:5000");

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false); // Thêm state modal followers

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { username } = useParams();

  const { follow, isPending } = useFollow();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { isUpdatingProfile, updateProfile } = useUpdateUserProfile();

  const isMyProfile = authUser._id === user?._id;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const amIFollowing = authUser?.following.includes(user?._id);

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  useEffect(() => {
    socket.on("avatar_updated", (updatedUser) => {
      if (user && user._id === updatedUser._id) {
        refetch();
      }
    });

    return () => {
      socket.off("avatar_updated");
    };
  }, [user, refetch]);

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
      {isLoading || isRefetching ? (
        <ProfileHeaderSkeleton />
      ) : (
        !user && <p className="text-center text-lg mt-4">User not found</p>
      )}
      <div className="flex flex-col">
        {!isLoading && !isRefetching && user && (
          <>
            <div className="sticky top-0 z-10 bg-[rgb(18,18,18)]">
              <div className="flex gap-4 px-4 py-3 items-center">
                <Link
                  to="/"
                  className="hover:bg-gray-800 p-2 rounded-full transition"
                >
                  <FaArrowLeft className="w-5 h-5" />
                </Link>
                <div className="flex flex-col">
                  <p className="font-bold text-xl">{user?.fullName}</p>
                  <span className="text-sm text-slate-400">
                    {POSTS?.length} posts
                  </span>
                </div>
              </div>
            </div>

            <div className="relative group/cover">
              <img
                src={coverImg || user?.coverImg || "/cover.png"}
                className="h-52 w-full object-cover"
                alt="cover image"
              />
              {isMyProfile && (
                <div
                  className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                  onClick={() => coverImgRef.current.click()}
                >
                  <MdEdit className="w-5 h-5 text-white" />
                </div>
              )}

              <input
                type="file"
                hidden
                accept="image/*"
                ref={coverImgRef}
                onChange={(e) => handleImgChange(e, "coverImg")}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                ref={profileImgRef}
                onChange={(e) => handleImgChange(e, "profileImg")}
              />
              <div className="avatar absolute -bottom-16 left-4">
                <div className="w-32 rounded-full relative group/avatar">
                  <img
                    src={
                      profileImg ||
                      user?.profileImg ||
                      "/avatar-placeholder.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200">
                    {isMyProfile && (
                      <MdEdit
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => profileImgRef.current.click()}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-4 mt-5 space-x-2">
              {isMyProfile && <EditProfileModal authUser={authUser} />}
              {!isMyProfile && (
                <button
                  className="btn btn-outline rounded-full btn-sm hover:bg-primary hover:text-white transition"
                  onClick={() => follow(user?._id)}
                >
                  {isPending
                    ? "Loading..."
                    : amIFollowing
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
              {(coverImg || profileImg) && (
                <button
                  className="btn btn-primary rounded-full btn-sm text-white px-4"
                  onClick={async () => {
                    await updateProfile({ coverImg, profileImg });
                    setProfileImg(null);
                    setCoverImg(null);
                    socket.emit("avatar_updated", {
                      _id: user._id,
                      profileImg,
                    });
                  }}
                >
                  {isUpdatingProfile ? "Updating..." : "Update"}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-14 px-4">
              <div className="flex flex-col">
                <span className="font-bold text-2xl">{user?.fullName}</span>
                <span className="text-sm text-slate-400">
                  @{user?.username}
                </span>
                <p className="text-sm my-2 leading-relaxed">{user?.bio}</p>
              </div>

              <div className="flex gap-4 flex-wrap text-sm">
                {user?.link && (
                  <div className="flex gap-1 items-center">
                    <FaLink className="w-4 h-4 text-slate-400" />
                    <a
                      href={user?.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {user?.link}
                    </a>
                  </div>
                )}
                <div className="flex gap-2 items-center">
                  <IoCalendarOutline className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">{memberSinceDate}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div
                  className="flex gap-1 items-center cursor-pointer hover:underline"
                  onClick={() => setIsFollowingModalOpen(true)}
                >
                  <span className="font-bold">{user?.following.length}</span>
                  <span className="text-slate-400">Following</span>
                </div>
                <div
                  className="flex gap-1 items-center cursor-pointer hover:underline"
                  onClick={() => setIsFollowersModalOpen(true)}
                >
                  <span className="font-bold">{user?.followers.length}</span>
                  <span className="text-slate-400">Followers</span>
                </div>
              </div>
            </div>

            <div className="flex w-full border-b border-gray-700 mt-4">
              <div
                className={`flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer ${
                  feedType === "posts"
                    ? "text-white"
                    : "text-slate-500 hover:text-white hover:bg-secondary"
                }`}
                onClick={() => setFeedType("posts")}
              >
                Posts
                {feedType === "posts" && (
                  <div
                    className="absolute bottom-0 w-10 h-1 rounded-full"
                    style={{ backgroundColor: "#87df2c" }}
                  />
                )}
              </div>
              <div
                className={`flex justify-center flex-1 p-3 transition duration-300 relative cursor-pointer ${
                  feedType === "likes"
                    ? "text-white"
                    : "text-slate-500 hover:text-white hover:bg-secondary"
                }`}
                onClick={() => setFeedType("likes")}
              >
                Likes
                {feedType === "likes" && (
                  <div
                    className="absolute bottom-0 w-10 h-1 rounded-full"
                    style={{ backgroundColor: "#87df2c" }}
                  />
                )}
              </div>
            </div>
          </>
        )}
        <Posts feedType={feedType} username={username} userId={user?._id} />
      </div>
      <FollowingModal
        isOpen={isFollowingModalOpen}
        onClose={() => setIsFollowingModalOpen(false)}
        userId={user?._id}
      />
      <FollowersModal
        isOpen={isFollowersModalOpen}
        onClose={() => setIsFollowersModalOpen(false)}
        userId={user?._id}
      />
    </div>
  );
};

export default ProfilePage;
