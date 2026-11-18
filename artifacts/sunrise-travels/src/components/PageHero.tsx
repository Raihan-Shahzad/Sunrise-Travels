import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imagePosition?: string;
  align?: "center" | "left";
  size?: "compact" | "tall";
  children?: ReactNode;
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imagePosition = "center",
  align = "center",
  size = "compact",
  children,
}: PageHeroProps) {
  const centered = align === "center";

  return (
    <section
      className={`relative isolate flex items-center overflow-hidden bg-[#071B17] text-white ${
        size === "tall" ? "min-h-[540px] py-24" : "min-h-[340px] py-16 md:py-20"
      }`}
    >
      {image ? (
        <>
          <div
            className="absolute inset-0 -z-20 bg-cover"
            style={{ backgroundImage: `url('${image}')`, backgroundPosition: imagePosition }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#04120F]/85 via-[#04120F]/70 to-[#04120F]/95" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(200,146,43,0.22),transparent_55%)]" />
      )}

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #F5C877 1px, transparent 0)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className={`container relative mx-auto max-w-5xl px-4 ${centered ? "text-center" : ""}`}>
        {eyebrow ? <p className="eyebrow mb-4 text-amber-300">{eyebrow}</p> : null}
        <h1 className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed text-emerald-50/85 md:text-xl ${
              centered ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        ) : null}
        {children ? (
          <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${centered ? "justify-center" : ""}`}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
