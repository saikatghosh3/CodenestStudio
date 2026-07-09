export const SERVICES_DATA = [
  {
    title: "Modern UI/UX Design",
    slug: "ui-ux-design",
    shortDesc: "Delightful interfaces that convert.",
    longDesc:
      "We craft intuitive, visually compelling interfaces that captivate users and drive conversions. Our design process combines aesthetic excellence with deep usability research, ensuring every pixel serves a purpose. From wireframes to high-fidelity prototypes, we create seamless digital experiences that users love.",
    benefits: [
      "User research & persona development",
      "Wireframing & interactive prototyping",
      "High-fidelity visual design",
      "Design system & component libraries",
      "Usability testing & iteration",
      "Accessibility-first approach",
    ],
    process: [
      { step: "Discovery", desc: "We analyze your users, brand, and goals through workshops and research." },
      { step: "Design", desc: "From wireframes to pixel-perfect mockups, we refine every interaction." },
      { step: "Validate", desc: "Usability testing ensures the design resonates with your audience." },
      { step: "Deliver", desc: "Production-ready assets and design handoff for seamless development." },
    ],
    icon: "Feather",
  },
  {
    title: "Clean & Scalable Code",
    slug: "clean-scalable-code",
    shortDesc: "Maintainable code and architecture.",
    longDesc:
      "Our engineering philosophy is built on writing clean, modular, and scalable code. We follow industry best practices, design patterns, and rigorous code reviews to ensure your product can grow without technical debt. Every line is crafted for performance, readability, and long-term maintainability.",
    benefits: [
      "Modular component architecture",
      "Type-safe development with TypeScript",
      "Automated testing & CI/CD pipelines",
      "Performance-optimized builds",
      "Comprehensive documentation",
      "Scalable API & database design",
    ],
    process: [
      { step: "Plan", desc: "Architecture design and technology selection aligned with your scale." },
      { step: "Build", desc: "Iterative development with regular code reviews and quality gates." },
      { step: "Test", desc: "Automated unit, integration, and end-to-end testing." },
      { step: "Deploy", desc: "CI/CD pipeline with monitoring and rollback capabilities." },
    ],
    icon: "Code2",
  },
  {
    title: "SEO Optimized",
    slug: "seo-optimized",
    shortDesc: "Built for visibility and speed.",
    longDesc:
      "We build your online presence with search engines in mind from day one. Our SEO-first approach ensures your site ranks higher, loads faster, and reaches the right audience. We implement technical SEO, content strategy, and performance optimization as integral parts of the development process.",
    benefits: [
      "Semantic HTML & structured data markup",
      "Server-side rendering & static generation",
      "Core Web Vitals optimization",
      "Automated sitemaps & robots.txt",
      "Meta tag & Open Graph management",
      "Analytics integration & tracking",
    ],
    process: [
      { step: "Audit", desc: "Analyze current SEO standing and identify opportunities." },
      { step: "Optimize", desc: "Implement technical SEO, performance tweaks, and content structure." },
      { step: "Monitor", desc: "Track rankings, traffic, and user behavior with analytics." },
      { step: "Iterate", desc: "Continuous improvement based on data and algorithm updates." },
    ],
    icon: "Globe",
  },
  {
    title: "Responsive on Every Device",
    slug: "responsive-design",
    shortDesc: "Pixel-perfect across screens.",
    longDesc:
      "Your users access your product from desktops, tablets, and phones. We ensure a flawless experience on every screen size with responsive design that adapts intelligently. Our approach guarantees your brand looks professional and functions perfectly regardless of the device.",
    benefits: [
      "Mobile-first responsive design",
      "Fluid grids & flexible layouts",
      "Adaptive typography & spacing",
      "Touch-optimized interactions",
      "Cross-browser compatibility",
      "Device-specific performance tuning",
    ],
    process: [
      { step: "Strategy", desc: "Define breakpoints and responsive behavior for all device types." },
      { step: "Design", desc: "Create fluid layouts that adapt gracefully to any viewport." },
      { step: "Build", desc: "Develop with responsive utilities and test on real devices." },
      { step: "QA", desc: "Rigorous cross-device, cross-browser quality assurance." },
    ],
    icon: "Cpu",
  },
  {
    title: "Fast Delivery",
    slug: "fast-delivery",
    shortDesc: "Reliable timelines and rapid delivery.",
    longDesc:
      "We respect your time and budget. Our agile workflows, clear milestones, and transparent communication ensure your project ships on schedule without compromising quality. We break complex projects into manageable sprints, delivering value incrementally from day one.",
    benefits: [
      "Agile sprint-based delivery",
      "Weekly progress reports & demos",
      "MVP launch in as little as 2 weeks",
      "Dedicated project manager",
      "Transparent timeline tracking",
      "Post-launch support & handover",
    ],
    process: [
      { step: "Scope", desc: "Define clear deliverables, timelines, and milestones together." },
      { step: "Build", desc: "Work in focused sprints with regular checkpoints and demos." },
      { step: "Review", desc: "Continuous feedback loops to keep the project on track." },
      { step: "Launch", desc: "Production deployment with full testing and monitoring." },
    ],
    icon: "Zap",
  },
  {
    title: "Long-Term Support",
    slug: "long-term-support",
    shortDesc: "Ongoing maintenance and growth.",
    longDesc:
      "Launching your product is just the beginning. We provide ongoing maintenance, feature updates, and performance monitoring to keep your application secure, fast, and relevant. Our support ensures your investment grows with your business over the long term.",
    benefits: [
      "24/7 monitoring & incident response",
      "Regular security patches & updates",
      "Performance optimization & audits",
      "Feature development & enhancements",
      "Backup & disaster recovery",
      "Priority support with SLA guarantee",
    ],
    process: [
      { step: "Monitor", desc: "Proactive monitoring for performance, security, and uptime." },
      { step: "Maintain", desc: "Regular updates, patches, and dependency management." },
      { step: "Improve", desc: "Continuous feature enhancements based on user feedback." },
      { step: "Scale", desc: "Architecture upgrades to handle growth and increased load." },
    ],
    icon: "LifeBuoy",
  },
];

export function getServiceBySlug(slug) {
  return SERVICES_DATA.find((s) => s.slug === slug) || null;
}
