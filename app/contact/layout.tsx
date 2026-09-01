import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | CodeNestStudio",
  description:
    "Get in touch with CodeNestStudio. Contact our team about your project, book a free consultation, or ask us anything about our web development and design services.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
