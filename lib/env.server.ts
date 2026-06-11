import 'server-only';

const isProduction = process.env.NODE_ENV === 'production';

function readSecret(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function getRestCountriesApiKey(): string {
  const key = readSecret('REST_COUNTRIES_API_KEY');

  if (key) return key;

  if (isProduction) {
    throw new Error(
      'REST_COUNTRIES_API_KEY is required in production. Add it in Vercel → Project → Settings → Environment Variables.'
    );
  }

  console.warn(
    'REST_COUNTRIES_API_KEY is not set. Using demo key in development — only sample data is returned.'
  );
  return 'rc_live_demo';
}

export const serverEnv = {
  get restCountriesApiKey() {
    return getRestCountriesApiKey();
  },
  get hasRestCountriesApiKey() {
    return Boolean(readSecret('REST_COUNTRIES_API_KEY'));
  },
  isProduction,
} as const;
