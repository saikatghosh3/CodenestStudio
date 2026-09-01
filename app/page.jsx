import dynamic from "next/dynamic";
import LazySection from "@/components/ui/LazySection";
import HoneyBee from "@/components/ui/HoneyBee";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Footer from "@/components/home/Footer";
import WhatsAppWidget from "@/components/home/WhatsAppWidget";
import { getAllProjects } from "@/services/projectServices";
import { getAllCategories } from "@/services/categoryServices";
import { getAllPricing } from "@/services/pricingServices";
import { getAllReviews } from "@/services/reviewServices";
import { getSettings } from "@/services/siteSettingServices";
import { getActiveVideos } from "@/services/videoShowcaseServices";
import { getAllFrontendDesigns } from "@/services/frontendDesignServices";
import { toPlain } from "@/lib/serialize";

const Projects = dynamic(() => import("@/components/home/Projects"));
const FrontendDesigns = dynamic(() => import("@/components/home/FrontendDesigns"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const DevelopmentProcess = dynamic(() => import("@/components/home/DevelopmentProcess"));
const TechStack = dynamic(() => import("@/components/home/TechStack"));
const SuccessMetrics = dynamic(() => import("@/components/home/SuccessMetrics"));
const Industries = dynamic(() => import("@/components/home/Industries"));
const VideoShowcase = dynamic(() => import("@/components/home/VideoShowcase"));
const ClientReviews = dynamic(() => import("@/components/home/ClientReviews"));
const ConsultationCTA = dynamic(() => import("@/components/home/ConsultationCTA"));
const Pricing = dynamic(() => import("@/components/home/Pricing"));
const FAQ = dynamic(() => import("@/components/home/FAQ"));
const CTA = dynamic(() => import("@/components/home/CTA"));

async function fetchAllData() {
  const [projects, categories, pricing, reviews, settings, videos, frontendDesigns] = await Promise.allSettled([
    getAllProjects(),
    getAllCategories(),
    getAllPricing(),
    getAllReviews(),
    getSettings(),
    getActiveVideos(),
    getAllFrontendDesigns(),
  ]);

  return {
    projects: projects.status === "fulfilled" ? toPlain(projects.value) : [],
    categories: categories.status === "fulfilled" ? toPlain(categories.value) : [],
    pricing: pricing.status === "fulfilled" ? toPlain(pricing.value) : [],
    reviews: reviews.status === "fulfilled" ? toPlain(reviews.value) : [],
    settings: settings.status === "fulfilled" ? toPlain(settings.value) : null,
    videos: videos.status === "fulfilled" ? toPlain(videos.value) : [],
    frontendDesigns: frontendDesigns.status === "fulfilled" ? toPlain(frontendDesigns.value) : [],
  };
}

export default async function Home() {
  const data = await fetchAllData();

  return (
    <main>
      <HoneyBee />
      <Navbar initialSettings={data.settings} />
      <Hero />
      <About />
      <Projects initialProjects={data.projects} initialCategories={data.categories} />
      <LazySection>
        <FrontendDesigns initialDesigns={data.frontendDesigns} />
      </LazySection>
      <LazySection>
        <WhyChooseUs />
      </LazySection>
      <LazySection>
        <DevelopmentProcess />
      </LazySection>
      <LazySection>
        <TechStack />
      </LazySection>
      <LazySection>
        <SuccessMetrics />
      </LazySection>
      <LazySection>
        <Industries />
      </LazySection>
      <LazySection>
        <VideoShowcase initialVideos={data.videos} />
      </LazySection>
      <LazySection>
        <ClientReviews initialReviews={data.reviews} />
      </LazySection>
      <LazySection>
        <ConsultationCTA />
      </LazySection>
      <LazySection>
        <Pricing initialPricing={data.pricing} />
      </LazySection>
      <LazySection>
        <FAQ />
      </LazySection>
      <LazySection>
        <CTA />
      </LazySection>
      <Footer initialSettings={data.settings} />
      <WhatsAppWidget />
    </main>
  );
}
