<!--
Que hace el archivo: Bitácora de Obsidian que documenta el lanzamiento de la nueva sucursal Gil de Castro 122, el Gimnasio Terapéutico y de Estimulación Temprana (hasta 4 años, Mar a Sáb), el rediseño de ubicaciones en 2 columnas con mapas de Google Maps embebidos, y la actualización de equipo profesional y modalidades de TO.
Fecha de última modificación: 2026-11-23
Nombre del autor: Antigravity & fcopoblete
-->
# 🗺️ Bitácora: Nueva Sucursal Gil de Castro, Gimnasio Terapéutico y Rediseño de Ubicaciones en 2 Columnas

Bitácora técnica de arquitectura web y experiencia de usuario que documenta la apertura de la segunda sede de Centro Valú, la ampliación etaria del Gimnasio Terapéutico (hasta los 6 años), la implementación de la sección de sucursales en dos columnas con Google Maps embebidos, y las lecciones aprendidas sobre variables de Tailwind CSS y reglas de contraste en fondos oscuros.

---

## 📍 1. Contexto Estratégico: Expansión a Dos Sedes en Coquimbo

Centro Valú expandió su infraestructura física habilitando dos sedes con propósitos clínicos complementarios:

1. **Sede Central (Parque Nacional Lauca 1612, Bosque San Carlos, Coquimbo):**
   - Enfoque: Psicología Infanto-Juvenil y Adultos, Pediatría Integral, Evaluaciones Clínicas (ADOS-2, WISC-V, ADI-R) y Convenio Fonasa.
2. **Nueva Sede (Gil de Castro 122, Coquimbo):**
   - Enfoque: Gimnasio Terapéutico y de Estimulación Temprana, Fonoaudiología, Terapia Ocupacional, Apoyo Escolar y Psicopedagogía.

---

## 🧸 2. Actualización del Gimnasio Terapéutico

### 2.1 Rango de Edad: Ampliación "Hasta 6 años"
- **Definición previa:** Primera infancia (0 a 2 años).
- **Nueva definición clínica:** Niños y niñas de **hasta 6 años**, cubriendo lactantes, caminantes y primera infancia preescolar.
- **Sincronización:** Metatags, Schema JSON-LD `MedicalWebPage`, copy editorial, badges y FAQ en [gimnasio-terapeutico.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/gimnasio-terapeutico.html), tarjeta en [index.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/index.html), [formulario-contacto.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/formulario-contacto.html), [search-data.js](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/assets/js/search-data.js) y [llms.txt](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/llms.txt).

### 2.2 Limpieza de Iconografía (Emoji de Oso)
- Se eliminó el emoji `🧸` de todos los desplegables de navegación, menús móviles y opciones de formularios para mantener una estética clínica premium y sobria.

---

## 🗺️ 3. Rediseño de Ubicaciones: Cuadrícula en 2 Columnas con Google Maps Embebido

### 3.1 Estructura Visual
Tanto en [index.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/index.html) como en [gimnasio-terapeutico.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/gimnasio-terapeutico.html), la sección de ubicación adoptó un esquema simétrico:

- **Columna Izquierda:** Sede Central Parque Lauca 1612.
- **Columna Derecha:** Nueva Sede Gil de Castro 122.
- **Elementos por Columna:**
  - Badge identificador (`📍 Sede Central` / `✨ Nueva Sede 2026`).
  - Nombre del recinto y dirección física normalizada.
  - Botón de apertura externa en Google Maps / Waze (`target="_blank"` y `rel="noopener noreferrer"`).
  - Iframe interactivo de Google Maps embebido (`h-64 sm:h-72`).
- **Barra Inferior Unificada:**
  - Horarios centralizados (Lunes a Viernes 09:00 - 19:30, Sábados 09:00 - 14:00).
  - Canales directos (+569 7245 4921 / centrovalu@gmail.com).
  - CTA de contacto / admisión.

### 3.2 Decisión de Diseño: Retiro de Chips de Especialidades en Sedes
Por solicitud directa del usuario, se eliminó el listado de especialidades dentro de las tarjetas de sedes, logrando que el usuario visualice inmediatamente el nombre, la dirección y el mapa sin sobrecarga de texto.

---

## ⚠️ 4. Lecciones Técnicas y Corrección de Errores

### 4.1 Conflicto de Clase `.contact-priority-bold` en Modo Oscuro
- **Problema:** El texto de las direcciones se veía casi negro sobre el fondo `slate-950`.
- **Causa Raíz:** Una regla CSS global definía `.contact-priority-bold { color: #0f172a; font-weight: 800; }` (#0f172a = slate-900). Al aplicarse sobre el contenedor oscuro, forzaba el color negro.
- **Solución:** Se retiró dicha clase de las secciones oscuras y se aplicaron clases directas de alto contraste (`text-primary-300 font-semibold`).

### 4.2 Escalas Faltantes en `tailwind.config`
- **Problema:** La píldora "Atención Presencial en Coquimbo" se visualizaba con texto oscuro e ilegible.
- **Causa Raíz:** `tailwind.config` solo tenía configurados `50`, `100`, `500`, `600`, `700` en la clave `primary`. Clases como `text-primary-300` o `bg-primary-400` no eran generadas por Tailwind CDN.
- **Solución:** Se amplió la escala en `index.html` y `gimnasio-terapeutico.html` añadiendo `200: '#bce8e8'`, `300: '#99dede'` y `400: '#8be0e0'`. Para garantizar contraste AAA absoluto, el texto de la píldora se fijó en blanco nítido (`text-white font-bold tracking-wider`) con luz pulsante turquesa.

### 4.3 Fallback de Imágenes del Equipo y Compatibilidad Local
- **Problema:** 404 en `assets/img/team/placeholder.webp` para Pamela Tarifeño y bloqueos CORS al abrir vía protocolo `file://`.
- **Solución:** Creación del WebP corporativo de 1000x1000 px, manejo defensivo en `search-logic.js` y protección en `updateSpecialistCount` usando `searchData` sin invocaciones remotas de red.

---

## ✅ 5. Verificación y Calidad

- **Pruebas Unitarias:** Ejecución de `python -m unittest tests/test_compliance_and_search.py` pasando al 100% (7/7 tests).
- **Ramas Git:** Cambios comiteados y desplegados en `origin/test` (commits `efac7bf`, `695cabc` y `4b3c8e4`).

---

## 📸 6. Actualización Selectiva en Producción: Fotografía de Bruno Araya (2026-10-28)

- **Requerimiento:** Actualizar la fotografía del fonoaudiólogo Bruno Araya en producción (`main`) sin desplegar los cambios en curso de la nueva sucursal y Gimnasio Terapéutico alojados en `test`.
- **Procesamiento de Imagen (`assets/img/team/bruno-araya.webp`):**
  - A partir del archivo original `assets/img/team/originales/bruno-araya.jpeg`, se eliminó el fondo oscuro a transparencia total con bordes suavizados.
  - Encuadre estandarizado en lienzo `1000x1000 px`, alineación basal (`y=1000`) y aire superior del 15.8% (`y=158`), logrando un peso optimizado de **34.5 KB** (< 100 KB).
- **Cache-Busting (`?v=202610`):** Sincronizado en `assets/js/pro-data.js`, `assets/js/search-data.js`, `fonoaudiologia.html` y `profesionales.html`.
- **Estrategia Git Multi-Rama:** Se aplicó el commit tanto en `test` (`4b3c8e4`) como de forma aislada en `main` (`4550088`), manteniendo intacto el aislamiento del Gimnasio Terapéutico hasta su lanzamiento oficial.

---

## 🧸 7. Actualización de Imágenes del Gimnasio y Reestructuración de Terapia Ocupacional (2026-11-18)

- **Fotografías Reales del Gimnasio Terapéutico (`assets/img/gimnasio/`):**
  - **Hero Principal:** Reemplazo de render/stock por `Colgantes.jpeg` (estimulación vestibular y hamacas suspendidas).
  - **Galería de Espacios:**
    - Izquierda: `Sensorial.jpeg` con encuadre inferior optimizado (`object-[center_90%]`) y aspect ratio `4/3` para visualización íntegra de bandejas de estimulación táctil.
    - Derecha: `piscina pelotas.jpeg` mostrando el área de psicomotricidad y piscina de pelotas.
- **Terapia Ocupacional (`terapia-ocupacional.html`):**
  - Actualización de imagen Hero con `Colgantes.jpeg`.
  - Incorporación de dos nuevas áreas de desarrollo:
    - **Habilidades Sociales:** Fomento de interacción lúdica, turnos, límites y resolución con pares.
    - **Selectividad Alimentaria:** Abordaje sensible de dificultades sensoriales (texturas, sabores y olores).
  - Incorporación de la sección **Modalidades y Programas** (Evaluación de TO, Plan Individual, Plan en Pareja, Plan Grupal).
- **Desvinculación de Profesionales:**
  - Retiro de Valeria Alfaro (TO) y Priscilla Figueroa (Psicología) de:
    - `profesionales.html`
    - `psicologia.html`
    - `terapia-ocupacional.html` (reemplazado por tarjeta de atención institucional del equipo de TO)
    - Base de datos de drawer `assets/js/pro-data.js`
    - Índice del buscador `assets/js/search-data.js`
- **Control de Calidad Automatizado:**
  - Ampliación de la suite de pruebas unitarias (`tests/test_compliance_and_search.py`), totalizando **9/9 tests exitosos**.

---

## 👥 8. Incorporación de Profesionales y Ajustes de Operación (2026-11-23)

- **Nuevas Profesionales:**
  - **Claudia Salgado:** Terapeuta Ocupacional (U. Católica de Temuco). Integrada en `profesionales.html`, `terapia-ocupacional.html` y como especialista sensorial en `gimnasio-terapeutico.html`.
  - **Camila Lorca:** Kinesióloga (U. de Chile). Especialista en neurokinesiología pediátrica, integrada en `profesionales.html` (sección Kinesiología) y `gimnasio-terapeutico.html` (desarrollo motor).
  - **Valentina Castillo:** Educadora de Párvulos (U. Central). Integrada en `psicopedagogia.html`, `profesionales.html` y `gimnasio-terapeutico.html` (desarrollo cognitivo y juego).
- **Ajustes Operativos y Clínicos en Gimnasio Terapéutico:**
  - Rango de atención: Ajustado a **hasta los 4 años**.
  - Horario: Establecido de **Martes a Sábado**.
  - Tarifas en Landing: Se retiraron los precios explícitos en las tarjetas de planes, priorizando el número de sesiones y frecuencia mensual para consulta directa.
- **Terapia Ocupacional:**
  - Atención exclusiva en **Sede Gil de Castro 122** con ruteo automático en `formulario-contacto.html`.
  - Reemplazo de *Plan en Pareja* por **Plan Dúo**.
  - Ajuste en Plan Grupal agregando *"y necesidades de apoyo mutuo"*.
- **Suite de Pruebas:**
  - Ampliación a **10/10 tests unitarios exitosos** cubriendo las nuevas incorporaciones y reglas de negocio.
