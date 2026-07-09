"use client";

import { useState } from "react";
import { MessageSquare, X } from "lucide-react";

const WHATSAPP_NUMBER = "8801758197272";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim() || "হ্যালো, আমি আপনার সাথে একটি ওয়েবসাইট প্রজেক্ট নিয়ে আলোচনা করতে চাই।";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-6 sm:right-4 md:bottom-8 md:right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup Chat */}
      {isOpen && (
        <div className="w-[300px] sm:w-[340px] rounded-3xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-5 py-4 border-b border-border/60 bg-emerald-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">WhatsApp</p>
                <p className="text-xs text-emerald-100/90">সরাসরি যোগাযোগ করুন</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg hover:bg-white/10 dark:hover:bg-white/10 p-1.5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 space-y-3">
            <div className="relative flex items-center rounded-full border border-border bg-background px-4 py-2.5 shadow-sm">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="আপনার প্রজেক্ট লিখুন..."
                className="w-full border-none bg-transparent text-sm text-foreground focus:outline-none"
              />
              <button
                type="button"
                onClick={handleSend}
                className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all duration-300 hover:scale-110"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    </div>
  );
}
