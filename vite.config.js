import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import {visualizer} from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,  // This opens the report automatically after build
      filename: './dist/bundle-stats.html',  // The name of the file to output the visualization
      gzipSize: true,  // Show gzipped sizes
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build : {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['@firebase/app', '@firebase/auth', '@firebase/firestore', '@firebase/storage'],
        }
      }
    }
  }
});
