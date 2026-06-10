export type Name = {
  common: string;
  official: string;
};

export type Flags = {
  png: string;
  svg: string;
  alt?: string;
};

export type Currencies = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};

export type Languages = {
  [key: string]: string;
};

export type Country = {
  name: Name;
  flags: Flags;
  population: number;
  area: number;
  region: string;
  subregion?: string;
  capital?: string[];
  languages?: Languages;
  currencies?: Currencies;
  borders?: string[];
  latlng?: [number, number];
  cca2: string;
  cca3: string;
  tld?: string[];
  timezones?: string[];
  continents?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
};
