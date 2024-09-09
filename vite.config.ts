import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      process: 'process/browser',
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env': {}, // This line is optional and depends on your use case
  },
  optimizeDeps: {
    include: ['@esbuild/node-globals-polyfill'],
  },
})
