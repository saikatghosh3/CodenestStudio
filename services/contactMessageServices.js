import dbConnect from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";

export async function getAllMessages() {
  await dbConnect();
  return ContactMessage.find().sort({ createdAt: -1 }).lean();
}

export async function getUnreadCount() {
  await dbConnect();
  return ContactMessage.countDocuments({ read: false });
}

export async function createMessage(data) {
  await dbConnect();
  const message = await ContactMessage.create(data);
  return message.toObject();
}

export async function markRead(id) {
  await dbConnect();
  return ContactMessage.findByIdAndUpdate(id, { read: true }, { new: true }).lean();
}

export async function deleteMessage(id) {
  await dbConnect();
  return ContactMessage.findByIdAndDelete(id).lean();
}
