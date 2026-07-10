import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages pubblica il sito su tuonome.github.io/Progetto-settimana-10/,
  // non sulla radice del dominio: senza "base" tutti i link a JS/CSS
  // punterebbero alla radice sbagliata e la pagina risulterebbe bianca.
  base: '/Progetto-settimana-10/',
  plugins: [react()],
})
