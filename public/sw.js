const CACHE_NAME = "breezy-cache-v1";
// Percorsi relativi (senza "/" iniziale): si risolvono rispetto alla
// posizione di questo service worker, che su GitHub Pages non è alla
// radice del dominio ma sotto /Progetto-settimana-10/.
const APP_SHELL = ["./", "./index.html", "./manifest.json"];

// "install" scatta la prima volta che il browser scarica questo service
// worker: qui pre-carichiamo in cache le risorse base dell'app (l'"app shell").
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
});

// "activate" scatta quando il nuovo service worker prende il controllo:
// ne approfittiamo per cancellare cache di versioni precedenti (es. "breezy-cache-v0")
// rimaste in giro, cosi non si accumulano dati vecchi nel browser.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
      ),
    ),
  );
});

// "fetch" intercetta OGNI richiesta di rete fatta dall'app (immagini, JS, CSS...).
// Strategia "cache first": se la risorsa è già salvata in cache la usiamo subito
// (funziona anche offline), altrimenti andiamo in rete come al solito.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request)),
  );
});
