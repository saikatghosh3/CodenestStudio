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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <WhyChooseUs />
      <ROIImpact />
      <DevelopmentProcess />
      <ProjectTimeline />
      <TechStack />
      <SuccessMetrics />
      <Industries />
      <VideoShowcase />
      <ClientReviews />
      <ConsultationCTA />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppWidget />
    </main>
  );
}
