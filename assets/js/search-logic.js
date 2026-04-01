/**
 * Archivo: search-logic.js
 * Descripción: Lógica global para el buscador modal de Centro Valu. 
 * Inyecta el modal dinámicamente y maneja el filtrado de profesionales y servicios.
 * Fecha: 2026-03-27
 * Autor: Antigravity
 */

(function() {
    let searchData = [];
    let isModalOpen = false;

    // 1. Cargar Datos (Ahora desde variable global para evitar CORS local)
    function initSearchData() {
        searchData = window.searchData || [];
        console.log('Buscador: ' + searchData.length + ' elementos cargados.');
    }
    
    initSearchData();
    // Re-intentar si por alguna razón no estaba cargado (ej: orden de carga en navegadores lentos)
    if (searchData.length === 0) {
        window.addEventListener('load', initSearchData);
    }

    // 2. Crear e Inyectar Estilos necesarios (si no existen)
    if (!document.getElementById('search-styles')) {
        const style = document.createElement('style');
        style.id = 'search-styles';
        style.innerHTML = `
            .search-backdrop {
                background: rgba(15, 23, 42, 0.4);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                transition: all 0.3s ease;
            }
            .search-backdrop.invisible {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: transparent !important;
            }
            .search-modal-glass {
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.5);
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
            }
            .search-item:hover {
                background: rgba(117, 207, 207, 0.1);
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-search-in {
                animation: fadeIn 0.2s ease-out forwards;
            }
        `;
        document.head.appendChild(style);
    }

    // 3. Crear Estructura del Modal
    const modalHTML = `
        <div id="global-search-modal" class="fixed inset-0 z-[100] flex items-start justify-center pt-20 md:pt-32 px-4 opacity-0 pointer-events-none invisible transition-all duration-300 search-backdrop">
            <div class="w-full max-w-2xl search-modal-glass rounded-[2rem] overflow-hidden flex flex-col max-h-[70vh] md:max-h-[60vh] transform scale-95 transition-transform duration-300" id="search-container">
                <!-- Header del buscador -->
                <div class="p-6 border-b border-slate-100 flex items-center gap-4">
                    <svg class="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" id="search-input" placeholder="Busca servicios, profesionales..." 
                           class="flex-grow bg-transparent border-none text-xl focus:ring-0 text-slate-800 placeholder-slate-400 font-medium outline-none" autocomplete="off">
                    <button id="close-search" class="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div>

                <!-- Resultados -->
                <div id="search-results" class="flex-grow overflow-y-auto p-4 custom-scrollbar space-y-2">
                    <div class="py-12 text-center text-slate-400">
                        <p class="text-sm font-medium">Comienza a escribir para buscar</p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div class="flex gap-4">
                        <span><kbd class="bg-white border border-slate-200 px-1 rounded shadow-sm">ESC</kbd> Cerrar</span>
                        <span><kbd class="bg-white border border-slate-200 px-1 rounded shadow-sm">↵</kbd> Seleccionar</span>
                    </div>
                    <div class="hidden md:block">
                        Centro Valu • Excelencia en Salud
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('global-search-modal');
    const container = document.getElementById('search-container');
    const input = document.getElementById('search-input');
    const resultsArea = document.getElementById('search-results');
    const closeBtn = document.getElementById('close-search');

    // 4. Funciones de Control
    function openSearch() {
        modal.style.display = 'flex';
        // Un pequeño delay para que la transición de opacidad funcione al abrir
        setTimeout(() => {
            modal.classList.remove('opacity-0', 'pointer-events-none', 'invisible');
            container.classList.remove('scale-95');
            container.classList.add('scale-100');
            input.focus();
        }, 10);
        isModalOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        modal.classList.add('opacity-0', 'pointer-events-none', 'invisible');
        container.classList.add('scale-95');
        container.classList.remove('scale-100');
        input.value = '';
        renderResults([]); // Limpiar
        isModalOpen = false;
        document.body.style.overflow = '';
        
        // Forzamos el display none después de la transición (300ms)
        setTimeout(() => {
            if (!isModalOpen) modal.style.display = 'none';
        }, 300);
    }

    function renderResults(results) {
        if (input.value.trim() === '') {
            resultsArea.innerHTML = `
                <div class="py-12 text-center text-slate-400">
                    <p class="text-sm font-medium">Comienza a escribir para buscar</p>
                </div>
            `;
            return;
        }

        if (results.length === 0) {
            resultsArea.innerHTML = `
                <div class="py-12 text-center text-slate-400">
                    <p class="text-sm font-medium">No se encontraron resultados para "${input.value}"</p>
                </div>
            `;
            return;
        }

        resultsArea.innerHTML = results.map(item => {
            if (item.type === 'professional') {
                return `
                    <a href="${item.url}" class="search-item flex items-center gap-4 p-3 rounded-2xl transition-all group">
                        <div class="h-12 w-12 rounded-xl overflow-hidden bg-primary-50 shrink-0">
                            <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-grow">
                            <h4 class="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">${item.name}</h4>
                            <p class="text-xs text-slate-500 font-medium">${item.position} • ${item.specialty}</p>
                        </div>
                        <div class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </a>
                `;
            } else {
                let iconContent = '';
                if (item.icon) {
                    iconContent = `<span class="text-xl">${item.icon}</span>`;
                } else if (item.type === 'service') {
                    iconContent = `<svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                } else {
                    iconContent = `<svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
                }

                
                return `
                    <a href="${item.url}" class="search-item flex items-center gap-4 p-4 rounded-2xl transition-all group">
                        <div class="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary-200">
                            ${iconContent}
                        </div>

                        <div class="flex-grow">
                            <h4 class="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">${item.name}</h4>
                            <p class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${item.category || 'Página'}</p>
                        </div>
                        <div class="text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                    </a>
                `;
            }
        }).join('');


    }

    // 5. Lógica de Filtrado (Normalización para ignorar tildes y mayúsculas)
    const normalizeText = (text) => {
        if (!text) return "";
        return text.toString()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    input.addEventListener('input', (e) => {
        const query = normalizeText(e.target.value);
        if (query === '') {
            renderResults([]);
            return;
        }
        
        // Asegurar que tenemos datos
        if (searchData.length === 0) initSearchData();

        const filtered = searchData.filter(item => {
            const name = normalizeText(item.name);
            const specialty = normalizeText(item.specialty);
            const inKeywords = item.keywords ? item.keywords.some(k => normalizeText(k).includes(query)) : false;
            
            return name.includes(query) || inKeywords || specialty.includes(query);
        });

        // Ordenar: Aranceles primero si la búsqueda es sobre costos o tests, luego Servicios y Páginas, luego Profesionales
        filtered.sort((a, b) => {
            const queryRaw = input.value.toLowerCase();
            const isPriceQuery = queryRaw.includes('precio') || queryRaw.includes('valor') || queryRaw.includes('cuanto') || queryRaw.includes('costo') || queryRaw.includes('arancel') || queryRaw.includes('ados') || queryRaw.includes('wisc') || queryRaw.includes('tadi');
            
            const aIsArancel = a.category === 'Aranceles';
            const bIsArancel = b.category === 'Aranceles';

            if (isPriceQuery) {
                if (aIsArancel && !bIsArancel) return -1;
                if (!aIsArancel && bIsArancel) return 1;
            }

            const priority = { 'service': 1, 'page': 1, 'professional': 2 };
            return (priority[a.type] || 3) - (priority[b.type] || 3);
        });



        console.log('Busqueda: "' + query + '" - ' + filtered.length + ' resultados.');
        renderResults(filtered);
    });

    // 6. Event Listeners
    closeBtn.addEventListener('click', closeSearch);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSearch();
    });

    // Atajos de teclado
    window.addEventListener('keydown', (e) => {
        // Abrir con Ctrl + K o Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        // Cerrar con Esc
        if (e.key === 'Escape' && isModalOpen) {
            closeSearch();
        }
        // Atajo rápido "/"
        if (e.key === '/' && !isModalOpen && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            openSearch();
        }
    });

    // Escuchar botones de apertura externos
    document.addEventListener('click', (e) => {
        if (e.target.closest('#search-open')) {
            e.preventDefault();
            openSearch();
        }
    });

    // Cerrar buscador al hacer clic en un resultado (especialmente para anclas en la misma página)
    resultsArea.addEventListener('click', (e) => {
        if (e.target.closest('.search-item')) {
            // El navegador seguirá el enlace por sí solo, 
            // nosotros solo nos aseguramos de cerrar el modal.
            closeSearch();
        }
    });

})();
