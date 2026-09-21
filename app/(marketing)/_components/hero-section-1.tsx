import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroHeader } from "@/app/(marketing)/_components/hero-section-1-header";
import BackgroundImage from "@/public/night-background.webp";
import HeroLight from "@/public/screenshot-light.png";
import HeroDark from "@/public/screenshot-dark.png";
import ArcjetLogo from "@/public/companies/arcjet.png";
import KindeLogo from "@/public/companies/kinde.png";
import MotionLogo from "@/public/companies/motion-logo.png";
import NeonDbLogo from "@/public/companies/neondb.png";
import OrpcLogo from "@/public/companies/orpc.webp";
import PrismaLogo from "@/public/companies/prisma-logo.svg";
import VercelLogo from "@/public/companies/vercel-logo.svg";

const companyLogos = [
  { src: ArcjetLogo, alt: "Arcjet", theme: "dark" },
  { src: KindeLogo, alt: "Kinde", theme: "dark" },
  { src: MotionLogo, alt: "Motion", theme: "light" },
  { src: NeonDbLogo, alt: "Neon", theme: "color" },
  { src: OrpcLogo, alt: "oRPC", theme: "color" },
  { src: PrismaLogo, alt: "Prisma", theme: "dark" },
  { src: VercelLogo, alt: "Vercel", theme: "dark" },
] as const;

const themeInvertClass = {
  dark: "dark:invert",
  light: "invert dark:invert-0",
  color: "",
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24 md:pt-36">
            <Image
              src={BackgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover"
            />
            <div className="mx-auto max-w-7xl">
              <div className="px-6 text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <Link
                  href="#link"
                  className="group mx-auto flex w-fit items-center gap-3 rounded-full p-1 pl-4 transition-colors duration-300"
                >
                  <span className="text-sm font-medium">New:</span>
                  <span className="text-muted-foreground text-sm">
                    Introducing AI features
                  </span>

                  <div className="size-6 overflow-hidden rounded-full duration-500">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </Link>

                <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-medium tracking-tight md:text-6xl lg:mt-12 xl:text-7xl">
                  The AI-ready home for team communication
                </h1>
                <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-balance md:text-lg">
                  Tailflow organizes converstions into channels with threads, is
                  realtime and uses AI to keep teams in sync.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
                  <Button
                    key={1}
                    nativeButton={false}
                    render={
                      <Link href="#">
                        <span className="text-nowrap">Get Started</span>
                      </Link>
                    }
                  />

                  <Button
                    key={2}
                    variant="secondary"
                    nativeButton={false}
                    render={
                      <Link href="#">
                        <span className="text-nowrap">Request a demo</span>
                      </Link>
                    }
                  />
                </div>
              </div>

              <div className="relative mt-8 overflow-hidden p-6 max-sm:-mr-56 sm:mt-16">
                <div className="rounded-4xl mask-t-from-25% mask-t-to-65% bg-linear-to-b absolute inset-0 border to-zinc-600"></div>
                <div className="bg-background ring-foreground/6.5 before:mask-radial-at-top-left before:mask-radial-from-65% before:mask-radial-[100%_60%] before:ring-foreground before:border-foreground/10 relative rounded-2xl p-2 shadow-xl shadow-black/50 ring before:absolute before:-inset-px before:z-10 before:size-56 before:rounded-tl-2xl before:border-l before:border-t">
                  <div className="bg-foreground/2 z-1 absolute inset-0 rounded-2xl"></div>
                  <Image
                    className="bg-background aspect-15/8 relative rounded-2xl dark:hidden object-contain object-top"
                    src={HeroLight}
                    alt="app screen"
                    width="2700"
                    height="1440"
                  />
                  <Image
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block object-contain object-top"
                    src={HeroDark}
                    alt="app screen"
                    width="2700"
                    height="1440"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background pb-16 pt-6 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                href="/"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span> See the network</span>

                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14 md:grid-cols-4">
              {companyLogos.map((logo) => (
                <div key={logo.alt} className="flex items-center">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    className={`mx-auto h-6 w-auto object-contain ${themeInvertClass[logo.theme]}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
