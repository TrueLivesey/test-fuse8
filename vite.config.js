import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import pxtorem from 'postcss-pxtorem';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  base: '/test-fuse8/',
  plugins: [react(), sassGlobImports()],
  css: {
    postcss: {
      plugins: [pxtorem({ rootValue: 16, propList: ['*'] })],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/assets'),
      find: '../font',
      replacement: path.resolve(__dirname, 'src/assets/fonts'),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
      output: {
        assetFileNames: (name) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(woff2|woff|ttf)$/.test(name ?? '')) {
            return 'assets/fonts/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
  },
});
