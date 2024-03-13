import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        modifyVars: {
          'primary-color': '#0080FF',
          'link-color': '#0080FF',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      },
    }
  }
})
