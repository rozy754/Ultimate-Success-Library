import Subscription, { ISubscription } from "./model";
import User from "../users/user.model";
import mongoose from "mongoose";

/**
 * Get the user's current subscription (with real-time expiry check)
 */
export const getCurrentSubscription = async (
  userId: mongoose.Types.ObjectId
): Promise<ISubscription | null> => {
  let subscription = await Subscription.findOne({ userId }).sort({ createdAt: -1 });

  if (!subscription) return null;

  const now = new Date();

  // Case 1: Agar expiry date cross ho gayi aur abhi bhi Active hai → expire it
  if (subscription.expiryDate < now && subscription.status === "Active") {
    subscription.status = "Expired";
    await subscription.save();
  }

  // Case 2: Agar status Expired hai (manually ya automatically) → user ka currentSubscription null kar do
  if (subscription.status === "Expired") {
    await User.findByIdAndUpdate(userId, { currentSubscription: null });
  }

  return subscription; // Return the modified subscription directly
};

/**
 * Update subscription status manually (Admin use-case)
 */
export const updateSubscriptionStatus = async (
  subscriptionId: string,
  status: "Active" | "Expired"
): Promise<ISubscription | null> => {
  const subscription = await Subscription.findByIdAndUpdate(subscriptionId, { status }, { new: true });
  
  // If subscription is being marked as expired, also update user's currentSubscription
  if (subscription && status === "Expired") {
    await User.findByIdAndUpdate(subscription.userId, { currentSubscription: null });
  }
  
  return subscription;
};

/**
 * Calculate days remaining for a subscription
 */
export const calculateDaysRemaining = (expiryDate: Date): number => {
  const now = new Date();
  const diff = expiryDate.getTime() - now.getTime();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
};

