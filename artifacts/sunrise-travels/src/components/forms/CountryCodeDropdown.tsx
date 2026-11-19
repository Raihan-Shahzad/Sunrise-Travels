import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import type { CountryCode } from "libphonenumber-js";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PHONE_COUNTRIES } from "@/components/forms/phoneCountries";
import { cn } from "@/lib/utils";

interface CountryCodeDropdownProps {
  id?: string;
  country: CountryCode;
  onChange: (country: CountryCode) => void;
}

export function CountryCodeDropdown({ id, country, onChange }: CountryCodeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected =
    PHONE_COUNTRIES.find((c) => c.country === country) ?? PHONE_COUNTRIES[0];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PHONE_COUNTRIES;
    const digits = q.replace(/^\+/, "");
    return PHONE_COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase() === q ||
        c.callingCode.startsWith(digits)
    );
  }, [query]);

  const choose = (next: CountryCode) => {
    onChange(next);
    setOpen(false);
    setQuery("");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          id={id ? `${id}-country` : undefined}
          aria-label="Country calling code"
          className="flex items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <span aria-hidden="true" className="text-base leading-none">{selected.flag}</span>
          <span>+{selected.callingCode}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={8} className="w-72 rounded-xl border-slate-200 p-0 shadow-xl">
        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results.length > 0) {
                event.preventDefault();
                choose(results[0].country);
              }
            }}
            placeholder="Search country or code"
            autoFocus
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="max-h-64 overflow-y-auto py-1">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-slate-500">No country matches that search.</p>
          )}
          {results.map((c) => {
            const active = c.country === country;
            return (
              <button
                key={c.country}
                type="button"
                onClick={() => choose(c.country)}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors",
                  active ? "bg-primary/5 text-slate-900" : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <span aria-hidden="true" className="text-base leading-none">{c.flag}</span>
                <span className="min-w-0 flex-1 truncate">{c.name}</span>
                <span className="shrink-0 tabular-nums text-slate-500">+{c.callingCode}</span>
                {active && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
