import { isValidPhoneNumber, parsePhoneNumber, type CountryCode } from "libphonenumber-js";
import { cn } from "@/lib/utils";
import { CountryCodeDropdown } from "@/components/forms/CountryCodeDropdown";
import { DEFAULT_PHONE_COUNTRY, PHONE_COUNTRIES } from "@/components/forms/phoneCountries";

export { DEFAULT_PHONE_COUNTRY, PHONE_COUNTRIES };

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

      <div className="shrink-0">
        <CountryCodeDropdown id={id} country={country} onChange={onCountryChange} />
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
