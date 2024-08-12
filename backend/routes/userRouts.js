import express from "express";
import {
  followAndUnfollowUser,
  liginUser,
  logOutUser,
  myProfile,
  registerUser,
  UserProfile,
} from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", liginUser);
router.get("/logout", isAuth, logOutUser);
router.get("/me", isAuth, myProfile);
router.get("/:id", isAuth, UserProfile);
router.post("/follow/:id", isAuth, followAndUnfollowUser);

export default router;
