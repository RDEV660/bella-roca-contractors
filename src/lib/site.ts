export const site = {
  name: "Bella Roca",
  tagline: "General Contractors",
  subtitle: "Roofing & Construction",
  phone: "+1 (956) 360-5764",
  phoneHref: "tel:+19563605764",
  address: {
    street: "220 N Alton Blvd, STE F",
    city: "Alton",
    state: "TX",
    zip: "78573",
    full: "220 N Alton Blvd, STE F, Alton, TX 78573",
  },
  hours: "Monday to Saturday, 7 AM – 7 PM",
  serviceArea: "Rio Grande Valley (RGV) & South Texas",
  experience: "30+ years",
  description:
    "Family-owned general contractors with 30+ years of experience. Residential, commercial, and industrial — renovations and new construction across the RGV.",
  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/bellarocaconstructionllc/",
      label: "Follow us on Facebook",
    },
  ],
} as const;

export const services = [
  {
    title: "Residential",
    description:
      "Custom homes, remodels, and roofing for homeowners who expect craftsmanship and clear communication.",
  },
  {
    title: "Commercial",
    description:
      "Build-outs, tenant improvements, and commercial construction delivered on schedule and on budget.",
  },
  {
    title: "Industrial",
    description:
      "Durable, code-compliant industrial projects built to handle demanding operational requirements.",
  },
  {
    title: "Renovations",
    description:
      "Transform existing spaces with thoughtful design, quality materials, and expert execution.",
  },
  {
    title: "New Construction",
    description:
      "Ground-up builds managed from planning through completion with a family-owned team you can trust.",
  },
  {
    title: "Roofing",
    description:
      "Repairs, replacements, and new roof systems designed for South Texas weather and longevity.",
  },
] as const;

export const workTypes = [
  { value: "remodel", label: "Remodel" },
  { value: "roofing", label: "Roofing" },
  { value: "new-home", label: "New Home Built" },
] as const;
