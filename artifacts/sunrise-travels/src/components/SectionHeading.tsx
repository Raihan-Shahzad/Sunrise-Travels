import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow ? (
        <span className={`eyebrow mb-3 ${light ? "text-amber-300" : "text-accent-600"}`}>{eyebrow}</span>
      ) : null}
      <h2
        className={`font-heading text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-[2.9rem] ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${centered ? "mx-auto" : ""} max-w-2xl ${
            light ? "text-emerald-50/80" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
