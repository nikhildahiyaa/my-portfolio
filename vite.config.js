import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          // Only requested by the lazy-loaded hero scene — never on the critical path.
          'vendor-three': ['three'],
        },
      },
    },
  },
});
