import { defineConfig, AliasOptions } from 'vite';
import react from '@vitejs/plugin-react';

const alias: AliasOptions = [
  { find: 'pages', replacement: '/src/pages' },
  { find: 'app', replacement: '/src/app' },
  { find: 'entities', replacement: '/src/entities' },
  { find: 'features', replacement: '/src/features' },
  { find: 'processes', replacement: '/src/processes' },
  { find: 'shared', replacement: '/src/shared' },
  { find: 'widgets', replacement: '/src/widgets' },
];

export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [react()],
});
