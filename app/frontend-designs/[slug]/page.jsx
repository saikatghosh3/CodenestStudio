import { notFound } from "next/navigation";
import { ArrowLeft, Star, Calendar, Tag } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import ProjectGallery from "@/components/ui/ProjectGallery";
import ProjectActions from "@/components/ui/ProjectActions";
import { getFrontendDesignBySlug } from "@/services/frontendDesignServices";
import { toPlain } from "@/lib/serialize";

function normalizeDesign(raw) {
  const design = { ...raw };
  if (typeof design.technologies === "string") {
    design.technologies = design.technologies
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(design.technologies)) {
    design.technologies = design.technologies || [];
  }
  if (typeof design.images === "string") {
    design.images = design.images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (!Array.isArray(design.images)) {
    design.images = design.images || [];
  }
  return design;
}

export async function generateMetadata({ params }) {
  try {
    const raw = await getFrontendDesignBySlug(params.slug);
    if (!raw) return {};
    const design = normalizeDesign(toPlain(raw));
    return {
      title: `${design.title} | CodeNestStudio`,
      description: design.description,
      openGraph: {
        title: `${design.title} | CodeNestStudio`,
        description: design.description,
        type: "website",
        images: design.thumbnail ? [{ url: design.thumbnail }] : [],
      },
    };
  } catch {
    return {};
  }
}

export default async function FrontendDesignDetail({ params }) {
  let design;
  try {
    const raw = await getFrontendDesignBySlug(params.slug);
    design = raw ? normalizeDesign(toPlain(raw)) : null;
  } catch {
    design = null;
  }

  if (!design) {
    notFound();
  }

  const allImages = [design.thumbnail, ...(design.images || [])].filter(Boolean);

  return (
    <main>
      <Navbar />
      <div className="relative min-h-screen pt-24 sm:pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-background to-background pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <a
            href="/frontend-designs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-8"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Frontend Designs
          </a>

          {design.thumbnail && (
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-14 bg-card border border-border shadow-xl">
              <div className="aspect-[21/9] max-h-[500px]">
                <img
                  src={design.thumbnail}
                  alt={design.title}
                  width={1200}
                  height={514}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {design.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-1.5 bg-background/60 backdrop-blur-md border border-border/50 text-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                  Featured
                </div>
              )}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-14">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                  <Tag className="h-3 w-3" />
                  {design.category}
                </span>
                {design.createdAt && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(design.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-6 leading-tight">
                {design.title}
              </h1>

              <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {design.description}
                </p>
              </div>

              {allImages.length > 1 && (
                <ProjectGallery images={allImages} title={design.title} />
              )}
            </div>

            <ProjectActions project={design} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
