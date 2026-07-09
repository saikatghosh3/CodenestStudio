import dbConnect from "@/lib/db";
import VideoShowcase from "@/models/VideoShowcase";

const DEFAULT_VIDEO = {
  title: "Project Showreel",
  videoUrl: "https://drive.google.com/file/d/1WkV-Se3bpsmCyZfwk9nQEFCA2vmkqvTh/preview",
  fallbackImage: "",
  isActive: true,
};

export async function getActiveVideos() {
  await dbConnect();
  let videos = await VideoShowcase.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  if (videos.length === 0) {
    videos = [await VideoShowcase.create(DEFAULT_VIDEO)];
    videos = videos.map((v) => (v.toObject ? v.toObject() : v));
  }
  return videos;
}

export async function getAllVideos() {
  await dbConnect();
  let videos = await VideoShowcase.find().sort({ createdAt: -1 }).lean();
  if (videos.length === 0) {
    videos = [await VideoShowcase.create(DEFAULT_VIDEO)];
    videos = videos.map((v) => (v.toObject ? v.toObject() : v));
  }
  return videos;
}

export async function getVideoById(id) {
  await dbConnect();
  return VideoShowcase.findById(id).lean();
}

export async function createVideo(data) {
  await dbConnect();
  const video = await VideoShowcase.create(data);
  return video.toObject();
}

export async function updateVideo(id, data) {
  await dbConnect();
  return VideoShowcase.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deleteVideo(id) {
  await dbConnect();
  return VideoShowcase.findByIdAndDelete(id).lean();
}
