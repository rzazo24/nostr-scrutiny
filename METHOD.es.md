# Cómo revisa Nostr Scrutiny un cliente

*Read in English: [METHOD.md](METHOD.md)*

## Principios

- **Solo hechos y fuentes.** Una ficha dice lo que muestra una fuente y la enlaza. Sin puntuaciones, notas ni veredictos: cada lector juzga.
- **Cada afirmación apunta a una fuente:** la ficha de una tienda de apps, una política de privacidad, una línea de código publicado o lo que hizo la app al abrirla en un navegador. Los datos recogidos se guardan en `data/`, con fecha, para poder rastrear cada afirmación.
- **Lo que no se pudo comprobar se dice**, en su propio apartado de cada ficha.
- **Cuando las fuentes no coinciden, se citan las dos**, una junto a otra, sin suponer el porqué más allá de lo que digan las propias fuentes.
- **No se repiten datos personales.** Las fichas de las tiendas a veces muestran una dirección de vivienda o un teléfono; la ficha nombra a la entidad y la ciudad, nunca una calle ni un número.
- **Transparencia.** El autor de Nostr Scrutiny también hace el cliente Quill. Quill pasa exactamente las mismas comprobaciones y su ficha lo dice lo primero.
- **Con fecha.** Las apps cambian; cada ficha dice cuándo se revisó y se vuelve a revisar de vez en cuando.

## Qué se comprueba

1. **Quién está detrás:** el vendedor o desarrollador que nombran App Store y Google Play, el operador que nombra la política de privacidad, lo que dice el propio desarrollador y el anuncio NIP-89 de la app en Nostr (kind 31990), si lo tiene.
2. **Tus claves:** dónde guarda la app una clave privada y si puede firmar sin tenerla (firmadores remotos, NIP-46; apps firmadoras de Android, NIP-55; extensiones del navegador, NIP-07). Según la política y el código publicado.
3. **Código:** licencia, último commit y última versión del repositorio publicado, comparados con las fechas de las versiones en las tiendas.
4. **Privacidad declarada:** la política de privacidad (guardada literal en la fecha de la revisión) y las etiquetas de privacidad de las tiendas («Seguridad de los datos» de Google Play).
5. **Privacidad observada:** la web de la app (o su página, si no tiene web) abierta en un navegador real como visitante nuevo, sin pulsar nada, durante 8 segundos: con qué otros sitios habla el navegador, a qué relés o servicios se conecta, cookies, almacenamiento y cabeceras de seguridad. En las apps, se busca en el código publicado si llevan analítica, informes de errores o librerías de notificaciones push.

## Qué no se comprueba (todavía)

- Si lo que hay en las tiendas coincide con el código publicado (compilaciones reproducibles).
- El tráfico de red de las apps nativas una vez instaladas.
- Las etiquetas de privacidad de la App Store (la API pública de Apple no las da).

## Correcciones

Si una ficha está mal o desactualizada, abre una incidencia en este repositorio con la fuente que lo muestra, o responde en Nostr a la nota que publicó la ficha. Se corrige comprobando la fuente, y la ficha se vuelve a fechar.
