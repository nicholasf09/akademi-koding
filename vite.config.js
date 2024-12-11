import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jwt from 'jsonwebtoken';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'auth-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Daftar route yang dilindungi
          const protectedRoutes = [
            '/course', '/admin', '/add/course', '/add/module', '/add/chapter', '/add/question'
          ];

          // Cek apakah URL yang diminta adalah route yang dilindungi
          if (protectedRoutes.includes(req.url)) {
            const token = req.headers.cookie
              ? req.headers.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]
              : null;
            const verify = jwt.verify(token, '7xLw9QpM3BnVc2K');
            console.log(verify);
            if (!token) {
              // Kirim respon 401 jika token tidak ada
              res.statusCode = 401;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Unauthorized' }));
              return;
            }
          }

          // Lanjutkan jika token valid atau route tidak dilindungi
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',  // Mengikat ke semua interface
  }
})
