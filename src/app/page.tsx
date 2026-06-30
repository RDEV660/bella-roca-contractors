import Link from "next/link";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { ProjectSlideshow } from "@/components/ProjectSlideshow";
import { SocialLinks } from "@/components/SocialLinks";
import { services, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-gold/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.12),_transparent_55%)]" />
        <div className="section-padding relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
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
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={site.phoneHref} className="btn-primary">
                Call {site.phone}
              </a>
              <Link href="/financing" className="btn-outline">
                Apply for Financing
              </Link>
            </div>
            <SocialLinks className="mt-8" />
          </div>

          <ProjectSlideshow variant="hero" />
        </div>
      </section>

      <section id="about" className="section-padding mx-auto max-w-6xl">
        <AnimateOnScroll>
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
              {[
                { title: site.experience, sub: "of proven experience" },
                { title: "Family Owned", sub: "Personal service on every project" },
                { title: "Mon – Sat", sub: "7 AM – 7 PM" },
                { title: "RGV", sub: site.serviceArea },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 80}>
                  <div className="rounded-sm border border-gold/20 bg-zinc-950 p-6 transition hover:border-gold/40">
                    <p className="text-3xl font-semibold text-gold">{item.title}</p>
                    <p className="mt-2 text-sm text-zinc-400">{item.sub}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      <section
        id="services"
        className="section-padding border-y border-gold/10 bg-zinc-950/50"
      >
        <div className="mx-auto max-w-6xl">
          <AnimateOnScroll>
            <div className="mb-12 text-center">
              <p className="text-sm tracking-[0.35em] text-gold uppercase">
                What We Do
              </p>
              <h2 className="font-display mt-3 text-4xl text-white md:text-5xl">
                Our Services
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.title} delay={i * 60}>
                <article className="group h-full rounded-sm border border-zinc-800 bg-black p-6 transition hover:border-gold/40 hover:-translate-y-1">
                  <div className="mb-4 h-px w-12 bg-gold transition group-hover:w-20" />
                  <h3 className="font-display text-2xl text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding mx-auto max-w-6xl">
        <AnimateOnScroll>
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
              <SocialLinks className="mt-6" />
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/financing" className="btn-primary flex-1 text-center">
                  Financing
                </Link>
                <Link href="/gallery" className="btn-outline flex-1 text-center">
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
