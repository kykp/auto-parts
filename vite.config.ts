import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import * as dns from "dns";

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Все зависимости из node_modules будут вынесены в отдельный чанк
          }
        }
      }
    }
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'), // Настройка абсолютного импорта для папки 'src'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Добавьте переменные и миксины для глобального использования
        additionalData: `@import "@/app/styles/global.scss";`,
      },
    },
  },
});
