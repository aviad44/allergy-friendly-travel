
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { splitVendorChunkPlugin } from 'vite';
// Import vite-plugin-static-copy with the correct syntax
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add history fallback for client-side routing
    historyApiFallback: true, 
  },
  plugins: [
    react(),
    splitVendorChunkPlugin(), // Split vendor chunk for better caching
    mode === 'development' && componentTagger(),
    mode === 'production' && visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for production
    target: 'es2018',
    outDir: 'dist',
    assetsDir: 'assets',
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
    },
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create specific chunks for large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-lucide';
            }
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            if (id.includes('@tanstack')) {
              return 'vendor-tanstack';
            }
            if (id.includes('sonner') || id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'vendor-ui-utils';
            }
            // Other node modules go to vendor
            return 'vendor';
          }
          // Group UI components together
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          // Group pages together
          if (id.includes('/pages/')) {
            return 'pages';
          }
        },
        // Ensure chunk size is reasonable
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Enable source maps for production (helps with monitoring)
    sourcemap: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
  },
  // Enable tree shaking
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    esbuildOptions: {
      treeShaking: true,
    },
  },
}));
