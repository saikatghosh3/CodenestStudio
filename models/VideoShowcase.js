import mongoose from "mongoose";

const VideoShowcaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true, trim: true },
    thumbnail: { type: String, default: "" },
    fallbackImage: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.VideoShowcase || mongoose.model("VideoShowcase", VideoShowcaseSchema);
