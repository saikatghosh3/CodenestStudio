import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | CodeNestStudio",
  description:
    "Learn about CodeNestStudio - our vision, mission, values, leadership team, and the talented engineers behind our world-class digital products.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
