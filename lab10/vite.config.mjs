import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/plugins/GlobalComponents.js'),
      name: 'MyComponentLibrary',
      fileName: (format) => `my-component-library.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['@vitejs/plugin-vue']
  },
  define: {
    'process.env': {}
  }
})
