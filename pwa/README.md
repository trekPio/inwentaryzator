# Inwentaryzator – próba instalacji jako aplikacja (PWA)

Kopia `..\inwentaryzator.html` (wersja 20261118_h15m19) z dodatkami PWA. Oryginał i `..\GitHub_Pages\` bez zmian.

Zmiany względem oryginału (`index.html`):
- w `<head>`: link do `manifest.webmanifest` i ikon,
- przed `</body>`: rejestracja `sw.js` (praca bez sieci) i `navigator.storage.persist()` (system nie skasuje danych spisu przy braku miejsca).

Nowe pliki: `manifest.webmanifest`, `sw.js`, `ikony\ikona-192.png`, `ikona-512.png`, `ikona-maskable-512.png`.

## Test
1. Wgrać zawartość tego folderu do repozytorium `trekPio/inwentaryzator` jako podfolder `pwa/`
   → adres próby: https://trekpio.github.io/inwentaryzator/pwa/ (strona główna działa jak dotąd).
2. Na telefonie w Chrome otworzyć adres, menu ⋮ → „Zainstaluj aplikację” / „Dodaj do ekranu głównego”.
3. Sprawdzić: ikona w szufladzie aplikacji, okno bez paska adresu, kamera, eksport, start w trybie samolotowym.

Uwaga: wersja przeglądarkowa i próba PWA są pod tą samą domeną `trekpio.github.io`, więc **widzą ten sam zapisany spis** (wspólna pamięć przeglądarki, klucz `inwentaryzator.v2`).

Wycofanie: odinstalować aplikację z telefonu i usunąć folder `pwa/` z repozytorium.
