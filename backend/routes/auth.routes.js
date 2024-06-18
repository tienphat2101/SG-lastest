import express from "express";
import { signup ,logout,login,getMe} from '../controllers/auth.controller.js';
import { protectRoute } from "../midleware/protectRoute.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);


router.get("/me",protectRoute,getMe);

export default router;