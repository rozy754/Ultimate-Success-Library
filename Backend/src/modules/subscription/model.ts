import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  plan: "Daily Pass" | "Weekly Pass" | "Monthly Pass";
  status: "Active" | "Expired";
  startDate: Date;
  expiryDate: Date;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["Daily Pass", "Weekly Pass", "Monthly Pass"], required: true },
    status: { type: String, enum: ["Active", "Expired"], default: "Active" },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    razorpaySignature: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISubscription>("Subscription", subscriptionSchema);
