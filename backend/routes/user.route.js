import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, updateUser, searchUsers, getFollowingList } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);
router.get("/search", protectRoute, searchUsers); // Thêm route tìm kiếm người dùng
router.get("/:userId/following", protectRoute, getFollowingList); // Thêm route lấy danh sách người theo dõi

export default router;
