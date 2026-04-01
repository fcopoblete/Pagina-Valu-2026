/**
 * Archivo: assets/js/drawer-logic.js
 * Descripción: Lógica centralizada para el Drawer de Perfiles de Profesionales.
 * Fecha de última modificación: 2026-04-01
 * Autor: Antigravity (AI Assistant)
 */

(function() {
    // --- ELEMENTOS DEL DOM ---
    const proDrawerOverlay = document.getElementById('pro-drawer-overlay');
    const proDrawerContent = document.getElementById('pro-drawer-content');
    const closeProDrawer = document.getElementById('close-pro-drawer');
    const proDetailsTarget = document.getElementById('pro-details-target');

    /**
     * openDrawer: Abre el drawer y lo puebla con los datos del profesional.
     * @param {string} proId - ID del profesional coincidente con las llaves de proDataExtended.
     */
    function openDrawer(proId) {
        if (typeof proDataExtended === 'undefined') {
            console.warn('drawer-logic.js: proDataExtended no está definido.');
            return;
        }

        const data = proDataExtended[proId];
        if (!data || !proDetailsTarget) return;

        // Reset scroll interno al inicio
        const scrollContainer = proDetailsTarget.parentElement;
        if (scrollContainer) scrollContainer.scrollTop = 0;

        const hasImage = data.img && !data.img.includes('placeholder.webp');
        const bgClass = data.bg || 'bg-brand-lila/20';

        proDetailsTarget.innerHTML = `
            <div class="flex flex-col gap-8">
                <div class="relative aspect-video rounded-3xl overflow-hidden ${bgClass} flex items-center justify-center shadow-inner">
                    ${hasImage ? `
                        <img src="${data.img}" alt="${data.nombre}" class="w-full h-full object-contain p-4 transition-transform duration-500" loading="lazy">
                    ` : `
                        <span class="text-primary-300 font-display text-8xl">Valu</span>
                    `}
                </div>
                <div>
                    <span class="text-primary-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 block">${data.especialidad || ''}</span>
                    <h2 class="font-display text-4xl md:text-5xl font-bold text-slate-900">${data.nombre}</h2>
                    <p class="text-slate-400 font-medium mt-2">${data.cargo || ''}</p>
                </div>
                <div class="space-y-6">
                    <h5 class="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">Descripción Profesional</h5>
                    <p class="text-slate-600 leading-relaxed text-lg">${data.descripcion || ''}</p>
                </div>
                <div class="space-y-6">
                    <h5 class="text-sm font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-2">Formación y Especialidades</h5>
                    <ul class="grid gap-4">
                        ${(data.formacion || []).map(item => `
                            <li class="flex items-start gap-3 text-slate-600">
                                <svg class="w-5 h-5 text-primary-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span class="font-medium">${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        // Activamos visibilidad
        if (proDrawerOverlay) {
            proDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
            proDrawerOverlay.classList.add('opacity-100');
        }
        if (proDrawerContent) {
            proDrawerContent.classList.remove('translate-x-full');
        }
        
        document.body.style.overflow = 'hidden';

        // Manejo de historial para botón atrás
        if (!history.state || !history.state.proDrawerOpen) {
            history.pushState({ proDrawerOpen: true, proId: proId }, '');
        }
    }

    /**
     * closeDrawer: Cierra el drawer y limpia el estado.
     * @param {boolean} fromPopState - Si el cierre viene de un evento popstate.
     */
    function closeDrawer(fromPopState = false) {
        if (proDrawerOverlay) {
            proDrawerOverlay.classList.remove('opacity-100');
            proDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
        if (proDrawerContent) {
            proDrawerContent.classList.add('translate-x-full');
        }
        
        document.body.style.overflow = '';
        
        // Limpiamos el hash de la URL si existe sin recargar
        if (window.location.hash) {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }

        if (!fromPopState && history.state && history.state.proDrawerOpen) {
            history.back();
        }
    }

    /**
     * checkHash: Verifica si el hash de la URL corresponde a un profesional.
     */
    function checkHash() {
        const hash = window.location.hash.substring(1); // Quitamos el #
        if (hash) {
            // Intentamos abrir el drawer con ese ID
            if (typeof proDataExtended !== 'undefined' && proDataExtended[hash]) {
                openDrawer(hash);
            }
        }
    }

    // --- EVENT LISTENERS ---

    // Delegación de eventos para botones de apertura
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.open-pro-drawer');
        if (trigger) {
            const card = trigger.closest('.pro-card');
            const proId = card ? card.getAttribute('data-pro-id') : null;
            if (proId) {
                // Actualizamos el hash para facilitar enlaces compartidos y luego abrimos
                window.location.hash = proId;
                // Nota: el evento hashchange disparará openDrawer
            }
        }
    });

    // Cierre al cliquear el botón X
    if (closeProDrawer) {
        closeProDrawer.addEventListener('click', () => closeDrawer());
    }

    // Cierre al cliquear el overlay (fuera del drawer)
    if (proDrawerOverlay) {
        proDrawerOverlay.addEventListener('click', (e) => {
            if (e.target === proDrawerOverlay) closeDrawer();
        });
    }

    // Manejo de Popstate (Botón atrás del navegador)
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.proDrawerOpen) {
            if (e.state.proId) openDrawer(e.state.proId);
        } else {
            // Si el drawer está abierto y el nuevo estado no dice que debe estarlo, cerramos
            if (proDrawerOverlay && !proDrawerOverlay.classList.contains('opacity-0')) {
                closeDrawer(true);
            }
        }
    });

    // Manejo de HashChange (Para enlaces directos o clics continuos)
    window.addEventListener('hashchange', checkHash);

    // Inicialización al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        checkHash();
    });

})();
