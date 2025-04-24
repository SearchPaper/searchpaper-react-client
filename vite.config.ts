import "dotenv/config"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": process.env.API_ADDRESS ?? "http://localhost:5003"
    }
  },
  plugins: [react(), tailwindcss()],
})
