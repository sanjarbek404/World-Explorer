import { Country } from '../types';

const BASE_URL = 'https://restcountries.com/v3.1';

export async function getAllCountries(): Promise<Country[]> {
  try {
    const res = await fetch(`${BASE_URL}/all?fields=name,flags,population,region,capital,cca3,cca2,area`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Failed to fetch countries, status: ${res.status}`);
      return [];
    }
    const data: Country[] = await res.json();
    return data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error("Fetch error in getAllCountries:", error);
    return [];
  }
}

export async function getCountryByCode(code: string): Promise<Country | null> {
  try {
    const res = await fetch(`${BASE_URL}/alpha/${code}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Failed to fetch country ${code}, status: ${res.status}`);
      return null;
    }
    const data: Country[] = await res.json();
    return data[0];
  } catch (error) {
    console.error(`Fetch error in getCountryByCode for ${code}:`, error);
    return null;
  }
}

export async function searchCountries(name: string): Promise<Country[]> {
  try {
    const res = await fetch(`${BASE_URL}/name/${name}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`Failed to search countries by name ${name}, status: ${res.status}`);
      return [];
    }
    const data: Country[] = await res.json();
    return data;
  } catch (error) {
    console.error(`Fetch error in searchCountries for ${name}:`, error);
    return [];
  }
}
