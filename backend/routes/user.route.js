import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { 
    followUnfollowUser, 
    getSuggestedUsers, 
    getUserProfile, 
    updateUser, 
    searchUsers, 
    getFollowingList,
    getFollowersList // Thêm phương thức mới để lấy danh sách người theo dõi
} from "../controllers/user.controller.js";

const router = express.Router();

// Đã có route cho profile
router.get("/profile/:username", protectRoute, getUserProfile);

// Đã có route để lấy danh sách người dùng gợi ý
router.get("/suggested", protectRoute, getSuggestedUsers);

// Đã có route để theo dõi và bỏ theo dõi người dùng
router.post("/follow/:id", protectRoute, followUnfollowUser);

// Đã có route để cập nhật thông tin người dùng
router.post("/update", protectRoute, updateUser);

// Đã có route để tìm kiếm người dùng
router.get("/search", protectRoute, searchUsers);

// Thêm route để lấy danh sách người đang theo dõi
router.get("/:userId/following", protectRoute, getFollowingList);

// Thêm route để lấy danh sách người theo dõi
router.get("/:userId/followers", protectRoute, getFollowersList);

export default router;
