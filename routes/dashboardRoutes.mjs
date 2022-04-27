import express from "express";
import adminDashboardController from "../controllers/adminDashboardController.mjs";
import userDashboardController from "../controllers/userDashboardController.mjs";
import { ensureAuthenticated } from "../config/auth.mjs";

const router = express.Router();

// Admin dashboard routes
router.get("/admin", ensureAuthenticated, adminDashboardController.view_dashboard);
router.get("/view-users", ensureAuthenticated, adminDashboardController.view_user_get);
router.get("/view-books/:id", ensureAuthenticated, adminDashboardController.view_book_get);
router.post("/view-books/:id", ensureAuthenticated, adminDashboardController.edit_book_post);
router.get("/view-books", ensureAuthenticated, adminDashboardController.view_all_books_get);
router.post("/add-book", ensureAuthenticated, adminDashboardController.add_book_post);
router.post("/delete-book", ensureAuthenticated, adminDashboardController.delete_book_post);
router.get("/requests/:id", ensureAuthenticated, adminDashboardController.view_specific_request);
router.get("/requests", ensureAuthenticated, adminDashboardController.view_requests);
router.post('/approve-request', ensureAuthenticated, adminDashboardController.approve_request);


// Routes for User Dashboard
router.get("/user", ensureAuthenticated, userDashboardController.user_dashboard_get);
router.get("/user/view-books", ensureAuthenticated, userDashboardController.user_view_books_get);
router.get("/user/view-requests", ensureAuthenticated, userDashboardController.user_view_requests_get);
router.post("/user/send-request", ensureAuthenticated, userDashboardController.user_send_request_post);
router.post('/user/cancel-request', ensureAuthenticated, userDashboardController.user_cancel_request_delete);

export default router;
