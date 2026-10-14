<!--
Que hace el archivo: Bitácora de Obsidian que documenta la auditoría de cobertura SEO en Google Search Console para Centro Valu (septiembre 2026), diagnóstico de páginas no indexadas, normalización de enlaces relativos .html, inyección de canónicas y protocolo de re-validación.
Fecha de última modificación: 2026-09-23
Nombre del autor: Antigravity & fcopoblete
-->
# 🌐 Auditoría SEO e Indexación Google Search Console - Centro Valu

Bitácora técnica sobre la auditoría de cobertura e indexación orgánica de `centrovalu.cl`, resolución de errores 404, eliminación de redirecciones por enlaces con extensión `.html`, inyección de etiquetas canónicas y protocolo de validación en Google Search Console.

---

## 📊 1. Estado de Cobertura en Google Search Console (GSC)

Al corte del **23 de septiembre de 2026**, Google Search Console reportó un total de **20 páginas conocidas**:
* **Páginas Indexadas:** **12** (con un promedio de **200 a 250 impresiones diarias** en Google Search).
* **Páginas No Indexadas:** **8** distribuidas según los siguientes motivos técnicos:

| Motivo en GSC | Cantidad | Fuente | Diagnóstico Técnico |
| :--- | :---: | :--- | :--- |
| **Descubierta: actualmente sin indexar** | **4** | Google | Googlebot detectó las URLs en el `sitemap.xml`, pero aún no las incluye en la cola inmediata de rastreo por gestión de *crawl budget*. Comportamiento habitual en sitios jóvenes. |
| **Página con redirección** | **2** | Sitio web | URLs que responden con código HTTP 301/302. Originadas por la migración de URLs antiguas con extensión `.html` a URLs limpias o variantes HTTP/HTTPS. Google descarta el origen e indexa el destino. |
| **No se ha encontrado (404)** | **1** | Sitio web | Petición a una URL que no existe en el servidor, originada por enlaces relativos inconsistentes en el código HTML. |
| **Rastreada: actualmente sin indexar** | **1** | Google | Googlebot leyó la página pero no la indexó (frecuente en páginas legales con texto secundario o páginas con directiva `noindex` como `/llenado-datos`). |

---

## 🔍 2. Análisis de Causa Raíz (Root Cause Analysis)

A través de la suite de scripts de diagnóstico automatizado, se identificaron dos inconsistencias principales en el código fuente:

### A. Enlaces relativos con extensión `.html` en botones CTA
En 5 páginas de especialidades clínicas, el botón de llamado a la acción (CTA) de agendamiento apuntaba a:
```html
<!-- INCORRECTO: Ruta relativa con extensión .html -->
<a href="formulario-contacto.html?especialidad=[área]">Contáctanos</a>
```
Al encontrarse el usuario o Googlebot en una URL limpia como `https://centrovalu.cl/psicologia`, el navegador/crawler resolvía este enlace relativo como `https://centrovalu.cl/formulario-contacto.html?especialidad=psicologia`. Dependiendo de las reglas de rewrite de AWS Amplify/CloudFront, esto provocaba redirecciones 301 o respuestas 404.

### B. Ausencia de etiqueta canónica en `formulario-formacion.html`
Mientras que las otras 16 páginas del sitio contaban con su respectivo `<link rel="canonical">`, el formulario de formación profesional carecía de esta etiqueta, impidiendo a Google determinar con certeza la URL principal preferida.

---

## 🛠️ 3. Solución Técnica Implementada

### A. Normalización a URLs Absolutas y Limpias
Se modificaron los 5 botones de agendamiento para usar rutas absolutas, limpias y libres de `.html`:
* `psicologia.html`: `href="/formulario-contacto?especialidad=psicologia"`
* `pediatria.html`: `href="/formulario-contacto?especialidad=pediatria"`
* `fonoaudiologia.html`: `href="/formulario-contacto?especialidad=fonoaudiologia"`
* `terapia-ocupacional.html`: `href="/formulario-contacto?especialidad=terapia-ocupacional"`
* `psicopedagogia.html`: `href="/formulario-contacto?especialidad=psicopedagogia"`

### B. Inyección de Canonical en Formación
Se agregó en el `<head>` de `formulario-formacion.html`:
```html
<!-- Canonical Link -->
<link rel="canonical" href="https://centrovalu.cl/formulario-formacion" />
```

### C. Validación Automatizada
* **Verificación de Enlaces (`check_links.py`):** 26 rutas internas analizadas -> **0 enlaces rotos**, **0 enlaces con `.html`**.
* **Verificación de Canónicas (`check_pages.py`):** 17 archivos HTML evaluados -> **100% de páginas públicas con URL canónica oficial**, `llenado-datos.html` aislado con `noindex, nofollow`.

---

## 🚀 4. Protocolo de Re-Validación en Google Search Console

Una vez que el despliegue automático en AWS Amplify concluya:

1. **Acceder a Google Search Console:**
   * Entrar a la propiedad de dominio `centrovalu.cl`.
   * Ir al menú lateral > **Indexación** > **Páginas**.
2. **Validar Errores 404:**
   * Hacer clic en la fila **No se ha encontrado (404)**.
   * Presionar el botón azul **Iniciar validación**.
3. **Validar Redirecciones:**
   * Hacer clic en la fila **Página con redirección**.
   * Presionar el botón azul **Iniciar validación**.
4. **Inspección de URLs Clave (Opcional):**
   * En el buscador superior de GSC, pegar las URLs de especialidades principales (ej. `https://centrovalu.cl/fonoaudiologia`).
   * Si figura como "Descubierta: sin indexar", presionar **Solicitar indexación** para priorizarla en la cola de Googlebot.

---

## 📜 5. Estándares Inquebrantables de Indexación para Centro Valu

1. **Cero extensiones `.html` en `href`:** Todo enlace interno debe escribirse en formato absoluto limpio (ej. `/profesionales`, `/convenios`).
2. **Canonical Obligatorio:** Todo nuevo archivo `.html` público debe contener `<link rel="canonical" href="https://centrovalu.cl/[slug]" />` apuntando a su versión sin extensión y sin slash final.
3. **Aislamiento de Herramientas Internas:** Formularios o vistas internas (`/llenado-datos`) deben mantener `<meta name="robots" content="noindex, nofollow">` y excluirse de la navegación pública para no degradar el presupuesto de rastreo.
