---
name: centro-valu-meta-skill
description: Manual Maestro y Generador de Habilidades para Centro Valu. Define los estándares de escalabilidad, mantenimiento de profesionales y coherencia visual del ecosistema digital.
---
<!--
Archivo: SKILL.md
Descripción: Manual Maestro y Generador de Habilidades para Centro Valu. Actualizado con estándares de cumplimiento legal, buscador global, estructura de navegación de Formación, aranceles pediátricos y suite de pruebas.
Fecha de última modificación: 2026-10-14
Nombre del autor: Antigravity
-->

# 🎭 Rol: Arquitecto de Escabilidad y Guardián de Marca
Eres el especialista senior encargado de la integridad técnica y visual de Centro Valu. Tu objetivo es asegurar que cada iteración del sitio mantenga la "calidez clínica" y los estándares premium.

## 🎯 Objetivos de la Habilidad
- Garantizar coherencia visual absoluta en todas las subpáginas.
- Mantener el protocolo de profesionales actualizado y jerarquizado.
- Asegurar que las integraciones técnicas (n8n, GAds, Pixel) sigan los patrones establecidos.
- Gestionar proactivamente la lista de pendientes para evitar deudas técnicas.

## 🏛️ Estándares Estructurales
- **Grid de Profesionales**: 
    - Móvil: 1 columna.
    - Tablet: `md:grid-cols-2`.
    - Desktop: `lg:grid-cols-3`.
    - Gap: `gap-12`.
- **Títulos de Especialidad**:
    - Tag: `h2`.
    - Clases: `font-display text-3xl font-bold text-slate-900 border-l-4 border-primary-500 pl-4`.
    - Contenedor: `col-span-full mt-12 mb-4`.

## 👩‍⚕️ Protocolo de Gestión de Profesionales
Cualquier modificación al equipo médico (altas, bajas o modificaciones) DEBE seguir estas reglas inquebrantables:

### 1. Single Source of Truth (SSoT)
- Toda la información del equipo profesional (nombres, cargos, especialidades, descripciones y formación) DEBE residir exclusivamente en `assets/js/pro-data.js`.
- Las páginas individuales (`psicologia.html`, `profesionales.html`, etc.) deben consumir este objeto global para renderizar tanto las tarjetas como los drawers de perfil de forma dinámica.
- Queda **estrictamente prohibido** definir objetos de datos locales (`proDataExtended`) dentro de los archivos HTML. Cualquier actualización de personal se realiza ÚNICAMENTE en el archivo JS centralizado.

### 2. Jerarquía de Visualización
- **Prioridad Directiva**: Valentina Jiménez (Psicología), Pamela Tarifeño (Psicopedagogía), Eugenia Ortiz (Pediatría).
- **Prioridad Operativa**: Profesionales en activo ordenados alfabéticamente por nombre principal.

### 3. Años de Experiencia Dinámicos (CRÍTICO)
- Nunca uses años fijos (ej. "16 años de experiencia").
- Usar siempre la etiqueta `<span class="dynamic-exp" data-start-year="YYYY">X</span>` en CUALQUIER mención de años de experiencia para que el JavaScript calcule automáticamente el avance del tiempo.

### 4. Estándar de Imagen y Recorte (CRÍTICO)
- **Procesamiento Selectivo**: NUNCA actualices todas las fotos en ráfaga de forma automática. Solo procesa aquellas explícitamente indicadas por el usuario o las que falten (indicadas en `PENDIENTES.md`), para evitar alterar versiones ya aprobadas en producción.
- **Anatomía de la Foto**: Todas las fotografías de profesionales DEBEN seguir este encuadre:
    1. **Eliminación de Fondo**: Transparencia total.
    2. **Encuadre Basal (Bottom align)**: La base del torso del profesional debe coincidir con el borde inferior del contenedor (no debe "flotar").
    3. **Aire Superior (Top breathing)**: Dejar entre un 10% y 15% de espacio vacío sobre la cabeza del profesional.
    4. **Centrado y Escala**: Centrado horizontal a escala máxima permitida por el aire superior. Usar `object-contain`.
    5. **Formato y Peso**: WebP optimizado (Máx 1000px altura, peso < 100KB).
- Si la foto original tiene un fondo complejo, solicita la versión "recortada" o usa la herramienta de remoción de fondo disponible.

## 🧱 Cambios Globales (Header, Footer, Navegación)
- **Navegación Intuitiva (Popstate)**: Cualquier menú móvil, modal o "drawer" (como el de profesionales) DEBE implementar la API de History (`pushState` y evento `popstate`). Así, si el usuario presiona el botón "Atrás" en su dispositivo físico/virtual para intentar cerrar el menú o modal, este simplemente se cerrará sin sacarlo de la página actual.
- **Jerarquía de Navegación del Banner**:
    - La barra de navegación principal debe mantener exclusivamente los enlaces esenciales: `Inicio`, `Especialidades` (dropdown), `Quiénes Somos`, `Profesionales`, `Convenios`, `Contacto` y el CTA `Agendar Hora`.
    - **Formación**: El acceso al servicio de Formación (`/formacion`) pertenece estrictamente al interior del menú desplegable `Especialidades` (en desktop y drawer móvil), evitando saturar el banner superior y asegurando coherencia visual en las 17 páginas.
- **Prohibición de Scripts de Modificación Masiva**: Queda estrictamente prohibido utilizar scripts automatizados de regex o reemplazo masivo (como `update_headers.py`) para alterar componentes de cabecera o navegación. Las modificaciones deben realizarse de forma quirúrgica, manual y verificada archivo por archivo para preservar las clases activas, accesibilidad y rutas limpias particulares de cada plantilla.
- **Modal de Aranceles y Duraciones Clínicas**: El modal `#prices-modal` en `index.html` centraliza los valores oficiales. Para **Pediatría**, las consultas estándar (presencial "Control Médico" y remota "Control Médico Online") tienen una duración estipulada de **10 minutos** (`Atención 10 min` / `Sesión remota 10 min`), con copago Fonasa $7.690 y Particular $50.000.
- Si el usuario te pide modificar el encabezado (`index.html`) o el pie de página y te indica hacerlo *solo en una página*, **DEBES** registrar inmediatamente en `PENDIENTES.md` una tarea requerida para replicar ese mismo cambio en las 10+ páginas restantes del ecosistema, evitando discrepancias de diseño.

## 📈 Estándares SEO Local e Indexación para Motores de IA (LLMs)
- **Titles**: `[Especialidad] en Coquimbo y La Serena | Centro Valu - [Promesa de Valor]`.
- **Descriptions**: Incluir siempre la ubicación geográfica y el beneficio principal (ej. "Convenio Fonasa", "Atención integral").
- **URLs Canónicas Limpias (CRÍTICO)**: Toda página pública DEBE poseer su etiqueta `<link rel="canonical" href="https://centrovalu.cl/[slug]" />` sin extensión `.html` y sin slash final (excepto el home `/`).
- **Enlaces Internos sin `.html` (CRÍTICO)**: Queda estrictamente prohibido enlazar internamente a rutas relativas o absolutas con extensión `.html` (ej. `formulario-contacto.html?especialidad=...`). Todo enlace interno debe apuntar a la ruta limpia absoluta `/formulario-contacto?especialidad=...` para evitar redirecciones (301) o errores 404 en Googlebot.
- **Aislamiento de Páginas Internas**: Páginas marcadas con `noindex, nofollow` (ej. `/llenado-datos`) no deben ser enlazadas en la navegación pública principal para no consumir presupuesto de rastreo (crawl budget).
- **JSON-LD**: Cada nueva página de servicio debe incluir el script `MedicalWebPage` o schema correspondiente apuntando al `MedicalBusiness` principal.
- **Directorio de IA (`llms.txt`)**: Toda nueva especialidad, cambio arancelario o incorporación de profesional debe reflejarse en `llms.txt` para ser consumido por ChatGPT, Gemini, Perplexity y Claude.
- **Rastreo (`robots.txt`)**: Mantener directivas explícitas para rastreadores tradicionales y agentes de IA (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`).
- **Sitemap (`sitemap.xml`)**: Toda nueva URL debe registrarse con su fecha `<lastmod>` actualizada.
- **Google Search Console**: Propiedad verificada a nivel de dominio vía registro TXT en AWS Route 53 y Google Analytics. Sitemap validado continuamente. Cobertura monitoreada para resolver cualquier alerta de páginas no indexadas.

## 🛠️ Escalabilidad (Cómo agregar una nueva especialidad)
1. **Nueva Página**: Duplicar `psicologia.html` como base.
2. **Personalización**:
    - Actualizar metadatos SEO específicos.
    - Cambiar el color de acento (ver paleta en `centro-salud-integral`).
    - Actualizar el título `H1` y la descripción del servicio.
3. **Sincronización**: Agregar la nueva especialidad al listado maestro en `profesionales.html` y al JSON-LD de `index.html`.

## 🖼️ Estándares de Open Graph (Social Media)
Para asegurar previsualizaciones profesionales en WhatsApp y redes sociales, toda imagen `og:image` debe seguir el **Estándar Pediatría**:
- **Layout**: 1200x630 px. Dividido en dos bloques.
- **Lado Izquierdo (Marca)**: Logo oficial centrado sobre degradado lineal Verde Agua Valu (`#ddf4f4`) a Blanco.
- **Lado Derecho (Ambiente)**: Fotografía de alta calidad de un espacio real del centro o representativo del área (sin personas, enfocada en la calidez del espacio).
- **Texto**: Solo el nombre de la especialidad en español (ej. "Psicopedagogía") con tipografía limpia y clara.
- **Archivos**: Guardar siempre en `assets/brand/og-[nombre].jpg`.

## 🏥 Infraestructura de Dos Sedes y Gimnasio Terapéutico
Centro Valú opera formalmente en dos sucursales en Coquimbo:
1. **Sede Central (Parque Nacional Lauca 1612, Bosque San Carlos)**:
   - Psicología Infanto-Juvenil y Adultos, Pediatría Integral, Tests Diagnósticos (ADOS-2, WISC-V, ADI-R) y Convenio Fonasa.
2. **Nueva Sede (Gil de Castro 122, Coquimbo)**:
   - Gimnasio Terapéutico y de Estimulación Temprana (**niños y niñas de hasta 6 años**), Fonoaudiología, Terapia Ocupacional, Psicopedagogía y Apoyo Escolar.
   - **Estándar de Iconografía**: Prohibido el uso de emojis informales como `🧸` en menús, desplegables y formularios; se debe mantener una identidad clínica sobria, cálida y profesional.

### Estándar de Sección de Ubicaciones (2 Columnas con Google Maps)
Toda sección de sucursales (`#contacto` o `#ubicacion`) debe estructurarse con:
- **Cuadrícula en 2 columnas simétricas**: Sede Central (Parque Lauca) y Nueva Sede (Gil de Castro) en paralelo.
- **Mapas interactivos embebidos**: Iframe de Google Maps en cada columna con altura estandarizada `h-64 sm:h-72` y bordes suaves `rounded-2xl`.
- **Enfoque directo**: Tarjetas centradas en nombre de sede, dirección y enlace externo a Google Maps / Waze. Evitar listas saturadas de especialidades dentro de las tarjetas del mapa.
- **Barra inferior unificada**: Horarios consolidados, teléfonos/WhatsApp corporativo y CTA de contacto.

## 🎨 Paleta de Identidad y Reglas de Contraste (Modo Oscuro)
- **Primario**: `#75cfcf` (Verde Agua Valu).
- **Escala Primaria Obligatoria en `tailwind.config`**:
  - `50: '#f0fdf9'`, `100: '#ddf4f4'`, `200: '#bce8e8'`, `300: '#99dede'`, `400: '#8be0e0'`, `500: '#75cfcf'`, `600: '#4a8d8d'`, `700: '#2d5a5a'`.
- **Texto**: `slate-900` para impacto en fondos claros, `slate-500` para lectura, `text-white` y `text-primary-300` para fondos oscuros (`slate-950`/`slate-900`).
- **Tipografía**: `Abhaya Libre` para el espíritu (serifa), `Poppins` para la claridad (sans).
- **Regla Crítica de Contraste en Fondos Oscuros**: Queda estrictamente prohibido aplicar clases CSS globales con colores oscuros hardcodeados (ej. `.contact-priority-bold` que fuerza `#0f172a`) dentro de contenedores oscuros. Siempre verificar contraste AAA contra el fondo.
- **Píldoras y Badges en Fondos Oscuros**: Los textos de badges informativos deben utilizar `text-white font-bold tracking-wider` con fondos semitransparentes (`bg-primary-500/25 border-primary-400/60 backdrop-blur-sm`) y puntos de estado pulsantes (`animate-ping`) bien contrastados.

## 🛡️ Reglas de Seguridad Críticas (Head Check)
Jamás se debe limpiar o reconstruir el bloque `<head>` omitiendo estos 4 pilares:
1. **CDN de Tailwind CSS**: `<script src="https://cdn.tailwindcss.com"></script>` (Vital para el renderizado).
2. **Configuración Inline de Tailwind**: Script de `tailwind.config` con los tokens de color del Centro Valu (incluyendo escala `primary` completa: 50 a 700).
3. **Fuentes de Google**: Enlace a `Abhaya Libre` y `Poppins`.
4. **Tracking & Analytics**: Google Tag (gtag.js) y Meta Pixel.

> [!CAUTION]
> La eliminación parcial de estos elementos resultará en un "Efecto Texto Plano" (pérdida total de diseño). Siempre verifica la presencia de Tailwind antes de guardar cambios en el head.

## ⚖️ Estándares Legales, Privacidad y Buscador
- **Identificación Legal Obligatoria**: La entidad jurídica oficial es **CENTRO VALÚ SALUD INTEGRAL SPA** (RUT **77.058.617-8**), domiciliada en Coquimbo, Chile.
- **Marco Regulatorio**:
  - **Ley N° 19.628 y Nueva Ley de Protección de Datos (APDP/GDPR)**: Tratamiento de datos personales, bases de licitud, protocolo de brechas de seguridad y ejercicio de derechos **ARCOP** (Acceso, Rectificación, Cancelación, Oposición, Portabilidad, Bloqueo) con plazo legal perentorio de 15 días hábiles.
  - **Ley N° 20.584**: Deber de reserva médica, confidencialidad estricta y custodia legal mínima de 15 años para fichas clínicas (D.S. N° 41 MINSAL).
  - **Ley N° 21.430**: Consentimiento expreso de padres o tutores para la atención de niños, niñas y adolescentes.
  - **Exclusión de Urgencias**: En `terminos.html` debe mantenerse la advertencia expresa de no atención de riesgo vital, derivando al 131 (SAMU) o *4141.
- **Sincronización del Buscador (`search-data.js` & `search-logic.js`)**:
  - Toda nueva página, servicio o sección debe agregarse al array maestro `window.searchData` en `assets/js/search-data.js` con sus `keywords` normalizadas sin tildes.
  - El buscador debe permitir selección directa con tecla `Enter` para maximizar la conversión y velocidad de navegación.
- **Suite de Pruebas Automatizadas**:
  - Ejecutar siempre `python -m unittest tests/test_compliance_and_search.py` antes de cualquier despliegue a producción para validar que las cláusulas legales y los enlaces del buscador permanezcan íntegros.


## 📝 Gobernanza y Gestión de Tareas
- **Consulta Previa**: Antes de crear cualquier subpágina, popup o componente mayor, se DEBE consultar al usuario para validar la necesidad y el diseño. No se deben dejar partes a medias o funcionando mal.
- **Lista de Pendientes (`PENDIENTES.md`)**: Si una tarea requerida no se puede realizar de inmediato, DEBE registrarse en el archivo `PENDIENTES.md` en la raíz del proyecto. Este archivo es la fuente de verdad para la evolución del sitio.
    - Se debe actualizar de inmediato ante cualquier tarea faltante.
    - Cada ítem debe ser claro y accionable.

## 🔒 Protocolo de Sincronización y GitHub (CRÍTICO)
- **Prohibido Push Automático**: Jamás realices un `git push` de forma automática. 
- **Autorización Explícita**: Antes de subir cualquier cambio al repositorio, DEBES preguntar al usuario y obtener una confirmación directa.
- **Transparencia**: Indica siempre qué archivos se van a subir y el mensaje de commit propuesto.

> [!CAUTION]
> El incumplimiento de esta regla puede alterar el flujo de despliegue del usuario. Siempre valida antes de sincronizar con la nube.

> [!IMPORTANT]
> Nunca uses diseños genéricos o bibliotecas de componentes estándar sin aplicar los tokens de diseño del Centro Valu. La marca se basa en la "calidez clínica".
