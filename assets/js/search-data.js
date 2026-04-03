/**
 * Archivo: search-data.js
 * Descripción: Datos del buscador de Centro Valu.
 * Definido como variable global para evitar problemas de CORS en entornos locales.
 */
window.searchData = [
  // PROFESIONALES
  {
    "type": "professional",
    "name": "Valentina Jiménez",
    "specialty": "Psicología",
    "position": "Psicóloga / Directora",
    "url": "psicologia.html#valentina-jimenez",
    "img": "assets/img/team/valentina-jimenez.webp"
  },
  {
    "type": "professional",
    "name": "Cristopher Espejo",
    "specialty": "Psicología",
    "position": "Psicólogo",
    "url": "psicologia.html#cristopher-espejo",
    "img": "assets/img/team/cristopher-espejo.webp"
  },
  {
    "type": "professional",
    "name": "Erik Navarro",
    "specialty": "Psicología",
    "position": "Psicólogo",
    "url": "psicologia.html#erik-navarro",
    "img": "assets/img/team/erik-navarro.webp"
  },
  {
    "type": "professional",
    "name": "Eva Aguayo",
    "specialty": "Psicología",
    "position": "Psicóloga",
    "url": "psicologia.html#eva-aguayo",
    "img": "assets/img/team/eva-aguayo.webp"
  },
  {
    "type": "professional",
    "name": "Josefa Arias",
    "specialty": "Psicología",
    "position": "Psicóloga",
    "url": "psicologia.html#josefa-arias",
    "img": "assets/img/team/josefa-arias.webp"
  },
  {
    "type": "professional",
    "name": "Valentina Gonzalez",
    "specialty": "Psicología",
    "position": "Psicóloga",
    "url": "psicologia.html#valentina-gonzalez",
    "img": "assets/img/team/valentina-gonzalez.webp"
  },
  {
    "type": "professional",
    "name": "Maria Muñoz",
    "specialty": "Psicología",
    "position": "Psicóloga",
    "url": "psicologia.html#maria-munoz",
    "img": "assets/img/team/maria-muñoz.webp"
  },
  {
    "type": "professional",
    "name": "Eugenia Ortiz",
    "specialty": "Pediatría",
    "position": "Pediatra",
    "url": "pediatria.html#eugenia-ortiz",
    "img": "assets/img/team/eugenia-ortiz.webp"
  },
  {
    "type": "professional",
    "name": "Bruno Araya",
    "specialty": "Fonoaudiología",
    "position": "Fonoaudiólogo",
    "url": "fonoaudiologia.html#bruno-araya",
    "img": "assets/img/team/bruno-araya.webp"
  },
  {
    "type": "professional",
    "name": "Gabriela Pereira",
    "specialty": "Fonoaudiología",
    "position": "Fonoaudióloga",
    "url": "fonoaudiologia.html#gabriela-pereira",
    "img": "assets/img/team/gabriela-pereira.webp"
  },
  {
    "type": "professional",
    "name": "Ulda Castillo",
    "specialty": "Fonoaudiología",
    "position": "Fonoaudióloga",
    "url": "fonoaudiologia.html#ulda-castillo",
    "img": "assets/img/team/ulda-castillo.webp"
  },
  {
    "type": "professional",
    "name": "Valeria Alfaro",
    "specialty": "Terapia Ocupacional",
    "position": "Terapeuta Ocupacional",
    "url": "terapia-ocupacional.html#valeria-alfaro",
    "img": "assets/img/team/valeria-alfaro.webp"
  },
  {
    "type": "professional",
    "name": "Pamela Tarifeño",
    "specialty": "Psicopedagogía",
    "position": "Psicopedagoga / Encargada Centro Valú",
    "url": "psicopedagogia.html#pamela-tarifeno",
    "img": "assets/img/team/placeholder.webp"
  },

  // ESPECIALIDADES (PÁGINAS PRINCIPALES)
  {
    "type": "service",
    "name": "Psicología",
    "icon": "🧠",
    "category": "Especialidad",
    "url": "psicologia.html",
    "keywords": ["terapia", "mental", "emocional", "adultos", "niños", "pareja", "perinatal", "online", "presencial", "vincular", "trauma", "apego", "psicoanálisis"]
  },
  {
    "type": "service",
    "name": "Pediatría",
    "icon": "👶",
    "category": "Especialidad",
    "url": "pediatria.html",
    "keywords": ["niños", "médico", "bebes", "crecimiento", "niño sano", "lactancia", "online", "presencial", "telemedicina"]
  },
  {
    "type": "service",
    "name": "Fonoaudiología",
    "icon": "🗣️",
    "category": "Especialidad",
    "url": "fonoaudiologia.html",
    "keywords": ["habla", "lenguaje", "voz", "deglución", "tel", "tdl", "articulación", "TEA", "autismo", "AMAR", "TEACCH", "CLAP", "motricidad orofacial", "disfagia", "audífono", "audición", "ACV", "tartamudez", "disfonía", "infanto-juvenil", "adultos", "online", "presencial"]
  },
  {
    "type": "service",
    "name": "Terapia Ocupacional",
    "icon": "🧤",
    "category": "Especialidad",
    "url": "terapia-ocupacional.html",
    "keywords": ["autonmía", "sensorial", "motricidad", "fina", "diaria", "esfínter", "TEA", "autismo", "selectividad alimentaria", "perfil sensorial", "regulación emocional", "adaptación escolar", "AVD", "presencial"]
  },
  {
    "type": "service",
    "name": "Psicopedagogía",
    "icon": "📚",
    "category": "Especialidad",
    "url": "psicopedagogia.html",
    "keywords": ["aprendizaje", "estudio", "colegio", "escuela", "reforzamiento", "presencial"]
  },

  // SUB-SERVICIOS ESPECÍFICOS (PSICOLOGÍA)
  {
    "type": "service",
    "name": "Terapia Infanto",
    "icon": "🧸",
    "category": "Psicología",
    "url": "psicologia.html#psico-infanto",
    "keywords": ["niños", "niñas", "juego", "conducta", "infantil"]
  },
  {
    "type": "service",
    "name": "Terapia Adolescente",
    "icon": "🎒",
    "category": "Psicología",
    "url": "psicologia.html#psico-adolescente",
    "keywords": ["jovenes", "identidad", "pubertad", "estudios", "emociones"]
  },
  {
    "type": "service",
    "name": "Terapia de Adultos",
    "icon": "👤",
    "category": "Psicología",
    "url": "psicologia.html#psico-adultos",
    "keywords": ["crecimiento", "crisis", "bienestar", "individual"]
  },
  {
    "type": "service",
    "name": "Terapia Parental",
    "icon": "👪",
    "category": "Psicología",
    "url": "psicologia.html#psico-parental",
    "keywords": ["padres", "madres", "crianza", "herramientas", "cuidadores"]
  },
  {
    "type": "service",
    "name": "Terapia Familiar",
    "icon": "🏠",
    "category": "Psicología",
    "url": "psicologia.html#psico-familiar",
    "keywords": ["hogar", "vinculos", "comunicacion", "familia", "sistémico"]
  },
  {
    "type": "service",
    "name": "Terapia de Pareja",
    "icon": "💑",
    "category": "Psicología",
    "url": "psicologia.html#psico-pareja",
    "keywords": ["relacion", "amor", "crisis", "novios", "esposos"]
  },
  {
    "type": "service",
    "name": "Terapia Perinatal",
    "icon": "🤰",
    "category": "Psicología",
    "url": "psicologia.html#psico-perinatal",
    "keywords": ["embarazo", "postparto", "maternidad", "bebe", "gestacion"]
  },
  {
    "type": "service",
    "name": "Terapia Online",
    "icon": "💻",
    "category": "Psicología",
    "url": "psicologia.html#psico-online",
    "keywords": ["videollamada", "distancia", "remoto", "internet", "casa"]
  },

  // SUB-SERVICIOS ESPECÍFICOS (FONOAUDIOLOGÍA)
  {
    "type": "service",
    "name": "Terapia de Deglución",
    "icon": "🥄",
    "category": "Fonoaudiología",
    "url": "fonoaudiologia.html#terapia-deglucion",
    "keywords": ["tragar", "comer", "disfagia", "alimentacion", "segura"]
  },
  {
    "type": "service",
    "name": "Estimulación Temprana",
    "icon": "🌈",
    "category": "Fonoaudiología",
    "url": "fonoaudiologia.html#estimulacion-temprana",
    "keywords": ["bebes", "primeros pasos", "habla", "desarrollo", "prevencion"]
  },
  {
    "type": "service",
    "name": "Voz Profesional",
    "icon": "🎤",
    "category": "Fonoaudiología",
    "url": "fonoaudiologia.html#voz-profesional",
    "keywords": ["profesores", "cantantes", "disfonia", "garganta", "cuerdas vocales"]
  },
  {
    "type": "service",
    "name": "Rehabilitación ACV",
    "icon": "🧠",
    "category": "Fonoaudiología",
    "url": "fonoaudiologia.html#rehabilitacion-acv",
    "keywords": ["derrame", "infarto cerebral", "afasia", "neurologico", "recuperacion"]
  },

  // SUB-SERVICIOS ESPECÍFICOS (TERAPIA OCUPACIONAL)
  {
    "type": "service",
    "name": "Integración Sensorial",
    "icon": "✨",
    "category": "Terapia Ocupacional",
    "url": "terapia-ocupacional.html#to-sensorial",
    "keywords": ["estímulos", "texturas", "ruidos", "perfil sensorial", "regulacion"]
  },
  {
    "type": "service",
    "name": "Actividades de la Vida Diaria (AVD)",
    "icon": "🛀",
    "category": "Terapia Ocupacional",
    "url": "terapia-ocupacional.html#to-avd",
    "keywords": ["autonomia", "bañarse", "vestirse", "comer solo", "independencia"]
  },
  {
    "type": "service",
    "name": "Selectividad Alimentaria",
    "icon": "🍎",
    "category": "Terapia Ocupacional",
    "url": "terapia-ocupacional.html#to-alimentaria",
    "keywords": ["comer", "mañoso", "texturas comida", "dieta restringida"]
  },

  // SUB-SERVICIOS ESPECÍFICOS (PEDIATRÍA)
  {
    "type": "service",
    "name": "Control Niño Sano",
    "icon": "🩺",
    "category": "Pediatría",
    "url": "pediatria.html#ped-nino-sano",
    "keywords": ["chequeo", "crecimiento", "peso", "talla", "vacunas"]
  },
  {
    "type": "service",
    "name": "Consultoría en Lactancia",
    "icon": "🤱",
    "category": "Pediatría",
    "url": "pediatria.html#ped-nutricion",
    "keywords": ["pecho", "amamantar", "leche materna", "dolor", "bebe"]
  },

  // PÁGINAS GENERALES
  {
    "type": "page",
    "name": "Convenios",
    "icon": "🤝",
    "url": "convenios.html",
    "keywords": ["isapre", "fonasa", "colegios", "empresas", "descuento"]
  },
  {
    "type": "page",
    "name": "Formación",
    "icon": "🎓",
    "url": "formacion.html",
    "keywords": ["cursos", "talleres", "profesionales", "estudiantes"]
  },
  {
    "type": "page",
    "name": "Quiénes Somos",
    "icon": "🏢",
    "url": "quienes-somos.html",
    "keywords": ["historia", "misión", "visión", "centro", "valu"]
  },
  {
    "type": "page",
    "name": "Ubicación y Dirección (Coquimbo)",
    "icon": "📍",
    "url": "index.html#contacto",
    "keywords": ["donde estan", "ubicacion", "direccion", "calle", "llegar", "sucursal", "coquimbo", "parque nacional lauca"]
  },
  {
    "type": "page",
    "name": "Lista de Aranceles y Precios 2026",
    "icon": "💰",
    "category": "Aranceles",
    "url": "index.html#precios",
    "keywords": ["precio", "valor", "costo", "cuanto vale", "pago", "arancel", "fonasa", "particular", "valores"]
  },
  {
    "type": "service",
    "name": "Test ADOS-2 (Evaluación TEA)",
    "icon": "🧩",
    "category": "Tests",
    "url": "test-evaluaciones.html#ados-2",
    "keywords": ["ados", "ados2", "ados-2", "tea", "autismo", "evaluacion", "diagnostico"]
  },
  {
    "type": "service",
    "name": "Entrevista ADI-R",
    "icon": "🧩",
    "category": "Tests",
    "url": "test-evaluaciones.html#adi-r",
    "keywords": ["adi-r", "adir", "tea", "autismo", "padres", "entrevista"]
  },
  {
    "type": "service",
    "name": "Evaluación TADI (0-6 años)",
    "icon": "🧩",
    "category": "Tests",
    "url": "test-evaluaciones.html#tadi",
    "keywords": ["tadi", "desarrollo", "infantil", "bebes", "niños"]
  },
  {
    "type": "service",
    "name": "Test WISC-V (Inteligencia)",
    "icon": "🧩",
    "category": "Tests",
    "url": "test-evaluaciones.html#wisc-v",
    "keywords": ["wisc", "wisc5", "wisc-v", "coeficiente", "intelectual", "cognitivo", "escolar"]
  },
  {
    "type": "service",
    "name": "Atención Online (Ver Especialidades)",
    "icon": "💻",
    "category": "Modalidad",
    "url": "index.html#especialidades",
    "keywords": ["remoto", "videollamada", "distancia", "telemedicina", "casa", "internet", "en línea", "zoom", "meet"]
  },
  {
    "type": "service",
    "name": "Atención Presencial",
    "icon": "📍",
    "category": "Modalidad",
    "url": "index.html#contacto",
    "keywords": ["sucursal", "oficina", "box", "centro", "coquimbo", "en persona", "físico", "lugar"]
  }
];



