import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { _id: true });

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, default: "" },
  order: { type: Number, default: 0 },
}, { _id: true });

const teamSectionSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  technologyStack: [{ type: String }],
  members: [teamMemberSchema],
}, { _id: true });

const aboutUsSchema = new mongoose.Schema(
  {
    published: { type: Boolean, default: true },
    companyInfo: {
      title: { type: String, default: "About CodeNestStudio" },
      description: { type: String, default: "" },
      vision: { type: String, default: "" },
      mission: { type: String, default: "" },
      values: { type: String, default: "" },
    },
    leadership: [leaderSchema],
    frontendTeam: teamSectionSchema,
    backendTeam: teamSectionSchema,
    qaTeam: teamSectionSchema,
    devopsTeam: teamSectionSchema,
  },
  { timestamps: true }
);

export default mongoose.models.AboutUs || mongoose.model("AboutUs", aboutUsSchema);
