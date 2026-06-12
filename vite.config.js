import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Carga variables de entorno, inyectando dependencias configurables
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: true, // Exposición necesaria para Docker y Tailscale
      port: Number(env.VITE_PORT) || 5173,
      proxy: {
        '/api': {
          // El target usa variable de entorno, con fallback para desarrollo local nativo
          target: env.VITE_API_PROXY_TARGET || 'http://localhost:8080',
          changeOrigin: true,
        }
      }
    }
  };
});
