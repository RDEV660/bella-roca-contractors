import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.12),_transparent_55%)]" />
        <div className="section-padding relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm tracking-[0.35em] text-gold uppercase">
              {site.serviceArea}
            </p>
            <h1 className="font-display text-5xl leading-tight font-semibold text-white md:text-6xl">
              <span className="gold-gradient">Bella Roca</span>
              <br />
              General Contractors
            </h1>
            <p className="mt-2 text-sm tracking-[0.3em] text-zinc-400 uppercase">
              Roofing &amp; Construction
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-300">
              {site.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={site.phoneHref} className="btn-primary">
                Call {site.phone}
              </a>
              <Link href="/financing" className="btn-outline">
                Apply for Financing
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-sm border border-gold/30 bg-black shadow-[0_0_60px_rgba(201,169,98,0.15)]">
              <Image
                src="/logo.svg"
                alt="Bella Roca General Contractors"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-padding mx-auto max-w-6xl">
        <div className="gold-line mb-10" />
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="font-display text-4xl text-white">Built on Trust</h2>
            <p className="mt-4 text-zinc-400">
              A family-owned team with decades of hands-on experience across
              South Texas.
            </p>
          </div>
          <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
            <div className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
              <p className="text-3xl font-semibold text-gold">{site.experience}</p>
              <p className="mt-2 text-sm text-zinc-400">of proven experience</p>
            </div>
            <div className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
              <p className="text-3xl font-semibold text-gold">Family Owned</p>
              <p className="mt-2 text-sm text-zinc-400">
                Personal service on every project
              </p>
            </div>
            <div className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
              <p className="text-3xl font-semibold text-gold">Mon – Sat</p>
              <p className="mt-2 text-sm text-zinc-400">7:00 AM – 7:00 PM</p>
            </div>
            <div className="rounded-sm border border-gold/20 bg-zinc-950 p-6">
              <p className="text-3xl font-semibold text-gold">RGV</p>
              <p className="mt-2 text-sm text-zinc-400">{site.serviceArea}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="section-padding border-y border-gold/10 bg-zinc-950/50"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm tracking-[0.35em] text-gold uppercase">
              What We Do
            </p>
            <h2 className="font-display mt-3 text-4xl text-white md:text-5xl">
              Our Services
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-sm border border-zinc-800 bg-black p-6 transition hover:border-gold/40"
              >
                <div className="mb-4 h-px w-12 bg-gold transition group-hover:w-20" />
                <h3 className="font-display text-2xl text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm tracking-[0.35em] text-gold uppercase">
              Get in Touch
            </p>
            <h2 className="font-display mt-3 text-4xl text-white">
              Ready to start your project?
            </h2>
            <p className="mt-4 text-zinc-400">
              Call us today for residential, commercial, or industrial work —
              including renovations, roofing, and new construction.
            </p>
          </div>
          <div className="rounded-sm border border-gold/20 bg-zinc-950 p-8">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-gold uppercase tracking-wide">Phone</dt>
                <dd className="mt-1 text-lg text-white">
                  <a href={site.phoneHref} className="hover:text-gold">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-gold uppercase tracking-wide">Address</dt>
                <dd className="mt-1 text-zinc-300">{site.address.full}</dd>
              </div>
              <div>
                <dt className="text-gold uppercase tracking-wide">Hours</dt>
                <dd className="mt-1 text-zinc-300">{site.hours}</dd>
              </div>
              <div>
                <dt className="text-gold uppercase tracking-wide">
                  Service Area
                </dt>
                <dd className="mt-1 text-zinc-300">{site.serviceArea}</dd>
              </div>
            </dl>
            <Link href="/financing" className="btn-primary mt-8 w-full">
              Financing Application
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
