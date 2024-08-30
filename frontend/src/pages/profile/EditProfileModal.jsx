import { useEffect, useState } from "react";
import useUpdateUserProfile from "../../hooks/useUpdateUserProfile";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });
  const [error, setError] = useState(""); // State to store error messages

  const { updateProfile, isUpdatingProfile } = useUpdateUserProfile();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for username to prevent spaces
    if (name === "username" && value.includes(" ")) {
      setError("Username cannot contain spaces.");
    } else {
      setError(""); // Clear error if valid
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username.includes(" ")) {
      setError("Username cannot contain spaces.");
    } else {
      setError(""); // Clear error if valid
      updateProfile(formData);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm text-gray-300 border-gray-600 hover:bg-gray-700"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box bg-gray-800 border rounded-md border-gray-700 shadow-md text-gray-200">
          <h3 className="font-bold text-lg my-3 text-gray-100">
            Update Profile
          </h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-400">{error}</p>}
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
                style={{ resize: "none" }} // Thêm dòng này
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 input bg-gray-700 border border-gray-600 rounded p-2 input-md text-gray-200 placeholder-gray-400"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <button
              className="btn rounded-full btn-sm text-gray-800 hover:bg-green-500"
              style={{ backgroundColor: "#87df2c" }}
            >
              {isUpdatingProfile ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};

export default EditProfileModal;
