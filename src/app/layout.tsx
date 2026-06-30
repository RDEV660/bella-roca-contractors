import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/components/LocaleProvider";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const title = `${site.name} | ${site.tagline} — ${site.subtitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "general contractor",
    "Bella Roca",
    "Rio Grande Valley",
    "RGV",
    "South Texas",
    "roofing",
    "new construction",
    "renovations",
    "Alton TX",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.siteUrl,
    siteName: `${site.name} ${site.tagline}`,
    title,
    description: site.description,
    images: [
      {
        url: "/projects/project-02.png",
        width: 1024,
        height: 769,
        alt: "Bella Roca General Contractors project showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/projects/project-02.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg", apple: "/logo.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
