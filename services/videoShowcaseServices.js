import dbConnect from "@/lib/db";
import VideoShowcase from "@/models/VideoShowcase";
import { getCached, setCache, invalidateCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

const DEFAULT_VIDEO = {
  title: "Project Showreel",
  videoUrl: "https://drive.google.com/file/d/1WkV-Se3bpsmCyZfwk9nQEFCA2vmkqvTh/preview",
  fallbackImage: "",
  isActive: true,
};

function normalizeVideo(v) {
  const raw = v.toObject ? v.toObject() : v;
  return {
    ...raw,
    _id: String(raw._id),
    fallbackImage: raw.fallbackImage || raw.thumbnail || "",
    thumbnail: raw.thumbnail || raw.fallbackImage || "",
  };
}

export async function getActiveVideos() {
  const cached = getCached(CACHE_KEYS.VIDEOS_ACTIVE);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    let videos = await VideoShowcase.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    if (videos.length === 0) {
      videos = [await VideoShowcase.create(DEFAULT_VIDEO)];
    }
    videos = videos.map(normalizeVideo);
    setCache(CACHE_KEYS.VIDEOS_ACTIVE, videos, CACHE_TTL.LONG);
    return videos;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getAllVideos() {
  const cached = getCached(CACHE_KEYS.VIDEOS);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    let videos = await VideoShowcase.find().sort({ createdAt: -1 }).lean();
    if (videos.length === 0) {
      videos = [await VideoShowcase.create(DEFAULT_VIDEO)];
    }
    videos = videos.map(normalizeVideo);
    setCache(CACHE_KEYS.VIDEOS, videos, CACHE_TTL.MEDIUM);
    return videos;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getVideoById(id) {
  await dbConnect();
  return VideoShowcase.findById(id).lean();
}

export async function createVideo(data) {
  await dbConnect();
  const video = await VideoShowcase.create(data);
  invalidateCache(/^videos/);
  return video.toObject();
}

export async function updateVideo(id, data) {
  await dbConnect();
  const video = await VideoShowcase.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  invalidateCache(/^videos/);
  return video;
}

export async function deleteVideo(id) {
  await dbConnect();
  const video = await VideoShowcase.findByIdAndDelete(id).lean();
  invalidateCache(/^videos/);
  return video;
}
