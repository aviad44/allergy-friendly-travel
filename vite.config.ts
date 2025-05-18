
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

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
        pure_funcs: ['console.log', 'console.debug', 'console.info'],
        passes: 2, // Additional passes for better minification
      },
      mangle: {
        safari10: true, // Better Safari support
      },
    },
    // Improved code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@/components/ui/button', 
            '@/components/ui/card', 
            '@/components/ui/toast'
          ],
          'charts': ['recharts'],
          'icons': ['lucide-react'],
          'form-handling': ['@hookform/resolvers', 'react-hook-form', 'zod'],
          'date-handling': ['date-fns'],
        },
        // Ensure chunk size is reasonable
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          // Put images in a separate directory with better caching
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          // Put CSS in a separate directory
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          // Default for other assets
          return 'assets/[ext]/[name]-[hash][extname]';
        },
      },
    },
    // Enable source maps for production (helps with monitoring)
    sourcemap: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Enable module preload polyfill for better browser support
    modulePreload: {
      polyfill: true,
    },
    // Generate compressed files for CDN serving
    reportCompressedSize: true,
  },
  // Enhanced tree shaking
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      treeShaking: true,
    },
  },
  // Handle proper path-based code splitting for dynamic imports
  experimental: {
    renderBuiltUrl(filename) {
      return `/${filename}`;
    },
  },
}));
