export type ProjectCategory =
  | "exterior"
  | "interior"
  | "bathroom"
  | "kitchen"
  | "renovation";

export type ProjectImage = {
  src: string;
  alt: string;
  category: ProjectCategory;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: ProjectCategory;
  /** true when stored in Vercel Blob (deletable file); false for bundled defaults. */
  uploaded: boolean;
};

export const projectImages: ProjectImage[] = [
  {
    src: "/projects/project-02.png",
    alt: "Stone and stucco home with arched entryway",
    category: "exterior",
  },
  {
    src: "/projects/project-03.png",
    alt: "Custom laundry room with patterned tile flooring",
    category: "interior",
  },
  {
    src: "/projects/project-04.png",
    alt: "Kitchen and dining area with coffered ceiling",
    category: "kitchen",
  },
  {
    src: "/projects/project-05.png",
    alt: "Brick and stone exterior new home construction",
    category: "exterior",
  },
  {
    src: "/projects/project-06.png",
    alt: "Primary bathroom with double vanity and walk-in shower",
    category: "bathroom",
  },
  {
    src: "/projects/project-07.png",
    alt: "Renovated bathroom with white vanity and pendant lighting",
    category: "bathroom",
  },
  {
    src: "/projects/project-08.png",
    alt: "Living room with vaulted ceiling, wood beams, and barn door",
    category: "interior",
  },
  {
    src: "/projects/project-09.png",
    alt: "Open-concept kitchen and living space with marble floors",
    category: "kitchen",
  },
  {
    src: "/projects/project-12.png",
    alt: "Finished interior room with marble flooring and tray ceiling",
    category: "interior",
  },
  {
    src: "/projects/project-13.png",
    alt: "Modern bathroom renovation with black vanity and marble tile",
    category: "bathroom",
  },
  {
    src: "/projects/project-14.png",
    alt: "Arched stone entryway with decorative exterior lighting",
    category: "exterior",
  },
  {
    src: "/projects/project-15.png",
    alt: "Contemporary white and black stucco home",
    category: "exterior",
  },
  {
    src: "/projects/project-16.png",
    alt: "Residential exterior with stone veneer and arched entry",
    category: "exterior",
  },
  {
    src: "/projects/project-17.png",
    alt: "Bedroom with tray ceiling and wood-look tile flooring",
    category: "interior",
  },
  {
    src: "/projects/project-18.png",
    alt: "Custom shower with white subway tile and black hex floor",
    category: "bathroom",
  },
];
