// Inwentaryzator – service worker (próba PWA)
// Strona: najpierw sieć (żeby nowa wersja docierała od razu), bez sieci – kopia z pamięci.
// Zmiana WERSJA_CACHE wymusza odświeżenie zapisanych plików.
var WERSJA_CACHE = "inwentaryzator-pwa-20261118";
var PLIKI = ["./", "./index.html", "./manifest.webmanifest",
             "./ikony/ikona-192.png", "./ikony/ikona-512.png", "./ikony/ikona-maskable-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(WERSJA_CACHE).then(function (c) { return c.addAll(PLIKI); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (klucze) {
    return Promise.all(klucze.filter(function (k) { return k.indexOf("inwentaryzator-pwa-") === 0 && k !== WERSJA_CACHE; })
                             .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;   // CDN itp. – bez zmian
  e.respondWith(
    fetch(r).then(function (odp) {
      if (odp && odp.ok) { var kopia = odp.clone(); caches.open(WERSJA_CACHE).then(function (c) { c.put(r, kopia); }); }
      return odp;
    }).catch(function () {
      return caches.match(r, { ignoreSearch: true }).then(function (z) {
        return z || (r.mode === "navigate" ? caches.match("./index.html") : undefined);
      });
    })
  );
});
