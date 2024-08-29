import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const getProxyTarget = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:1000'; // Fallback for server-side or non-browser environments
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        // target: 'http://localhost:1000',
        target: getProxyTarget(),
        changeOrigin: true,
      },
    },
  }
})
