/**
 * Archivo: tracking-logic.js
 * Descripción: Gestión centralizada de conversiones para GA4, Google Ads y Meta Pixel.
 * Última modificación: 2026-04-06
 * Autor: Antigravity (AI Assistant)
 */

// Configuración de IDs
const GA4_ID = 'G-8H3VL1BL9Y';
const GADS_ID = 'AW-16532397408';

// Labels de Conversión (Google Ads)
const LABELS = {
    WHATSAPP: 'whatsapp_click',           // Nota: GA4 usa nombres de eventos, GAds usa Labels
    FORM_CONTACTO: 'form_contacto_success',
    FORM_CONVENIOS: 'form_convenios_success',
    FORM_FORMACION: 'form_formacion_success'
};

// Configuración de Webhooks n8n
const WEBHOOKS = {
    PARTICULAR: 'https://n8n.sinesfuerzo.cl/webhook/centro-valu-contacto-particular',
    CONVENIOS: 'https://n8n.sinesfuerzo.cl/webhook/centro-valu-contacto-convenios',
    FORMACION: 'https://n8n.sinesfuerzo.cl/webhook/Contacto_Formacion'
};

/**
 * Inyecta dinámicamente el botón de WhatsApp si no existe en el DOM.
 */
function injectWhatsAppButton() {
    if (document.querySelector('.wa-floating-btn')) return;

    // Detectar especialidad según la URL para personalizar el mensaje
    const path = window.location.pathname;
    const specialtyPhrases = {
        'psicologia': 'Psicología',
        'pediatria': 'Pediatría',
        'fonoaudiologia': 'Fonoaudiología',
        'terapia-ocupacional': 'Terapia Ocupacional',
        'psicopedagogia': 'Psicopedagogía',
        'test-evaluaciones': 'Tests y Evaluaciones',
        'convenios': 'Convenios'
    };

    let introText = "Hola Centro Valu, me gustaría solicitar más información.";
    for (const [slug, name] of Object.entries(specialtyPhrases)) {
        if (path.includes(slug)) {
            introText = `Hola Centro Valu, me gustaría solicitar más información sobre ${name}.`;
            break;
        }
    }

    const btn = document.createElement('a');
    btn.href = `https://wa.me/56972454921?text=${encodeURIComponent(introText)}`;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.className = 'wa-floating-btn';
    btn.setAttribute('aria-label', 'Contactar por WhatsApp');
    btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.603 6.013L0 24l6.135-1.61a11.77 11.77 0 005.911 1.603h.005C18.686 24 24 18.586 24 12.05a11.815 11.815 0 00-3.537-8.513"/>
        </svg>
    `;

    document.body.appendChild(btn);

    // Registro del evento al hacer clic
    btn.addEventListener('click', function() {
        trackEvent('whatsapp_click', {
            'event_category': 'Engagement',
            'event_label': 'Floating Button'
        });
    });
}

/**
 * Función genérica para disparar eventos en GA4 y conversiones en GAds.
 * @param {string} eventName - Nombre del evento
 * @param {object} params - Parámetros adicionales
 */
/**
 * Función genérica para disparar eventos en GA4.
 * @param {string} eventName - Nombre del evento
 * @param {object} params - Parámetros adicionales
 */
function trackEvent(eventName, params = {}) {
    if (typeof gtag === 'function') {
        // Asegurarse de que params sea un objeto
        const eventParams = typeof params === 'object' ? params : { 'value': params };
        
        // Enviar a GA4
        gtag('event', eventName, eventParams);
        console.log(`[Tracking] Evento disparado: ${eventName}`, eventParams);
    }
}

/**
 * Función centralizada para el seguimiento de leads exitosos.
 * Reemplaza las llamadas manuales en los formularios.
 */
function trackLead(data) {
    const params = {
        'content_type': 'lead',
        'item_category': data.tipo_lead || 'General',
        'lead_id': data.lead_id || 'N/A',
        'specialty': data.especialidad || data.profesion || 'General',
        'device': data.dispositivo || 'N/A'
    };
    
    // 1. Google Analytics (Evento estándar)
    trackEvent('generate_lead', params);
    
    // 2. Google Ads Conversion
    const gadsLabel = getGAdsLabelByLeadType(data.tipo_lead);
    if (gadsLabel) trackGAdsConversion(gadsLabel);
    
    // 3. Meta Pixel
    trackMetaEvent('Lead', { 
        content_name: params.specialty,
        content_category: params.item_category 
    });
}

/**
 * Mapeo interno de tipos de lead a etiquetas de Google Ads.
 */
function getGAdsLabelByLeadType(type) {
    switch (type) {
        case 'PARTICULAR': return LABELS.FORM_CONTACTO;
        case 'CONVENIOS': return LABELS.FORM_CONVENIOS;
        case 'FORMACION': return LABELS.FORM_FORMACION;
        default: return null;
    }
}

/**
 * Envía una conversión a Google Ads si el sistema está configurado.
 */
function trackGAdsConversion(label) {
    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': `${GADS_ID}/${label}`
        });
        console.log(`[Tracking] GAds Conversion: ${label}`);
    }
}

/**
 * Envía un evento a Meta Pixel (Facebook) si el sistema está configurado.
 */
function trackMetaEvent(event, params = {}) {
    if (typeof fbq === 'function') {
        fbq('track', event, params);
        console.log(`[Tracking] Meta Pixel: ${event}`, params);
    }
}

/**
 * Configura listeners globales para clics en enlaces de contacto directo.
 */
function setupGlobalClickTracking() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href') || '';
        
        if (href.startsWith('tel:')) {
            trackEvent('contact_click', { 'method': 'phone', 'value': href.replace('tel:', '') });
        } else if (href.startsWith('mailto:')) {
            trackEvent('contact_click', { 'method': 'email', 'value': href.replace('mailto:', '') });
        }
    });
}

/**
 * Inicialización
 */
document.addEventListener('DOMContentLoaded', function() {
    injectWhatsAppButton();
    setupGlobalClickTracking();
    console.log('[Tracking] Sistema de seguimiento GA4 optimizado e inicializado.');
});
