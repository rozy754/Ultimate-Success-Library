import { Request, Response } from "express";
import * as subscriptionService from "./service";
import mongoose from "mongoose";

/**
 * Get current subscription (real-time expiry check included)
 */
export const getCurrentSubscription = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const subscription = await subscriptionService.getCurrentSubscription(
      new mongoose.Types.ObjectId(userId)
    );

    if (!subscription) {
      return res.json({ subscription: null, daysRemaining: 0 });
    }

let daysRemaining = subscriptionService.calculateDaysRemaining(subscription.expiryDate);
if (subscription.status === "Expired") {
  daysRemaining = 0;
}
res.json({ subscription, daysRemaining });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update subscription status (admin use-case)
 */
export const updateSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ error: "Subscription ID and status are required" });
    }

    const subscription = await subscriptionService.updateSubscriptionStatus(id, status);

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.json({
      success: true,
      message: "Subscription status updated",
      subscription,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
