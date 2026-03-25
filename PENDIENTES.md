<!--
Archivo: PENDIENTES.md
Descripción: Lista de tareas pendientes y futuras implementaciones para Centro Valu.
Fecha de ultima modificacion: 2026-03-25
Nombre del autor: Antigravity
-->

# 📌 Lista de Pendientes - Centro Valu

Este archivo contiene las tareas que deben realizarse a futuro para mejorar la experiencia, el diseño o la funcionalidad del ecosistema digital de Centro Valu.

## 🚀 Próximas Implementaciones
- 🔴 **[FALTANTE]** **Universidades de Especialistas (CRÍTICO)**: Conseguir y reemplazar "Universidad XX" en los perfiles de: Pamela Tarifeño (Psicopedagogía), Eugenia Ortiz (Pediatría), Gabriela Pereira (Fonoaudiología), Ulda Castillo (Fonoaudiología), Bruno Araya (Fonoaudiología) y Valeria Alfaro (Terapia Ocupacional).
- 🟢 **[COMPLETADO]** **Replicar Header Global**: Copiar el Header modificado de `index.html` (logo un 30% más grande y texto tipográfico ajustado) a todas las demás subpáginas del sitio.
- 🟢 **[COMPLETADO]** Especialidades: Cambiar información de especialidades según la opinión de Pamela.
- 🟢 **[COMPLETADO]** Optimización de Menú Móvil: Revisar el ancho y comportamiento en dispositivos de gran escala (desktops).
- 🟢 **[COMPLETADO]** Integración n8n Mejorada: Verificar que los webhooks de contacto capturen correctamente todos los campos adicionales.
- 🟢 **[COMPLETADO]** Formulario Multi-paso: Evaluar la implementación de un formulario de contacto guiado para mejorar la tasa de conversión.
- 🔴 **[FALTANTE]** Chatbot Inteligente: Desarrollar la lógica activa para el botón flotante (ID `chatbot-placeholder`).

## 🖼️ Activos Visuales Faltantes (Crítico)
- 🟡 **[EN PROCESO]** Fotos de Profesionales: Falta conseguir las de algunos directores/fundadores:
    - 🔴 **[FALTANTE]** Pamela Tarifeño (Psicopedagogía)
    - 🔴 **[FALTANTE]** Eugenia Ortiz (Pediatría)
    - 🔴 **[FALTANTE]** Bruno Araya (Fonoaudiología)
    - 🔴 **[FALTANTE]** Valentina Jiménez (Psicología)
- 🟡 **[EN PROCESO]** Imágenes Hero y Secciones: Reemplazar fotos temporales por fotografías reales.
    *Integraciones listas `assets/img/reales/`:*
    - 🟢 **[COMPLETADO]** `index.html`: `hero-inicio` y `seccion-nosotros`.
    - 🟢 **[COMPLETADO]** `psicologia.html`: `box-psicologia`.
    - 🟢 **[COMPLETADO]** `fonoaudiologia.html`: `box-fonoaudiologia`.
    - 🟢 **[COMPLETADO]** `psicopedagogia.html`: `box-psicopedagogia`.
    - 🟢 **[COMPLETADO]** `terapia-ocupacional.html`: `box-terapia-ocupacional`.
    - 🟢 **[COMPLETADO]** `quienes-somos.html`: `galeria-fachada`.
    
    *FALTAN por conseguir en `assets/img/reales/`:*
    - 🔴 **[FALTANTE]** `quienes-somos.html`: Falta `hero-quienes-somos`, `galeria-espera`, `galeria-pasillo`.
    - 🔴 **[FALTANTE]** `pediatria.html`: Falta `box-pediatria` (box con juguetes).
- 🟢 **[COMPLETADO]** Branding y Social Media: Set de imágenes OG e Íconos creados e integrados.
- 🟢 **[COMPLETADO]** Hero Image: Ajustar la visualización responsiva en `index.html`.

## 📊 Salud Digital y SEO
- 🟢 **[COMPLETADO]** Accesibilidad (Prioridad ALTA): Skip Links, anillos de enfoque, aria-labels integrados.
- 🟢 **[COMPLETADO]** Performance (Prioridad MEDIA): width/height en base y loading="lazy" habilitados.
- 🟡 **[EN PROCESO]** SEO Local (Requiere Revisión Manual antes de Producción):
    - 🟡 **[PENDIENTE]** Verificar el campo "Dirección" en el JSON-LD de `MedicalBusiness`.
    - 🟡 **[PENDIENTE]** Chequear los textos `alt` de todas las imágenes. Re-enriquecer si cambian las fotos visuales.
    - 🟡 **[PENDIENTE]** Subir formalmente el `sitemap.xml` a Google Search Console.

## 🛠️ Integraciones Técnicas (IDs Requeridos)
- 🔴 **[FALTANTE]** Google Ads: Configurar `AW-CONVERSION_ID` real.
- 🔴 **[FALTANTE]** Etiquetas de Conversión: Configurar `LABEL_WHATSAPP`, `LABEL_FORM_PARTICULAR` y `LABEL_FORM_CONVENIOS`.
- 🔴 **[FALTANTE]** Meta Pixel: Configurar `META_PIXEL_ID` real.
- 🔴 **[FALTANTE]** Webhooks de Producción: Cambiar URLs `/webhook-test/` a `/webhook/` en ambos formularios una vez finalizadas las pruebas.

## 📄 Contenido Legal
- 🟢 **[COMPLETADO]** Crear páginas de Privacidad y Términos.

---
*Nota: Este archivo debe ser actualizado visualmente por el asistente AI cada vez que una tarea cambie de estado.*
