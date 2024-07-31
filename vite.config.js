import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    define: {
        'import.meta.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(import.meta.env.VITE_SPOTIFY_CLIENT_ID),
        'import.meta.env.VITE_SPOTIFY_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_SPOTIFY_REDIRECT_URI),
        'import.meta.env.VITE_YOUTUBE_CLIENT_ID': JSON.stringify(import.meta.env.VITE_YOUTUBE_CLIENT_ID),
        'import.meta.env.VITE_YOUTUBE_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_YOUTUBE_REDIRECT_URI),
    }
  }]
})
