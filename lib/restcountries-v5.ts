import "server-only";

import { Country, Currencies, Languages } from "../types";
import { serverEnv } from "./env.server";

const BASE_URL = "https://api.restcountries.com/countries/v5";

type V5Capital = { name?: string };
type V5Language = { iso639_1?: string; name?: string; native_name?: string };
type V5Currency = { name?: string; symbol?: string; code?: string };

export type V5Country = {
  names?: { common?: string; official?: string };
  codes?: { alpha_2?: string; alpha_3?: string };
  flag?: { url_png?: string; url_svg?: string; description?: string };
  population?: number;
  region?: string;
  subregion?: string;
  capitals?: V5Capital[];
  area?: { kilometers?: number };
  borders?: string[];
  languages?: V5Language[];
  currencies?: Record<string, V5Currency> | V5Currency[];
  coordinates?: { lat?: number; lng?: number };
  links?: { google_maps?: string; open_street_maps?: string };
  continents?: string[];
  tlds?: string[];
  timezones?: string[];
};

type V5Response = {
  data?: {
    objects?: V5Country[];
    meta?: { total?: number; more?: boolean };
    _demo?: { message?: string; signup_url?: string };
  };
  errors?: Array<{ message?: string }>;
};

function mapLanguages(languages?: V5Language[]): Languages | undefined {
  if (!languages?.length) return undefined;

  return Object.fromEntries(
    languages
      .filter((lang) => lang.iso639_1)
      .map((lang) => [lang.iso639_1!, lang.name || lang.native_name || ""]),
  );
}

function mapCurrencies(
  currencies?: V5Country["currencies"],
): Currencies | undefined {
  if (!currencies) return undefined;

  if (Array.isArray(currencies)) {
    return Object.fromEntries(
      currencies.map((currency, index) => [
        currency.code || String(index),
        { name: currency.name || "", symbol: currency.symbol || "" },
      ]),
    );
  }

  return Object.fromEntries(
    Object.entries(currencies).map(([code, currency]) => [
      code,
      { name: currency.name || "", symbol: currency.symbol || "" },
    ]),
  );
}

export function mapV5ToCountry(country: V5Country): Country {
  const lat = country.coordinates?.lat;
  const lng = country.coordinates?.lng;

  return {
    name: {
      common: country.names?.common || "",
      official: country.names?.official || country.names?.common || "",
    },
    flags: {
      png: country.flag?.url_png || "",
      svg: country.flag?.url_svg || "",
      alt: country.flag?.description,
    },
    population: country.population ?? 0,
    area: country.area?.kilometers ?? 0,
    region: country.region || "",
    subregion: country.subregion,
    capital: country.capitals?.map((item) => item.name).filter(Boolean) as
      | string[]
      | undefined,
    languages: mapLanguages(country.languages),
    currencies: mapCurrencies(country.currencies),
    borders: country.borders,
    latlng: lat !== undefined && lng !== undefined ? [lat, lng] : undefined,
    cca2: country.codes?.alpha_2 || "",
    cca3: country.codes?.alpha_3 || "",
    tld: country.tlds,
    timezones: country.timezones,
    continents: country.continents,
    maps: country.links
      ? {
          googleMaps: country.links.google_maps || "",
          openStreetMaps: country.links.open_street_maps || "",
        }
      : undefined,
  };
}

export async function fetchV5(path: string): Promise<V5Response> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${serverEnv.restCountriesApiKey}` },
    next: { revalidate: 3600 },
  });

  const json: V5Response = await res.json();

  if (!res.ok || json.errors?.length) {
    console.error(
      "REST Countries API error:",
      json.errors?.[0]?.message || res.status,
    );
    return { data: { objects: [] } };
  }

  if (json.data?._demo && !serverEnv.hasRestCountriesApiKey) {
    console.warn(json.data._demo.message);
  }

  return json;
}

export async function fetchAllV5Countries(): Promise<Country[]> {
  const countries: V5Country[] = [];
  const limit = 100;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchV5(
      `?limit=${limit}&offset=${offset}&response_fields=names,codes,flag,population,region,capitals,area`,
    );
    const objects = response.data?.objects ?? [];

    countries.push(...objects);
    hasMore = response.data?.meta?.more ?? false;
    offset += limit;
  }

  return countries
    .map(mapV5ToCountry)
    .filter((country) => country.cca3.length > 0);
}
