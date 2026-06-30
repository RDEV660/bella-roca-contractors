import { FinancingPageContent } from "@/components/FinancingPageContent";
import { site } from "@/lib/site";

export const metadata = {
  title: `Financing | ${site.name} ${site.tagline}`,
  description:
    "Apply for financing with Bella Roca General Contractors. Residential, commercial, and industrial projects across South Texas.",
};

export default function FinancingPage() {
  return <FinancingPageContent />;
}
