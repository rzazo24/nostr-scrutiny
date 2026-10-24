# Nostr Scrutiny

*Read in English: [README.md](README.md)*

**En línea: https://scrutiny.hivescope.xyz**

Fichas sobre clientes de Nostr: **quién está detrás, qué hacen con tus claves, su código y su privacidad.** Solo hechos y fuentes: sin notas ni veredictos. Inspirado en [WalletScrutiny](https://walletscrutiny.com), que hace esto con las carteras de Bitcoin.

Cada ficha pone una junto a otra lo que dicen las tiendas de apps, lo que dice la política de privacidad, lo que muestra el código publicado y lo que hace la app al abrirla en un navegador, y dice dónde no coinciden. Cómo se hace y qué no se comprueba todavía: [METHOD.es.md](METHOD.es.md).

## Fichas

| Cliente | Revisado |
| --- | --- |
| [Amethyst](sheets/amethyst.md) | 2026-10-24 |
| [Damus](sheets/damus.md) | 2026-10-24 |
| [Nostrich](sheets/nostrich.md) | 2026-10-24 |
| [Primal](sheets/primal.md) | 2026-10-24 |
| [Quill](sheets/quill.md) | 2026-10-24 |

Las fichas están en inglés. Transparencia: Quill lo hace el autor de Nostr Scrutiny; pasa las mismas comprobaciones.

## Cómo se hace una ficha

1. `clients/<cliente>.json` dice dónde mirar: la web, los identificadores de App Store y Google Play, el repositorio, la política de privacidad.
2. `npm run collect <cliente>` reúne lo que se puede comprobar y lo guarda, con fecha, en `data/<cliente>/<fecha>.json` (la política de privacidad se guarda literal al lado):
   - **App Store** (la API de búsqueda de Apple) y **Google Play** (la ficha y su página de Seguridad de los datos): quién publica la app, datos de contacto, qué declara sobre los datos;
   - **el repositorio**: licencia, último commit, última versión publicada;
   - **la web**, abierta en un navegador real como visitante nuevo: con qué otros sitios habla, a qué relés se conecta, cookies, almacenamiento y cabeceras de seguridad;
   - **NIP-89**: el anuncio de la propia app en Nostr, si lo tiene.
3. Una persona lee el código publicado para lo que los recolectores no pueden juzgar (dónde se guardan las claves, firmadores, analítica) y redacta la ficha en `sheets/<cliente>.md`. Cada afirmación apunta a una fuente; lo que no se pudo comprobar se dice.

Añadir un cliente: [CONTRIBUTING.md](CONTRIBUTING.md) (en inglés). Si algo está mal o desactualizado: abre una incidencia con la fuente que lo muestra.

## Uso

```bash
npm install
npx playwright install chromium   # una vez, para los recolectores
npm run collect quill             # reunir datos de un cliente
npm test                          # las fichas siguen el método; la web se construye limpia
npm run build                     # la web, en site/
./scripts/deploy.sh <ruta-al-repo-del-relé> scrutiny.hivescope.xyz   # publicar con el Caddy del relé
```

La web es HTML y una hoja de estilos: sin scripts, sin cookies y sin nada cargado de otros sitios, servida con una Content-Security-Policy estricta.

## Licencia

MIT
