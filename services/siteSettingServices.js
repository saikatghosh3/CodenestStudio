import dbConnect from "@/lib/db";
import SiteSetting from "@/models/SiteSetting";

const DEFAULT_SETTINGS = {
  siteName: "CodeNestStudio",
  brandName: "CodeNestStudio",
  logo: "",
  metaTitle: "CodeNestStudio | Enterprise Web Development Agency",
  metaDescription:
    "We build Awwwards-winning, premium, enterprise-grade web applications. Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering.",
  footerDescription:
    "We build Awwwards-winning, premium, enterprise-grade web applications. Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering.",
  email: "codersync9@gmail.com",
  phone: "+880 1758197272",
  whatsappNumber: "8801758197272",
  address: "Dhaka, Bangladesh",
  copyright: "CodeNestStudio. Crafted with precision.",
  socialLinks: [
    { platform: "Github", url: "#" },
    { platform: "Twitter", url: "#" },
    { platform: "Linkedin", url: "#" },
    { platform: "Dribbble", url: "#" },
  ],
};

export async function getSettings() {
  await dbConnect();
  let settings = await SiteSetting.findOne().lean();
  if (!settings) {
    settings = await SiteSetting.create(DEFAULT_SETTINGS);
    settings = settings.toObject();
  }
  return settings;
}

export async function updateSettings(data) {
  await dbConnect();
  let settings = await SiteSetting.findOne();
  if (!settings) {
    settings = await SiteSetting.create({ ...DEFAULT_SETTINGS, ...data });
  } else {
    Object.assign(settings, data);
    await settings.save();
  }
  return settings.toObject();
}
