import dbConnect from "@/lib/db";
import AboutUs from "@/models/AboutUs";
import { getCached, setCache, invalidateCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

const DEFAULT_ABOUT_US = {
  published: true,
  companyInfo: {
    title: "About CodeNestStudio",
    description:
      "CodeNestStudio is a full-service digital agency specializing in building high-performance, scalable web applications. We combine cutting-edge technology with stunning design to deliver products that drive real business results. Our team of engineers, designers, and strategists work collaboratively to turn complex ideas into elegant digital experiences.",
    vision:
      "To be the leading force in digital innovation, empowering businesses worldwide with transformative technology solutions that set new industry standards.",
    mission:
      "We exist to bridge the gap between vision and reality through world-class software engineering. Our mission is to deliver measurable impact for every client by building products that are fast, beautiful, and built to scale.",
    values:
      "Excellence in every line of code. Transparency in every interaction. Innovation without compromise. We believe great software is built with integrity, curiosity, and relentless attention to detail.",
  },
  leadership: [
    {
      name: "Ariful Islam",
      designation: "CEO & Founder",
      description:
        "Visionary leader with 10+ years of experience building enterprise-grade digital products. Passionate about technology, design, and empowering teams to do their best work.",
      image: "",
      order: 1,
    },
    {
      name: "Sakib Hasan",
      designation: "CTO",
      description:
        "Full-stack architect obsessed with performance, scalability, and clean code. Leads the technical vision and ensures every product meets the highest engineering standards.",
      image: "",
      order: 2,
    },
    {
      name: "Nusrat Jahan",
      designation: "COO",
      description:
        "Operations expert who keeps the engine running. Streamlines workflows, manages client relationships, and ensures every project is delivered on time and beyond expectations.",
      image: "",
      order: 3,
    },
  ],
  frontendTeam: {
    title: "Frontend Team",
    description:
      "Our frontend team crafts pixel-perfect, responsive, and accessible user interfaces using the latest modern web technologies. We obsess over every detail to deliver Awwwards-level experiences.",
    technologyStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
    members: [
      { name: "Tanvir Ahmed", image: "", order: 1 },
      { name: "Farhana Khan", image: "", order: 2 },
      { name: "Rafiq Hossain", image: "", order: 3 },
    ],
  },
  backendTeam: {
    title: "Backend Team",
    description:
      "Our backend engineers build robust, secure, and scalable server-side architectures. From REST APIs to microservices, we ensure your data flows seamlessly and safely.",
    technologyStack: ["Node.js", "Express.js", "Python", "MongoDB", "PostgreSQL", "Redis"],
    members: [
      { name: "Kamal Uddin", image: "", order: 1 },
      { name: "Sumaiya Begum", image: "", order: 2 },
    ],
  },
  qaTeam: {
    title: "QA Team",
    description:
      "Quality is non-negotiable. Our QA team ensures every feature works flawlessly across all devices and browsers through rigorous manual and automated testing processes.",
    technologyStack: ["Jest", "Cypress", "Playwright", "Postman", "Selenium", "TestRail"],
    members: [
      { name: "Mizanur Rahman", image: "", order: 1 },
      { name: "Taslima Akter", image: "", order: 2 },
    ],
  },
  devopsTeam: {
    title: "DevOps Team",
    description:
      "Our DevOps team builds and maintains the infrastructure that keeps your applications running at peak performance. We automate everything from CI/CD to monitoring and scaling.",
    technologyStack: ["Docker", "AWS", "Vercel", "GitHub Actions", "Terraform", "Nginx"],
    members: [
      { name: "Zahidul Islam", image: "", order: 1 },
      { name: "Ruma Khatun", image: "", order: 2 },
    ],
  },
};

export async function getAboutUs() {
  const cached = getCached(CACHE_KEYS.ABOUT_US);
  if (cached && !cached.stale) return cached.data;

  try {
    await dbConnect();
    let about = await AboutUs.findOne().lean();
    if (!about) {
      about = await AboutUs.create(DEFAULT_ABOUT_US);
      about = about.toObject();
    }
    setCache(CACHE_KEYS.ABOUT_US, about, CACHE_TTL.LONG);
    return about;
  } catch (error) {
    if (cached) return cached.data;
    throw error;
  }
}

export async function updateAboutUs(data) {
  await dbConnect();
  let about = await AboutUs.findOne();
  if (!about) {
    about = await AboutUs.create({ ...DEFAULT_ABOUT_US, ...data });
  } else {
    Object.assign(about, data);
    await about.save();
  }
  invalidateCache(CACHE_KEYS.ABOUT_US);
  return about.toObject();
}
