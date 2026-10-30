// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleRegistrationRequest } from './server/registrationGateway.js';

const registrationApi = () => ({
  name: 'registration-api',
  configureServer(server) {
    server.middlewares.use('/api/registration', async (req, res) => {
      try {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const request = new Request('http://localhost/api/registration', {
          method: req.method,
          headers: req.headers,
          body: req.method === 'POST' ? Buffer.concat(chunks) : undefined
        });
        const response = await handleRegistrationRequest(request);
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch {
        res.writeHead(500, { 'content-type': 'application/json', 'cache-control': 'no-store' });
        res.end(JSON.stringify({ status: 'status_error' }));
      }
    });
  }
});

export default defineConfig({
  plugins: [react(), registrationApi()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons': ['lucide-react']
        }
      }
    },
    // Target modern evergreen browsers for smaller bundle output
    target: 'es2020',
    chunkSizeWarningLimit: 600
  }
});
