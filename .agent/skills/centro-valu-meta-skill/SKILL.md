---
name: centro-valu-meta-skill
description: Manual Maestro y Generador de Habilidades para Centro Valu. Define los estándares de escalabilidad, mantenimiento de profesionales y coherencia visual del ecosistema digital.
---

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
- Si el usuario te pide modificar el encabezado (`index.html`) o el pie de página y te indica hacerlo *solo en una página*, **DEBES** registrar inmediatamente en `PENDIENTES.md` una tarea requerida para replicar ese mismo cambio en las 10+ páginas restantes del ecosistema, evitando discrepancias de diseño.

## 📈 Estándares SEO Local (Coquimbo/La Serena)
- **Titles**: `[Especialidad] en Coquimbo y La Serena | Centro Valu - [Promesa de Valor]`.
- **Descriptions**: Incluir siempre la ubicación geográfica y el beneficio principal (ej. "Convenio Fonasa", "Atención integral").
- **JSON-LD**: Cada nueva página de servicio debe incluir el script `MedicalWebPage` apuntando al `MedicalBusiness` principal.

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

## 🎨 Paleta de Identidad
- **Primario**: `#75cfcf` (Verde Agua Valu).
- **Texto**: `slate-900` para impacto, `slate-500` para lectura.
- **Tipografía**: `Abhaya Libre` para el espíritu (serifa), `Poppins` para la claridad (sans).
56: 
57: ## 🛡️ Reglas de Seguridad Críticas (Head Check)
58: Jamás se debe limpiar o reconstruir el bloque `<head>` omitiendo estos 4 pilares:
59: 1. **CDN de Tailwind CSS**: `<script src="https://cdn.tailwindcss.com"></script>` (Vital para el renderizado).
60: 2. **Configuración Inline de Tailwind**: Script de `tailwind.config` con los tokens de color del Centro Valu.
61: 3. **Fuentes de Google**: Enlace a `Abhaya Libre` y `Poppins`.
62: 4. **Tracking & Analytics**: Google Tag (gtag.js) y Meta Pixel.
63: 
64: > [!CAUTION]
65: > La eliminación parcial de estos elementos resultará en un "Efecto Texto Plano" (pérdida total de diseño). Siempre verifica la presencia de Tailwind antes de guardar cambios en el head.
66: 

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
