# Nostr Scrutiny

*Read in English: [README.md](README.md)*

Fichas sobre clientes de Nostr: **quién está detrás, qué hacen con tus claves, su código y su privacidad.** Solo hechos y fuentes: sin notas ni veredictos. Inspirado en [WalletScrutiny](https://walletscrutiny.com), que hace esto con las carteras de Bitcoin.

## Cómo se hace una ficha

1. `clients/<cliente>.json` dice dónde mirar: la web, los identificadores de App Store y Google Play, el repositorio, la política de privacidad.
2. `npm run collect <cliente>` reúne lo que se puede comprobar y lo guarda, con fecha, en `data/<cliente>/<fecha>.json` (la política de privacidad se guarda literal al lado):
   - **App Store** (la API de búsqueda de Apple) y **Google Play** (la ficha y su página de Seguridad de los datos): quién publica la app, datos de contacto, qué declara sobre los datos;
   - **el repositorio**: licencia, último commit, última versión publicada;
   - **la web**, abierta en un navegador real como visitante nuevo: con qué otros sitios habla, a qué relés se conecta, cookies, almacenamiento y cabeceras de seguridad;
   - **NIP-89**: el anuncio de la propia app en Nostr, si lo tiene.
3. Una persona redacta la ficha en `sheets/<cliente>.md` a partir de esos datos y de las fuentes que enlaza. Cada afirmación apunta a una fuente; lo que no se pudo comprobar se dice.

## Uso

```bash
npm install
npx playwright install chromium   # una vez
npm run collect quill
```

## Licencia

MIT
