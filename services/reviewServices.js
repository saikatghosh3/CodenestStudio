import dbConnect from "@/lib/db";
import Review from "@/models/Review";

export async function getAllReviews() {
  await dbConnect();
  const reviews = await Review.find({ isActive: true }).sort({ createdAt: -1 }).lean();
  return reviews;
}

export async function getAllReviewsAdmin() {
  await dbConnect();
  const reviews = await Review.find().sort({ createdAt: -1 }).lean();
  return reviews;
}

export async function getReviewById(id) {
  await dbConnect();
  return Review.findById(id).lean();
}

export async function createReview(data) {
  await dbConnect();
  const review = await Review.create(data);
  return review.toObject();
}

export async function updateReview(id, data) {
  await dbConnect();
  return Review.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deleteReview(id) {
  await dbConnect();
  return Review.findByIdAndDelete(id).lean();
}
