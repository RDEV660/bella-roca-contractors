import { TermsPageContent } from "@/components/TermsPageContent";
import { site } from "@/lib/site";

export const metadata = {
  title: `Terms & Authorization | ${site.name}`,
  description:
    "Terms and authorization for submitting financing applications to Bella Roca General Contractors.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
