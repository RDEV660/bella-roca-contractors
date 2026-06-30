import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: `Terms & Authorization | ${site.name}`,
  description:
    "Terms and authorization for submitting financing applications to Bella Roca General Contractors.",
};

export default function TermsPage() {
  return (
    <div className="section-padding mx-auto max-w-3xl">
      <p className="text-sm tracking-[0.35em] text-gold uppercase">Legal</p>
      <h1 className="font-display mt-3 text-4xl text-white md:text-5xl">
        Terms &amp; Authorization
      </h1>
      <p className="mt-4 text-zinc-400">
        Please read carefully before submitting a financing application.
      </p>

      <div className="prose-invert mt-10 space-y-8 text-sm leading-relaxed text-zinc-300">
        <section className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
          <h2 className="font-display text-2xl text-white">
            1. Ownership of Information
          </h2>
          <p className="mt-3">
            By submitting an application, you confirm that you are the lawful
            owner of all personal information provided, or that you are
            authorized to submit it on behalf of the owner with their express
            consent.
          </p>
        </section>

        <section className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
          <h2 className="font-display text-2xl text-white">
            2. Authorization to Share
          </h2>
          <p className="mt-3">
            You authorize {site.name} {site.tagline} and its owners to receive,
            review, and use your submitted information solely for the purpose of
            evaluating financing options and contacting you regarding your
            project.
          </p>
        </section>

        <section className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
          <h2 className="font-display text-2xl text-white">
            3. Sensitive Information
          </h2>
          <p className="mt-3">
            Social Security numbers and other sensitive data are masked on your
            screen during entry. Authorized owners receive the complete
            information needed to process your application. We do not sell or
            share your data with unrelated third parties.
          </p>
        </section>

        <section className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
          <h2 className="font-display text-2xl text-white">
            4. Accuracy of Information
          </h2>
          <p className="mt-3">
            You agree that all information submitted is true, accurate, and
            complete to the best of your knowledge. Providing false or misleading
            information may result in denial of financing or termination of
            services.
          </p>
        </section>

        <section className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
          <h2 className="font-display text-2xl text-white">5. Contact</h2>
          <p className="mt-3">
            Questions about these terms? Call{" "}
            <a href={site.phoneHref} className="text-gold hover:underline">
              {site.phone}
            </a>{" "}
            or visit us at {site.address.full}.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/financing" className="btn-primary">
          Continue to Application
        </Link>
        <Link href="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
