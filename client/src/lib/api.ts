import axios from 'axios';

function resolveBaseUrl(): string {
  const fromVite =
    typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_BACKEND_URL;
  const fromWindow = typeof window !== 'undefined' && (window as any).__API_BASE__;
  const fromProcess = typeof process !== 'undefined' && process.env && process.env.VITE_BACKEND_URL;
  return (fromVite as string) || (fromWindow as string) || (fromProcess as string) || 'http://localhost:8080';
}

const resolvedBaseURL = resolveBaseUrl();

export const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getApiBaseUrl(): string {
  return resolvedBaseURL;
}


