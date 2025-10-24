import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  orderId: string;
  paymentId: string;
  signature: string;
  amount: number;
  currency: string;
  status: "Success" | "Failed";
  plan : string;
  createdAt: Date;
  updatedAt: Date;

}

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ["Success", "Failed"], required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    plan: { 
      type: String, 
      enum: ["Daily Pass", "Weekly Pass", "Monthly Pass"], 
      required: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", paymentSchema);
