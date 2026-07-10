import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import WhatsAppWidget from "@/components/home/WhatsAppWidget";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ROIImpact from "@/components/home/ROIImpact";
import DevelopmentProcess from "@/components/home/DevelopmentProcess";
import ProjectTimeline from "@/components/home/ProjectTimeline";
import TechStack from "@/components/home/TechStack";
import SuccessMetrics from "@/components/home/SuccessMetrics";
import Industries from "@/components/home/Industries";
import VideoShowcase from "@/components/home/VideoShowcase";
import ClientReviews from "@/components/home/ClientReviews";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import { getAllProjects } from "@/services/projectServices";
import { getAllCategories } from "@/services/categoryServices";
import { getAllPricing } from "@/services/pricingServices";
import { getAllReviews } from "@/services/reviewServices";
import { getSettings } from "@/services/siteSettingServices";
import { getActiveVideos } from "@/services/videoShowcaseServices";

async function fetchAllData() {
  const [projects, categories, pricing, reviews, settings, videos] = await Promise.allSettled([
    getAllProjects(),
    getAllCategories(),
    getAllPricing(),
    getAllReviews(),
    getSettings(),
    getActiveVideos(),
  ]);

  return {
    projects: projects.status === "fulfilled" ? projects.value : [],
    categories: categories.status === "fulfilled" ? categories.value : [],
    pricing: pricing.status === "fulfilled" ? pricing.value : [],
    reviews: reviews.status === "fulfilled" ? reviews.value : [],
    settings: settings.status === "fulfilled" ? settings.value : null,
    videos: videos.status === "fulfilled" ? videos.value : [],
  };
}

export default async function Home() {
  const data = await fetchAllData();

  return (
    <main>
      <Navbar initialSettings={data.settings} />
      <Hero />
      <About />
      <Projects initialProjects={data.projects} initialCategories={data.categories} />
      <WhyChooseUs />
      <ROIImpact />
      <DevelopmentProcess />
      <ProjectTimeline />
      <TechStack />
      <SuccessMetrics />
      <Industries />
      <VideoShowcase initialVideos={data.videos} />
      <ClientReviews initialReviews={data.reviews} />
      <ConsultationCTA />
      <Pricing initialPricing={data.pricing} />
      <FAQ />
      <CTA />
      <Footer initialSettings={data.settings} />
      <WhatsAppWidget />
    </main>
  );
}
