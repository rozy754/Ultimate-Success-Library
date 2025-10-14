import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import env  from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import paymentRoutes from "./modules/payment/route";
import subscriptionRoutes from "./modules/subscription/route";
import { includes } from "zod";
export const app = express();

// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

// Routes
// Remove authenticate and errorHandler from this mount.
// They should not run for every /api/auth request by default.
app.use("/api/auth", authRoutes);

// payment routes
app.use("/api/payment", paymentRoutes);

//subscription routes
app.use("/api/subscription", subscriptionRoutes);

// TODO: add routes later in Step 4
app.get("/", (_req, res) => {
  res.send("Welcome to the API 🚀");
});

// 404 handler (Express 5 + path-to-regexp v6: "*" pattern invalid)
// Use a naked middleware to catch any unmatched route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

// Register your central error handler AFTER all routes.
app.use(errorHandler);

// Basic error handler (optional but recommended)
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
})

export default app;