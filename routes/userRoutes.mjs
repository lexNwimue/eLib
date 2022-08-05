import express from "express";
import userController from "../controllers/userController.mjs";

const router = express.Router();

router.get("/signup", userController.user_signup_get);
router.post("/signup", userController.user_signup_post);
router.get("/signin", userController.user_signin_get);
router.post("/signin", userController.user_signin_post);
// router.get('/dashboard', ensureAuthenticated, userController.user_dashboard_get);
router.get("/signout", userController.user_signout_get);

export default router;
