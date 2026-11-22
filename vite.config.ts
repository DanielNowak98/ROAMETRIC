import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';

// Self-Hosting: reiner Node-Server über `vinext start`, kein Cloudflare/Wrangler nötig.
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [vinext()],
});
