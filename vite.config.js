import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
var webpack = require('webpack');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    new webpack.DefinePlugin({
        'import.meta.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(import.meta.env.VITE_SPOTIFY_CLIENT_ID),
        'import.meta.env.VITE_SPOTIFY_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_SPOTIFY_REDIRECT_URI),
        'import.meta.env.VITE_YOUTUBE_CLIENT_ID': JSON.stringify(import.meta.env.VITE_YOUTUBE_CLIENT_ID),
        'import.meta.env.VITE_YOUTUBE_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_YOUTUBE_REDIRECT_URI),
      })
  ],
})
