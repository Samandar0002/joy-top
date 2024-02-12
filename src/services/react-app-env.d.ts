/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    // BASE
    readonly NODE_ENV: 'development' | 'production';
    readonly PUBLIC_URL: string;
    readonly REACT_APP_VERSION: string;

    // BACKEND
    readonly REACT_APP_BASE_URL: string;
  }
}
