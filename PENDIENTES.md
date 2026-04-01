<!--
Archivo: PENDIENTES.md
Descripción: Lista de tareas pendientes y futuras implementaciones para Centro Valu.
Fecha de ultima modificacion: 2026-04-01
Nombre del autor: Antigravity
-->

# 📌 Lista de Pendientes - Centro Valu

Este archivo contiene las tareas que deben realizarse a futuro para mejorar la experiencia, el diseño o la funcionalidad del ecosistema digital de Centro Valu.

## 🚀 Próximas Implementaciones
- 🟢 **[COMPLETADO]** **Universidades de Especialistas**: Actualización realizada basada en el CSV de profesionales.
- 🟢 **[COMPLETADO]** **Replicar Header Global**: Copiar el Header modificado de `index.html` (logo un 30% más grande y texto tipográfico ajustado) a todas las demás subpáginas del sitio.
- 🟢 **[COMPLETADO]** Especialidades: Cambiar información de especialidades según la opinión de Pamela.
- 🟢 **[COMPLETADO]** Optimización de Menú Móvil: Revisar el ancho y comportamiento en dispositivos de gran escala (desktops).
- 🟢 **[COMPLETADO]** Integración n8n Mejorada: Verificar que los webhooks de contacto capturen correctamente todos los campos adicionales.
- 🟢 **[COMPLETADO]** Formulario Multi-paso: Evaluar la implementación de un formulario de contacto guiado para mejorar la tasa de conversión.
- 🔴 **[FALTANTE]** Chatbot Inteligente: Desarrollar la lógica activa para el botón flotante (ID `chatbot-placeholder`).
- 🟡 **[PENDIENTE]** **Verificación de Formularios (CRÍTICO)**: Realizar pruebas de extremo a extremo en los tres formularios (`Particular`, `Convenios`, `Formación`) para asegurar el ruteo correcto y la recepción de datos en n8n tras la unificación de headers/footers.

## 🖼️ Activos Visuales Faltantes (Crítico)
- 🟡 **[EN PROCESO]** Fotos de Profesionales: Falta conseguir las de algunos directores/fundadores:
    - 🔴 **[FALTANTE]** Pamela Tarifeño (Psicopedagogía) - *Falta foto original*
    - 🟢 **[COMPLETADO]** Eugenia Ortiz (Pediatría) - *Imagen optimizada con transparencia*
    - 🟢 **[COMPLETADO]** Bruno Araya (Fonoaudiología) - *Imagen optimizada con transparencia*
    - 🟢 **[COMPLETADO]** Valentina Jiménez (Psicología) - *Imagen optimizada con transparencia y encuadre basal*
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
    - 🔴 **[FALTANTE]** `formacion.html`: Falta `hero-formacion` (foto real de supervisión o formación).
- 🟢 **[COMPLETADO]** Branding y Social Media: Set de imágenes OG e Íconos creados e integrados.
- 🟢 **[COMPLETADO]** Hero Image: Ajustar la visualización responsiva en `index.html`.

## 📊 Salud Digital y SEO
- 🟢 **[COMPLETADO]** Accesibilidad (Prioridad ALTA): Skip Links, anillos de enfoque, aria-labels integrados.
- 🟢 **[COMPLETADO]** Performance (Prioridad MEDIA): width/height en base y loading="lazy" habilitados.
- 🟡 **[EN PROCESO]** SEO Local (Requiere Revisión Manual antes de Producción):
    - 🟢 **[COMPLETADO]** Verificar el campo "Dirección" en el JSON-LD de `MedicalBusiness`.
    - 🟢 **[COMPLETADO]** Chequear los textos `alt` de todas las imágenes y enriquecer para SEO local.
    - 🟢 **[COMPLETADO]** Generar y actualizar el `sitemap.xml` (Listo para subir a GSC).

## 🛠️ Integraciones Técnicas (IDs Requeridos)
- 🟢 **[COMPLETADO]** Google Ads: Configurado con ID real `AW-16532397408`.
- 🟢 **[COMPLETADO]** Etiquetas de Conversión: Configuradas globalmente para WhatsApp y formularios (`LABEL_WHATSAPP`, `LABEL_FORM_PARTICULAR`, `LABEL_FORM_CONVENIOS`).
- 🔴 **[FALTANTE]** Meta Pixel: Configurar `META_PIXEL_ID` real.
- 🟢 **[COMPLETADO]** Webhooks de Producción: Cambiadas URLs `/webhook-test/` a `/webhook/` en todos los formularios.

## 📄 Consentimientos Informados (Crítico)
- 🔴 **[FALTANTE]** **Documento Pediatría**: Generar el PDF específico para atención pediátrica (actualmente redirigido a Psicología Niños como fallback).
- 🔴 **[FALTANTE]** **Versiones de Adultos TO / PSP**: Verificar si Terapia Ocupacional y Psicopedagogía requieren una versión diferenciada para adultos (actualmente usan una versión única).
- 🟡 **[PENDIENTE]** **Validación Legal**: Revisar que los textos de los resúmenes inyectados en el Paso 4 del formulario cumplan con la normativa vigente de cada especialidad.

## 📄 Contenido Legal
- 🟢 **[COMPLETADO]** Crear páginas de Privacidad y Términos.

---
*Nota: Este archivo debe ser actualizado visualmente por el asistente AI cada vez que una tarea cambie de estado.*
