import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
  type CountryCode,
} from "libphonenumber-js";
import { cn } from "@/lib/utils";

const REGION_NAMES = new Intl.DisplayNames(["en"], { type: "region" });

function regionName(country: CountryCode) {
  try {
    return REGION_NAMES.of(country) ?? country;
  } catch {
    return country;
  }
}

function flagEmoji(country: CountryCode) {
  return String.fromCodePoint(...[...country].map((c) => 127397 + c.charCodeAt(0)));
}

export const PHONE_COUNTRIES = getCountries()
  .map((country) => ({
    country,
    name: regionName(country),
    callingCode: getCountryCallingCode(country),
    flag: flagEmoji(country),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const DEFAULT_PHONE_COUNTRY: CountryCode = "GB";

export function isValidPhone(value: string, country: CountryCode) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    return isValidPhoneNumber(trimmed, country);
  } catch {
    return false;
  }
}

export function formatPhone(value: string, country: CountryCode) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const parsed = parsePhoneNumber(trimmed, country);
    return parsed ? parsed.formatInternational() : trimmed;
  } catch {
    return trimmed;
  }
}

interface CountryPhoneInputProps {
  id?: string;
  value: string;
  country: CountryCode;
  onValueChange: (value: string) => void;
  onCountryChange: (country: CountryCode) => void;
  placeholder?: string;
  error?: string;
  onBlur?: () => void;
  icon?: React.ElementType;
  className?: string;
  autoComplete?: string;
}

export function CountryPhoneInput({
  id,
  value,
  country,
  onValueChange,
  onCountryChange,
  placeholder = "Phone number",
  error,
  onBlur,
  icon: Icon,
  className,
  autoComplete = "tel-national",
}: CountryPhoneInputProps) {
  const selected = PHONE_COUNTRIES.find((c) => c.country === country) ?? PHONE_COUNTRIES[0];

  return (
    <div
      className={cn(
        "flex h-11 items-center gap-2.5 rounded-xl border bg-slate-50 px-3 transition-colors focus-within:border-primary focus-within:bg-white",
        error ? "border-red-400" : "border-slate-200",
        className
      )}
    >
      {Icon && (
        <Icon className={cn("h-4 w-4 shrink-0", error ? "text-red-400" : "text-slate-400")} aria-hidden="true" />
      )}

      <div className="relative shrink-0">
        <select
          id={id ? `${id}-country` : undefined}
          aria-label="Country calling code"
          value={country}
          onChange={(event) => onCountryChange(event.target.value as CountryCode)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        >
          {PHONE_COUNTRIES.map((c) => (
            <option key={c.country} value={c.country}>
              {c.flag} {c.name} (+{c.callingCode})
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="flex items-center gap-1 pr-1.5 text-sm font-medium text-slate-700"
        >
          <span>{selected.flag}</span>
          <span>+{selected.callingCode}</span>
        </span>
      </div>

      <span className="h-5 w-px shrink-0 bg-slate-200" aria-hidden="true" />

      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={30}
        aria-invalid={!!error}
        className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
