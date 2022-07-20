import express from "express";
import adminDashboardController from "../controllers/adminDashboardController.mjs";
import userDashboardController from "../controllers/userDashboardController.mjs";

const router = express.Router();

// Admin dashboard routes
router.get("/admin", adminDashboardController.view_dashboard);
router.get("/view-users", adminDashboardController.view_user_get);
router.get("/view-books/:id", adminDashboardController.view_book_get);
router.post("/view-books/:id", adminDashboardController.edit_book_post);
router.get("/view-books", adminDashboardController.view_all_books_get);
router.post("/add-book", adminDashboardController.add_book_post);
router.post("/delete-book", adminDashboardController.delete_book_post);
router.get("/requests/:id", adminDashboardController.view_specific_request);
router.get("/requests", adminDashboardController.view_requests);
router.post("/approve-request", adminDashboardController.approve_request);

// Routes for User Dashboard
router.get("/user", userDashboardController.user_dashboard_get);
router.get("/user/view-books", userDashboardController.user_view_books_get);
router.get(
  "/user/view-requests",
  userDashboardController.user_view_requests_get
);
router.post(
  "/user/send-request",
  userDashboardController.user_send_request_post
);
router.post(
  "/user/cancel-request",
  userDashboardController.user_cancel_request_delete
);

export default router;
