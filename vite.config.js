import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    VITE_APP_URL : process.env.VITE_APP_URL,
    VITE_SUPABASE_KEY : process.env.VITE_SUPABASE_KEY
  }
})
