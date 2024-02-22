import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    VITE_APP_URL : import.meta.env.VITE_APP_URL,
    VITE_SUPABASE_KEY : import.meta.env.VITE_SUPABASE_KEY
  }
})
