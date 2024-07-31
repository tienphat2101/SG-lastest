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
      toast.success("Đã xóa bài viết thành công");
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
      toast.success("Đã đăng bình luận thành công");
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
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setSelectedImage("");
    document.body.style.overflow = 'auto'; // Khôi phục cuộn trang
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
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <div className='flex gap-2 items-start p-4 border-b border-gray-700'>
        <div className='avatar'>
          <Link to={`/profile/${postOwner.username}`} className='w-8 rounded-full overflow-hidden'>
            <div className='avatar hidden md:inline-flex'>
              <div className='w-8 rounded-full'>
                <img src={postOwner.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
          </Link>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-2 items-center'>
            <Link to={`/profile/${postOwner.username}`} className='font-bold'>
              {postOwner.fullName}
            </Link>
            <span className='text-gray-700 flex gap-1 text-sm'>
              <Link to={`/profile/${postOwner.username}`}>@{postOwner.username}</Link>
              <span>·</span>
              <span>{formattedDate}</span>
            </span>
            {isMyPost && (
              <span className='flex justify-end flex-1'>
                {!isDeleting && (
                  <FaTrash className='cursor-pointer hover:text-red-500' onClick={handleDeletePost} />
                )}
                {isDeleting && <LoadingSpinner size='sm' />}
              </span>
            )}
          </div>
          <div className='flex flex-col gap-3 overflow-hidden'>
            <span>{post.text}</span>
            {post.img && (
              <img
                src={post.img}
                className='h-80 object-contain rounded-lg border border-gray-700 cursor-pointer'
                alt=''
                onClick={() => openImageModal(post.img)}
              />
            )}
          </div>
          <div className='flex justify-between mt-3'>
            <div className='flex gap-4 items-center w-2/3 justify-between'>
              <div
                className='flex gap-1 items-center cursor-pointer group'
                onClick={() => document.getElementById("comments_modal" + post._id).showModal()}
              >
                <FaRegComment className='w-4 h-4 text-slate-500 group-hover:text-sky-400' />
                <span className='text-sm text-slate-500 group-hover:text-sky-400'>
                  {post.comments.length}
                </span>
              </div>
              <dialog id={`comments_modal${post._id}`} className='modal border-none outline-none'>
                <div className='modal-box rounded border border-gray-600'>
                  <h3 className='font-bold text-lg mb-4'>BÌNH LUẬN</h3>
                  <div className='flex flex-col gap-3 max-h-60 overflow-auto'>
                    {post.comments.length === 0 && (
                      <p className='text-gray-500 text-sm'>
                        Chưa có bình luận nào.
                      </p>
                    )}
                    {post.comments.map((comment) => (
                      <div key={comment._id} className='flex gap-2 items-start'>
                        <div className='avatar'>
                          <Link to={`/profile/${comment.user.username}`} className='w-8 rounded-full overflow-hidden'>
                            <div className='avatar hidden md:inline-flex'>
                              <div className='w-8 rounded-full'>
                                <img src={comment.user.profileImg || "/avatar-placeholder.png"} />
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className='flex flex-col flex-1'>
                          <div className='flex gap-2 items-center'>
                            <Link to={`/profile/${comment.user.username}`} className='font-bold'>
                              {comment.user.fullName}
                            </Link>
                            <span className='text-gray-700 flex gap-1 text-sm'>
                              <Link to={`/profile/${comment.user.username}`}>@{comment.user.username}</Link>
                              <span>·</span>
                              <span>{formatPostDate(comment.createdAt)}</span>
                            </span>
                          </div>
                          <div className='text-sm'>{comment.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form
                    className='flex gap-2 items-center mt-4 border-t border-gray-600 pt-2'
                    onSubmit={handlePostComment}
                  >
                    <textarea
                      className='textarea w-full p-1 rounded text-md resize-none border focus:outline-none border-gray-800'
                      placeholder='Thêm bình luận...'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                      {isCommenting ? <LoadingSpinner size='md' /> : "Đăng"}
                    </button>
                  </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                  <button className='outline-none'>đóng</button>
                </form>
              </dialog>
              <div className='flex gap-1 items-center group cursor-pointer'>
                <BiRepost className='w-6 h-6 text-slate-500 group-hover:text-green-500' />
                <span className='text-sm text-slate-500 group-hover:text-green-500'>0</span>
              </div>
              <div className='flex gap-1 items-center group cursor-pointer' onClick={handleLikePost}>
                {isLiking && <LoadingSpinner size='sm' />}
                {!isLiked && !isLiking && (
                  <FaRegHeart className='w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500' />
                )}
                {isLiked && !isLiking && (
                  <FaRegHeart className='w-4 h-4 cursor-pointer text-pink-500 ' />
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
            <div className='flex w-1/3 justify-end gap-2 items-center'>
              <FaRegBookmark className='w-4 h-4 text-slate-500 cursor-pointer' />
            </div>
          </div>
        </div>
      </div>

      {/* Modal cho hình ảnh phóng to */}
      {isImageModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div
            className='relative p-4 rounded-lg'
            style={{
              width: '70%',
              height: '70%',
              backgroundColor: '#191919',
              overflow: 'hidden', // Prevent overflow
            }}
          >
            <img
              src={selectedImage}
              ref={imageRef}
              className='absolute'
              alt='Enlarged'
              style={{
                transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
                transformOrigin: 'center center', // Center transform origin
                cursor: 'grab',
                maxWidth: '100%', // Ensure image doesn't exceed container width
                maxHeight: '100%', // Ensure image doesn't exceed container height
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              }}
              onMouseDown={handleMouseDown}
              onDoubleClick={handleDoubleClick} // Add onDoubleClick event
            />
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: '#d3d3d3',
                color: '#4a4a4a',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
                zIndex: 1000
              }}
              onClick={closeImageModal}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
