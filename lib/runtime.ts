import { env } from 'cloudflare:workers';

export type RoametricEnv = {
  DB?: D1Database;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  SITE_URL?: string;
};

export function runtimeEnv(): RoametricEnv {
  return env as unknown as RoametricEnv;
}

export function runtimeValue(key: 'STRIPE_SECRET_KEY' | 'STRIPE_WEBHOOK_SECRET' | 'SITE_URL') {
  return runtimeEnv()[key] || process.env[key];
}
