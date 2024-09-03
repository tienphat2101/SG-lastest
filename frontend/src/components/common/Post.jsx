import { useState, useRef, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { FaRegHeart, FaRegBookmark, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { formatPostDate } from "../../utils/date";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialZoom, setInitialZoom] = useState(1);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const postOwner = post.user;
  const isLiked = post.likes.includes(authUser._id);
  const isMyPost = authUser._id === post.user._id;
  const formattedDate = formatPostDate(post.createdAt);

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: likePost, isPending: isLiking } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/like/${post._id}`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        return oldData.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes };
          }
          return p;
        });
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: commentPost, isPending: isCommenting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/comment/${post._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: comment }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Comment posted successfully");
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeletePost = () => {
    deletePost();
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (isCommenting) return;
    commentPost();
  };

  const handleLikePost = () => {
    if (isLiking) return;
    likePost();
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
    setInitialZoom(1);
    setInitialPosition({ x: 0, y: 0 });
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = "hidden"; // Ngăn cuộn trang
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage("");
    document.body.style.overflow = "auto"; // Khôi phục cuộn trang
  };

  const handleDoubleClick = () => {
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setPosition(initialPosition);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosition = { ...position };

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      setPosition({
        x: startPosition.x + dx / zoom,
        y: startPosition.y + dy / zoom,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    // Cleanup: Restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className="flex gap-2 items-start p-4 border-b border-gray-700">
        <div className="avatar">
          <Link
            to={`/profile/${postOwner.username}`}
            className="w-8 rounded-full overflow-hidden"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-2 items-center">
            <Link to={`/profile/${postOwner.username}`} className="font-bold">
              {postOwner.fullName}
            </Link>
            <span className="text-gray-700 flex gap-1 text-sm">
              <Link to={`/profile/${postOwner.username}`}>
                @{postOwner.username}
              </Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className="flex justify-end flex-1">
                {!isDeleting && (
                  <FaTrash
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeletePost}
                  />
                )}
                {isDeleting && <LoadingSpinner size="sm" />}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 overflow-hidden">
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img}
                className="h-80 object-contain rounded-lg border border-gray-700 cursor-pointer"
                alt=""
                onClick={() => openImageModal(post.img)}
              />
            )}
          </div>
          <div className="flex justify-between mt-3">
            <div className="flex gap-4 items-center w-2/3 justify-between">
              <div
                className="flex gap-1 items-center cursor-pointer group"
                onClick={() =>
                  document
                    .getElementById("comments_modal" + post._id)
                    .showModal()
                }
              >
                <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                <span className="text-sm text-slate-500 group-hover:text-sky-400">
                  {post.comments.length}
                </span>
              </div>
              <dialog
                id={`comments_modal${post._id}`}
                className="modal border-none outline-none"
              >
                <div className="modal-box rounded-lg border border-gray-700 bg-gray-900 text-white max-w-3xl w-full">
                  <h3 className="font-bold text-2xl mb-6 text-center">
                    Comments
                  </h3>
                  <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-4">
                    {post.comments.length === 0 ? (
                      <p className="text-gray-400 text-center italic">
                        No comments yet. Be the first to comment!
                      </p>
                    ) : (
                      post.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex gap-3 items-start bg-gray-800 p-4 rounded-lg"
                        >
                          <Link
                            to={`/profile/${comment.user.username}`}
                            className="shrink-0"
                          >
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={
                                  comment.user.profileImg ||
                                  "/avatar-placeholder.png"
                                }
                                alt={comment.user.username}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link
                                to={`/profile/${comment.user.username}`}
                                className="font-semibold hover:underline"
                              >
                                {comment.user.fullName}
                              </Link>
                              <span className="text-gray-400 text-sm">
                                @{comment.user.username}
                              </span>
                              <span className="text-gray-400 text-xs">•</span>
                              <span className="text-gray-400 text-xs">
                                {formatPostDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form
                    className="mt-6 flex gap-3 items-center border-t border-gray-700 pt-4"
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-lime-500"
                      placeholder="Add your comment..."
                      rows={2}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      className="bg-lime-500 hover:bg-lime-600 text-black font-semibold px-4 py-2 rounded-full transition duration-200 ease-in-out"
                      disabled={isCommenting}
                    >
                      {isCommenting ? <LoadingSpinner size="sm" /> : "Post"}
                    </button>
                  </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button className="cursor-default">close</button>
                </form>
              </dialog>
              <div className="flex gap-1 items-center group cursor-pointer">
                <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
                <span className="text-sm text-slate-500 group-hover:text-green-500">
                  0
                </span>
              </div>
              <div
                className="flex gap-1 items-center group cursor-pointer"
                onClick={handleLikePost}
              >
                {isLiking && <LoadingSpinner size="sm" />}
                {!isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500 " />
                )}
                <span
                  className={`text-sm group-hover:text-pink-500 ${
                    isLiked ? "text-pink-500" : "text-slate-500"
                  }`}
                >
                  {post.likes.length}
                </span>
              </div>
            </div>
            <div className="flex w-1/3 justify-end gap-2 items-center">
              <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal cho hình ảnh phóng to */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              ref={imageRef}
              className="max-w-[95%] max-h-[95%] object-contain rounded-lg shadow-2xl"
              alt="Enlarged image"
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                transition: "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                cursor: zoom === 1 ? "default" : "grab",
              }}
              onMouseDown={handleMouseDown}
              onDoubleClick={handleDoubleClick}
            />
            <button
              className="absolute top-4 right-4 bg-[#87df2c] bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 transition duration-300 transform hover:rotate-90"
              onClick={closeImageModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#87df2c] text-black rounded-full px-6 py-3 text-sm font-semibold shadow-lg">
              <span className="mr-2">🔍</span>
              Double-click to zoom in/out • Drag to move
            </div>
            <div className="absolute top-4 left-4 bg-[#87df2c] bg-opacity-80 rounded-full px-4 py-2 text-black text-sm font-semibold">
              Zoom: {Math.round(zoom * 100)}%
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
