import 'server-only';

import { Country } from '../types';
import { fetchAllV5Countries, fetchV5, mapV5ToCountry } from './restcountries-v5';

export async function getAllCountries(): Promise<Country[]> {
  try {
    const countries = await fetchAllV5Countries();
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Fetch error in getAllCountries:', error);
    return [];
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  try {
    const response = await fetchV5(`/codes.alpha_3/${encodeURIComponent(code)}`);
    const country = response.data?.objects?.[0];
    return country ? mapV5ToCountry(country) : null;
  } catch (error) {
    console.error(`Fetch error in getCountryByCode for ${code}:`, error);
    return null;
  }
}

export async function getBorderCountries(codes: string[]): Promise<Country[]> {
  if (!codes || codes.length === 0) return [];

  try {
    const results = await Promise.all(
      codes.map(async (code) => {
        const response = await fetchV5(
          `/codes.alpha_3/${encodeURIComponent(code)}?response_fields=names,codes,flag`
        );
        const country = response.data?.objects?.[0];
        return country ? mapV5ToCountry(country) : null;
      })
    );

    return results.filter((country): country is Country => country !== null);
  } catch (error) {
    console.error('Fetch error in getBorderCountries:', error);
    return [];
  }
}

export async function searchCountries(name: string): Promise<Country[]> {
  try {
    const response = await fetchV5(`/names.common?q=${encodeURIComponent(name)}`);
    const countries = response.data?.objects ?? [];
    return countries.map(mapV5ToCountry);
  } catch (error) {
    console.error(`Fetch error in searchCountries for ${name}:`, error);
    return [];
  }
}
