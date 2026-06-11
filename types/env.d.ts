declare namespace NodeJS {
  interface ProcessEnv {
    REST_COUNTRIES_API_KEY?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
