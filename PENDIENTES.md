# 📌 Lista de Pendientes - Centro Valu

Este archivo contiene las tareas que deben realizarse a futuro para mejorar la experiencia, el diseño o la funcionalidad del ecosistema digital de Centro Valu.

## 🚀 Próximas Implementaciones
- [ ] **Optimización de Menú Móvil**: Revisar el ancho y comportamiento en dispositivos de gran escala (desktops) para que no ocupe un espacio excesivo de manera innecesaria.
- [ ] **Integración n8n Mejorada**: Verificar que los webhooks de contacto capturen correctamente todos los campos adicionales (institución, interés, etc.) según las últimas actualizaciones. Cambiar de `webhook-test` a producción una vez validado.
- [ ] **Formulario Multi-paso**: Evaluar la implementación de un formulario de contacto guiado para mejorar la tasa de conversión.
- [ ] **Chatbot Inteligente**: Desarrollar la lógica activa para el botón flotante (ID `chatbot-placeholder`).

## 🖼️ Activos Visuales Faltantes (Crítico)
- [ ] **Fotos de Profesionales**: Reemplazar logotipos de marcador de posición por fotos reales de:
    - Valentina Jiménez (Directora)
    - Pamela Tarifeño (Psicopedagogía)
    - Eugenia Ortiz (Pediatría)
    - Bruno Araya (Fonoaudiología)
- [ ] **Branding y Social Media**:
    - [ ] Crear/Subir `assets/brand/og-image.jpg` (Imagen OG Global).
    - [ ] Crear imágenes OG especializadas (`og-psicologia.jpg`, `og-pediatria.jpg`, etc.).
    - [ ] Configurar `favicon.ico` para la pestaña del navegador.
- [ ] **Hero Image**: Ajustar la visualización responsiva en `index.html` para impacto óptimo en móviles.

## 📊 Salud Digital y SEO
- [ ] **Accesibilidad (Prioridad ALTA)**:
    - [ ] Inyectar *Skip Links* ("Saltar al contenido") en todas las páginas.
    - [ ] Agregar `aria-label` a todos los botones de solo icono (ej. toggle de menú).
    - [ ] Implementar anillos de enfoque (*focus rings*) más visibles para navegación por teclado.
- [ ] **Performance (Prioridad MEDIA)**:
    - [ ] Agregar atributos `width` y `height` a todas las etiquetas `<img>` para evitar Layout Shift (CLS).
    - [ ] Asegurar atributo `loading="lazy"` en todas las imágenes fuera de la primera pantalla.
- [ ] **SEO Local**:
    - [ ] Corregir el campo "Dirección Pendiente" en el JSON-LD de `MedicalBusiness`.
    - [ ] Enriquecer textos `alt` de imágenes con palabras clave descriptivas.
    - [ ] Generar y subir `sitemap.xml` a Google Search Console.

## 🛠️ Integraciones Técnicas (IDs Requeridos)
- [ ] **Google Ads**: Configurar `AW-CONVERSION_ID` real.
- [ ] **Etiquetas de Conversión**: Configurar `LABEL_WHATSAPP`, `LABEL_FORM_PARTICULAR` y `LABEL_FORM_CONVENIOS`.
- [ ] **Meta Pixel**: Configurar `META_PIXEL_ID` real.

## 📄 Contenido Legal
- [x] Crear páginas de Privacidad y Términos. (Completado: 2026-03-17)

---
*Nota: Este archivo debe ser actualizado por el asistente AI cada vez que una tarea sea pospuesta o detectada como necesaria.*
