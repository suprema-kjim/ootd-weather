import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project at https://<user>.github.io/ootd-weather/,
  // so all asset URLs need that repo-name prefix.
  base: '/ootd-weather/',
  plugins: [react()],
})
