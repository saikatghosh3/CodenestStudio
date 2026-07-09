import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/lib/ThemeProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

async function getSiteSettings() {
  try {
    const { getSettings } = await import("@/services/siteSettingServices");
    const settings = await getSettings();
    return settings;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings?.metaTitle || "CodeNestStudio | Enterprise Web Development Agency";
  const description =
    settings?.metaDescription ||
    "We build Awwwards-winning, premium, enterprise-grade web applications. Elevate your brand with cutting-edge UI/UX design, motion graphics, and high-performance engineering.";
  const siteName = settings?.siteName || "CodeNestStudio";

  return {
    title,
    description,
    keywords: "web development, agency, enterprise, UI/UX, Next.js, Framer Motion",
    openGraph: {
      title,
      description,
      type: "website",
      url: "https://codenest-studio.example.com",
      siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${siteName} OpenGraph`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "We build Awwwards-winning, premium web applications.",
      images: ["/og-image.jpg"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-300`}>
        <ThemeProvider>
          <CustomCursor />
          <AnimatedBackground />
          <ScrollToTop />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
