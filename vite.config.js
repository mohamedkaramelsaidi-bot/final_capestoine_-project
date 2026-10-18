import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        'index.html',
        'productes.html',
        'profile.html',
        'donate.html',
        'about.html',
        'contact.html',
        'ourcharities.html',
        'misrelkheir.html',
        'orman.html',
        'resala.html',
      ],
    },
  },
});