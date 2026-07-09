import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    price: { type: String, required: true },
    period: { type: String, default: "" },
    features: [{ type: String }],
    buttonText: { type: String, default: "Get Started" },
    popular: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Pricing || mongoose.model("Pricing", PricingSchema);
