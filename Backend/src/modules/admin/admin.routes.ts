import { Router } from "express";
import * as adminController from "./admin.controller";
import { authenticate } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";
import { getRevenueMetrics } from "./admin.revenue.controller";

const router = Router();

// All routes require authentication + admin role
router.use(authenticate, isAdmin);

// Get all users with pagination, search, and filtering
router.get("/users", adminController.getAllUsers);

// Get detailed user info with payment history
router.get("/users/:id", adminController.getUserDetails);

// Revenue metrics endpoint
router.get("/revenue", isAdmin, getRevenueMetrics);

export default router;