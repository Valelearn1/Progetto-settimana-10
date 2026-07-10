import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);

// Registriamo il service worker solo se il browser lo supporta, e solo
// dopo che la pagina ha finito di caricarsi (per non rallentare il
// caricamento iniziale con questa operazione extra).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // import.meta.env.BASE_URL è il valore di "base" da vite.config.js
    // (es. "/Progetto-settimana-10/" in produzione, "/" in sviluppo locale).
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
  });
}
