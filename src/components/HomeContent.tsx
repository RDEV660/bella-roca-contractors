"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useLocale } from "@/components/LocaleProvider";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

const serviceKeys = [
  "residential",
  "commercial",
  "industrial",
  "renovations",
  "newConstruction",
  "roofing",
] as const;

export function HomeContent() {
  const { t } = useLocale();

  const aboutCards = [
    { title: site.experience, sub: t.about.experience },
    { title: t.about.familyOwned, sub: t.about.familySub },
    { title: t.about.hours, sub: t.about.hoursSub },
    { title: t.about.rgv, sub: site.serviceArea },
  ];

  return (
    <>
      <section id="about" className="section-padding mx-auto max-w-6xl">
        <AnimateOnScroll>
          <div className="gold-line mb-10" />
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <div className="md:col-span-1">
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                {t.about.title}
              </h2>
              <p className="mt-4 text-zinc-400">{t.about.body}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-2 md:gap-6">
              {aboutCards.map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 80}>
                  <div className="rounded-sm border border-gold/20 bg-zinc-950 p-5 transition hover:border-gold/40 sm:p-6">
                    <p className="text-2xl font-semibold text-gold sm:text-3xl">
                      {item.title}
                    </p>
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
            <div className="mb-10 text-center sm:mb-12">
              <p className="text-sm tracking-[0.35em] text-gold uppercase">
                {t.services.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl md:text-5xl">
                {t.services.title}
              </h2>
            </div>
          </AnimateOnScroll>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {serviceKeys.map((key, i) => {
              const service = t.services.items[key];
              return (
                <AnimateOnScroll key={key} delay={i * 60}>
                  <article className="group h-full rounded-sm border border-zinc-800 bg-black p-5 transition hover:border-gold/40 sm:p-6">
                    <div className="mb-4 h-px w-12 bg-gold transition group-hover:w-20" />
                    <h3 className="font-display text-xl text-white sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {service.description}
                    </p>
                  </article>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding mx-auto max-w-6xl">
        <AnimateOnScroll>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <p className="text-sm tracking-[0.35em] text-gold uppercase">
                {t.contact.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
                {t.contact.title}
              </h2>
              <p className="mt-4 text-zinc-400">{t.contact.body}</p>
              <SocialLinks className="mt-6" />
            </div>
            <div className="rounded-sm border border-gold/20 bg-zinc-950 p-6 sm:p-8">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-gold uppercase tracking-wide">
                    {t.contact.phone}
                  </dt>
                  <dd className="mt-1 text-lg text-white">
                    <a href={site.phoneHref} className="hover:text-gold">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-gold uppercase tracking-wide">
                    {t.contact.address}
                  </dt>
                  <dd className="mt-1 text-zinc-300">{site.address.full}</dd>
                </div>
                <div>
                  <dt className="text-gold uppercase tracking-wide">
                    {t.contact.hours}
                  </dt>
                  <dd className="mt-1 text-zinc-300">{t.contact.hoursValue}</dd>
                </div>
                <div>
                  <dt className="text-gold uppercase tracking-wide">
                    {t.contact.serviceArea}
                  </dt>
                  <dd className="mt-1 text-zinc-300">{site.serviceArea}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/financing" className="btn-primary w-full text-center">
                  {t.contact.financing}
                </Link>
                <Link href="/gallery" className="btn-outline w-full text-center">
                  {t.contact.gallery}
                </Link>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
