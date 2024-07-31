import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//         'import.meta.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(import.meta.env.VITE_SPOTIFY_CLIENT_ID),
//         'import.meta.env.VITE_SPOTIFY_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_SPOTIFY_REDIRECT_URI),
//         'import.meta.env.VITE_YOUTUBE_CLIENT_ID': JSON.stringify(import.meta.env.VITE_YOUTUBE_CLIENT_ID),
//         'import.meta.env.VITE_YOUTUBE_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_YOUTUBE_REDIRECT_URI),
//     }
// })

// https://vitejs.dev/config/
// export default defineConfig(({mode}) => {
//     const env = loadEnv(mode, process.cwd());
  
//     return {
//       plugins: [react()],
//       define: {
//                 'import.meta.env.VITE_SPOTIFY_CLIENT_ID': JSON.stringify(import.meta.env.VITE_SPOTIFY_CLIENT_ID),
//                 'import.meta.env.VITE_SPOTIFY_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_SPOTIFY_REDIRECT_URI),
//                 'import.meta.env.VITE_YOUTUBE_CLIENT_ID': JSON.stringify(import.meta.env.VITE_YOUTUBE_CLIENT_ID),
//                 'import.meta.env.VITE_YOUTUBE_REDIRECT_URI': JSON.stringify(import.meta.env.VITE_YOUTUBE_REDIRECT_URI),
//             }
//     };
//   });
dotenv.config();

console.log("hello", process.env.VITE_SPOTIFY_REDIRECT_URI) //when you run the frontend using yarn dev you will be able to see this on you cmd to know this works! :D

export default defineConfig({
    SPOTIFY_CLIENT_ID: process.env.VITE_SPOTIFY_CLIENT_ID,
    SPOTIFY_REDIRECT_URI: process.env.VITE_SPOTIFY_REDIRECT_URI,
    YOUTUBE_CLIENT_ID: process.env.VITE_YOUTUBE_CLIENT_ID,
    YOUTUBE_REDIRECT_URI: process.env.VITE_YOUTUBE_REDIRECT_URI,
    plugins: [react()],
})