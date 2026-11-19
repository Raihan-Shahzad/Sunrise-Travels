import { getCountries, getCountryCallingCode, type CountryCode } from "libphonenumber-js";

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
