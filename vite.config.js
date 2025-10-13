import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'CONSTELLATION';
const isProduction = process.env.NODE_ENV === true ;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: isProduction ? `/${repoName}/` : '/',
  build: {
    outDir: 'dist',
  },
})
