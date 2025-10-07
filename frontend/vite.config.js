import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    VITE_APP_URL : JSON.stringify(process.env.VITE_APP_URL),
    VITE_SUPABASE_KEY : JSON.stringify(process.env.VITE_SUPABASE_KEY)
  }
})