import dbConnect from "@/lib/db";
import Pricing from "@/models/Pricing";

const DEFAULT_PLANS = [
  {
    name: "Starter",
    subtitle: "Perfect for small businesses",
    price: "$999",
    period: "starting at",
    features: [
      "Custom Landing Page",
      "Responsive Design",
      "Basic CMS Integration",
      "Contact Form & Leads",
      "SEO Optimization",
      "1 Month Support",
    ],
    buttonText: "Start Project",
    popular: false,
    order: 1,
    isActive: true,
  },
  {
    name: "Professional",
    subtitle: "Ideal for growing companies",
    price: "Custom",
    period: "quote based",
    features: [
      "Full Web Application",
      "E-commerce Ecosystem",
      "Advanced Animations",
      "Custom Admin Panel",
      "Analytics Setup",
      "3 Months Support",
    ],
    buttonText: "Get Quote",
    popular: true,
    order: 2,
    isActive: true,
  },
  {
    name: "Enterprise",
    subtitle: "Large scale & corporate",
    price: "Let's Talk",
    period: "tailored pricing",
    features: [
      "SaaS / ERP Solutions",
      "Mobile App (iOS/Android)",
      "Custom API Integrations",
      "Cloud Infrastructure",
      "Dedicated SLA",
      "24/7 Priority Support",
    ],
    buttonText: "Contact Sales",
    popular: false,
    order: 3,
    isActive: true,
  },
];

export async function getAllPricing(filters = {}) {
  await dbConnect();
  const query = {};
  if (filters.isActive) query.isActive = filters.isActive === "true";

  let pricing = await Pricing.find(query).sort({ order: 1, createdAt: -1 }).lean();

  if (pricing.length === 0) {
    pricing = await Pricing.create(DEFAULT_PLANS);
    pricing = pricing.map((p) => p.toObject ? p.toObject() : p);
  }

  return pricing;
}

export async function createPricing(data) {
  await dbConnect();
  const pricing = await Pricing.create(data);
  return pricing.toObject();
}

export async function updatePricing(id, data) {
  await dbConnect();
  return Pricing.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
}

export async function deletePricing(id) {
  await dbConnect();
  return Pricing.findByIdAndDelete(id).lean();
}
