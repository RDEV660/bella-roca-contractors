import { FinancingForm } from "@/components/FinancingForm";
import { site } from "@/lib/site";

export const metadata = {
  title: `Financing | ${site.name} ${site.tagline}`,
  description:
    "Apply for financing with Bella Roca General Contractors. Residential, commercial, and industrial projects across South Texas.",
};

export default function FinancingPage() {
  return (
    <div className="section-padding mx-auto max-w-3xl">
      <p className="text-sm tracking-[0.35em] text-gold uppercase">
        Financing
      </p>
      <h1 className="font-display mt-3 text-4xl text-white md:text-5xl">
        Financing Application
      </h1>
      <p className="mt-4 text-zinc-400">
        Complete the form below to begin your financing application. Our team
        will review your submission and reach out at{" "}
        <a href={site.phoneHref} className="text-gold hover:underline">
          {site.phone}
        </a>
        .
      </p>

      <div className="mt-10 rounded-sm border border-gold/20 bg-black p-6 md:p-10">
        <FinancingForm />
      </div>
    </div>
  );
}
