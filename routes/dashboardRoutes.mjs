import express from "express";
import adminDashboardController from "../controllers/adminDashboardController.mjs";
import userDashboardController from "../controllers/userDashboardController.mjs";
import {
  ensureAuthentication,
  ensureAdminAuthentication,
} from "./middleware/ensureAuthentication.js";

const router = express.Router();

// Admin dashboard routes
router.get(
  "/admin",
  ensureAdminAuthentication,
  adminDashboardController.view_dashboard
);
router.get(
  "/view-users",
  ensureAdminAuthentication,
  adminDashboardController.view_user_get
);
router.get(
  "/view-books/:id",
  ensureAdminAuthentication,
  adminDashboardController.view_book_get
);
router.post(
  "/view-books/:id",
  ensureAdminAuthentication,
  adminDashboardController.edit_book_post
);
router.get(
  "/view-books",
  ensureAdminAuthentication,
  adminDashboardController.view_all_books_get
);
router.post(
  "/add-book",
  ensureAdminAuthentication,
  adminDashboardController.add_book_post
);
router.post(
  "/delete-book",
  ensureAdminAuthentication,
  adminDashboardController.delete_book_post
);
router.get(
  "/requests/:id",
  ensureAdminAuthentication,
  adminDashboardController.view_specific_request
);
router.get(
  "/requests",
  ensureAdminAuthentication,
  adminDashboardController.view_requests
);
router.post(
  "/approve-request",
  ensureAdminAuthentication,
  adminDashboardController.approve_request
);

// Routes for User Dashboard
router.get(
  "/user",
  ensureAuthentication,
  userDashboardController.user_dashboard_get
);
router.get(
  "/user/view-books",
  ensureAuthentication,
  userDashboardController.user_view_books_get
);
router.get(
  "/user/view-requests",
  ensureAuthentication,
  userDashboardController.user_view_requests_get
);
router.post(
  "/user/send-request",
  ensureAuthentication,
  userDashboardController.user_send_request_post
);
router.post(
  "/user/cancel-request",
  ensureAuthentication,
  userDashboardController.user_cancel_request_delete
);

export default router;
