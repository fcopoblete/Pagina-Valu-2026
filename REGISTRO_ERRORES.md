<!--
Que hace el archivo: Bitácora centralizada de registro de errores, causas raíz y soluciones implementadas en el proyecto Centro Valú para evitar recurrencias futuras.
Fecha de última modificación: 2026-10-14
Nombre del autor: Antigravity & fcopoblete
-->
# 🛡️ Registro de Errores y Lecciones Técnicas - Centro Valu

Este documento consolida el historial de incidentes y errores técnicos detectados en el desarrollo del ecosistema digital de Centro Valú, identificando dónde ocurrieron, por qué ocurrieron y cuál fue la solución adoptada para evitar recurrencias en el futuro.

---

## 📋 Índice de Incidentes

1. [Error de Contraste: Texto de Direcciones Oculto en Modo Oscuro](#1-error-de-contraste-texto-de-direcciones-oculto-en-modo-oscuro)
2. [Error de Renderizado: Píldora de Sucursales Ilegible por Tokens Faltantes en Tailwind](#2-error-de-renderizado-píldora-de-sucursales-ilegible-por-tokens-faltantes-en-tailwind)
3. [Error de Consola: Manifest 404 en Ruta Absoluta bajo `file:///`](#3-error-de-consola-manifest-404-en-ruta-absoluta-bajo-file)
4. [Error CORS: Peticiones `fetch` Locales en Contador de Especialistas](#4-error-cors-peticiones-fetch-locales-en-contador-de-especialistas)
5. [Error de Activos: 404 en `placeholder.webp` del Buscador Global](#5-error-de-activos-404-en-placeholderwebp-del-buscador-global)
6. [Error de Espaciado: Acumulación de Paddings Verticales en Secciones](#6-error-de-espaciado-acumulación-de-paddings-verticales-en-secciones)

---

## 1. Error de Contraste: Texto de Direcciones Oculto en Modo Oscuro

- **Dónde ocurrió:** En la sección `#contacto` de `index.html` y `#ubicacion` de `gimnasio-terapeutico.html`, dentro de las tarjetas de las sedes Parque Lauca y Gil de Castro.
- **Por qué ocurrió:** Se utilizó la clase CSS heredada `.contact-priority-bold`, la cual tenía una regla fija en la hoja de estilos: `color: #0f172a;` (color casi negro). Al renderizarse sobre tarjetas y fondos oscuros (`bg-slate-900`/`bg-slate-950`), el texto se volvió invisible por falta total de contraste (negro sobre negro).
- **Cómo se solucionó:**
  1. Se eliminó la clase `.contact-priority-bold` de los contenedores oscuros.
  2. Se aplicaron clases directas de Tailwind con contraste validado: `text-primary-300 font-semibold`.
  3. Se estableció como regla de diseño en `centro-valu-meta-skill` la prohibición de usar clases con colores oscuros fijos dentro de temas oscuros.

---

## 2. Error de Renderizado: Píldora de Sucursales Ilegible por Tokens Faltantes en Tailwind

- **Dónde ocurrió:** En el badge superior "Atención Presencial en Coquimbo" (`index.html`) y "Presencia en Coquimbo" (`gimnasio-terapeutico.html`).
- **Por qué ocurrió:** Se utilizaron clases utilitarias como `text-primary-300` y `bg-primary-400`. Sin embargo, el script `tailwind.config` solo tenía definidos los tonos `50`, `100`, `500`, `600`, `700` dentro de `primary`. Al no existir la definición, el CDN de Tailwind no generaba la regla CSS y el navegador heredaba un color oscuro no deseado.
- **Cómo se solucionó:**
  1. Se amplió la escala en el objeto `primary` de `tailwind.config` añadiendo `200: '#bce8e8'`, `300: '#99dede'` y `400: '#8be0e0'`.
  2. Para garantizar legibilidad AAA independiente de cualquier resolución o dispositivo, se fijó el texto del badge con `text-white font-bold tracking-wider` sobre fondo `bg-primary-500/25 border-primary-400/60 backdrop-blur-sm` con indicador pulsante.

---

## 3. Error de Consola: Manifest 404 en Ruta Absoluta bajo `file:///`

- **Dónde ocurrió:** En `index.html` y `gimnasio-terapeutico.html` al abrir los archivos directamente en el navegador local (`file:///C:/Users/.../index.html`).
- **Por qué ocurrió:** La etiqueta de enlace al manifiesto usaba barra inicial absoluta: `<link rel="manifest" href="/manifest.webmanifest">`. Bajo el protocolo `file://`, el navegador intentaba resolver la ruta en la raíz del disco duro (`file:///C:/manifest.webmanifest`), arrojando error 404 y bloqueo CORS.
- **Cómo se solucionó:**
  1. Se normalizó la etiqueta a ruta relativa: `<link rel="manifest" href="manifest.webmanifest">`.
  2. De esta forma funciona transparentemente tanto en testing local con doble clic como en despliegues sobre AWS Amplify / CloudFront.

---

## 4. Error CORS: Peticiones `fetch` Locales en Contador de Especialistas

- **Dónde ocurrió:** En la función `updateSpecialistCount` de `index.html`.
- **Por qué ocurrió:** La función intentaba hacer `fetch('profesionales.html')` para parsear y contar dinámicamente las tarjetas del equipo. Al probar en local sin un servidor HTTP activo, el navegador bloqueaba la petición por política de origen de `file://`.
- **Cómo se solucionó:**
  1. Se rediseñó la función de forma defensiva para verificar primero si `window.searchData` ya se encuentra disponible en memoria.
  2. Si está en memoria, filtra los elementos con `type: 'profesional'` sin necesidad de llamadas de red.
  3. Se mantuvo un fallback por si no se detecta la lista, evitando errores no capturados en consola.

---

## 5. Error de Activos: 404 en `placeholder.webp` del Buscador Global

- **Dónde ocurrió:** En el buscador (`assets/js/search-logic.js`) al realizar búsquedas que arrojaban como resultado a la profesional Pamela Tarifeño.
- **Por qué ocurrió:** El dato en `search-data.js` referenciaba `assets/img/team/placeholder.webp` para los profesionales que aún no tenían foto recortada en producción, pero el archivo WebP no existía físicamente en el repositorio.
- **Cómo se solucionó:**
  1. Se generó un archivo corporativo WebP de 1000x1000 px con fondo transparente y logo de Centro Valú en `assets/img/team/placeholder.webp`.
  2. Se añadió un manejador `onerror` en el renderizado de imágenes de `search-logic.js` para asegurar que ningún enlace roto afecte la experiencia de usuario.

---

## 6. Error de Espaciado: Acumulación de Paddings Verticales en Secciones

- **Dónde ocurrió:** Entre la sección CTA ("Empieza tu camino hoy") y la sección de sucursales (`#contacto`).
- **Por qué ocurrió:** Ambas secciones contiguas compartían el mismo fondo (`bg-slate-950`). La primera aplicaba `py-24` y la segunda `py-24 lg:py-32`, además de márgenes de encabezado de `mb-16`, generando una separación vertical de más de 300px que parecía un espacio vacío roto.
- **Cómo se solucionó:**
  1. Se redujo el padding inferior de la primera sección a `pb-8` y el superior de la sección de contacto a `pt-6`.
  2. Se armonizaron los márgenes inferiores de títulos y subtítulos a `mb-3` y `mb-8`.
  3. Se redujo la altura de los mapas a `h-64 sm:h-72` para lograr una estética compacta y proporcionada.
