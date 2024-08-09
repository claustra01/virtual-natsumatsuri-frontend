import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({filename: 'dist/stats.html'}),],
})
