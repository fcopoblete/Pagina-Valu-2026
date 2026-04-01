/**
 * Archivo: tracking-logic.js
 * Descripción: Gestión centralizada de conversiones para Google Ads y Meta Pixel.
 * Última modificación: 2026-04-01
 * Autor: Antigravity (AI Assistant)
 */

// Configuración de IDs de Conversión (Google Ads)
const GADS_ID = 'AW-16532397408';

// REEMPLAZAR ESTOS VALORES CON LOS DE TU PANEL DE GOOGLE ADS
const LABELS = {
    WHATSAPP: 'LABEL_WHATSAPP',            // Clic en cualquier botón de WhatsApp
    FORM_PARTICULAR: 'LABEL_FORM_PARTICULAR', // Envío exitoso Formulario Particular
    FORM_CONVENIOS: 'LABEL_FORM_CONVENIOS'    // Envío exitoso Formulario Convenios
};

/**
 * Función genérica para disparar conversiones de Google Ads
 * @param {string} label - El identificador único de la conversión
 */
function trackGAdsConversion(label) {
    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': `${GADS_ID}/${label}`
        });
        console.log(`[Tracking] Conversión GAds disparada: ${label}`);
    } else {
        console.warn('[Tracking] gtag no está definido en esta página.');
    }
}

/**
 * Función genérica para disparar eventos de Meta Pixel
 * @param {string} eventName - Nombre del evento (Lead, Contact, ViewContent, etc.)
 */
function trackMetaEvent(eventName) {
    if (typeof fbq === 'function') {
        fbq('track', eventName);
    }
}

// Lógica Global para Clics en WhatsApp
document.addEventListener('click', function(e) {
    // Buscar si el clic fue en un enlace wa.me o en un hijo de dicho enlace
    const waLink = e.target.closest('a[href*="wa.me"]');
    
    if (waLink) {
        trackGAdsConversion(LABELS.WHATSAPP);
        trackMetaEvent('Contact');
    }
});

console.log('[Tracking] Sistema de seguimiento inicializado correctamente.');
