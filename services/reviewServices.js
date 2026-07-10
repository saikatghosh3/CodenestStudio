import dbConnect from "@/lib/db";
import Review from "@/models/Review";
import { getCached, setCache, invalidateCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

export async function getAllReviews() {
  const cached = getCached(CACHE_KEYS.REVIEWS);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    setCache(CACHE_KEYS.REVIEWS, reviews, CACHE_TTL.LONG);
    return reviews;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getAllReviewsAdmin() {
  const cached = getCached(CACHE_KEYS.REVIEWS_ADMIN);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    setCache(CACHE_KEYS.REVIEWS_ADMIN, reviews, CACHE_TTL.SHORT);
    return reviews;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function getReviewById(id) {
  await dbConnect();
  return Review.findById(id).lean();
}

export async function createReview(data) {
  await dbConnect();
  const review = await Review.create(data);
  invalidateCache(/^reviews/);
  return review.toObject();
}

export async function updateReview(id, data) {
  await dbConnect();
  const review = await Review.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  invalidateCache(/^reviews/);
  return review;
}

export async function deleteReview(id) {
  await dbConnect();
  const review = await Review.findByIdAndDelete(id).lean();
  invalidateCache(/^reviews/);
  return review;
}
