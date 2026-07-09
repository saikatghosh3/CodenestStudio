import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "CodeNestStudio" },
    brandName: { type: String, default: "CodeNestStudio" },
    logo: { type: String, default: "" },
    metaTitle: { type: String, default: "CodeNestStudio | Enterprise Web Development Agency" },
    metaDescription: {
      type: String,
      default:
        "We build Awwwards-winning, premium, enterprise-grade web applications. Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering.",
    },
    footerDescription: {
      type: String,
      default:
        "We build Awwwards-winning, premium, enterprise-grade web applications. Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering.",
    },
    email: { type: String, default: "codersync9@gmail.com" },
    phone: { type: String, default: "+880 1758197272" },
    whatsappNumber: { type: String, default: "8801758197272" },
    address: { type: String, default: "Dhaka, Bangladesh" },
    copyright: { type: String, default: "CodeNestStudio. Crafted with precision." },
    socialLinks: [
      {
        platform: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model("SiteSetting", siteSettingSchema);
