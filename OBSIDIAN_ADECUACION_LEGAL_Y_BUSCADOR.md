<!--
Que hace el archivo: Bitácora de Obsidian que documenta la adecuación legal de Centro Valu (Ley 19.628, Ley 20.584, Ley 21.430, APDP/GDPR), la actualización de Términos y Condiciones, la indexación del buscador global y la creación de la suite de pruebas automatizadas.
Fecha de última modificación: 2026-10-14
Nombre del autor: Antigravity & fcopoblete
-->
# ⚖️ Bitácora: Adecuación Legal Integral, Buscador Global y Tests - Centro Valu

Documentación técnica y regulatoria sobre la actualización de la **Política de Privacidad** ([privacidad.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/privacidad.html)) y los **Términos y Condiciones** ([terminos.html](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/terminos.html)) de Centro Valu, su integración en el buscador modal ([search-data.js](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/assets/js/search-data.js) y [search-logic.js](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/assets/js/search-logic.js)), y la creación de la suite de pruebas unitarias automatizadas ([tests/test_compliance_and_search.py](file:///c:/Users/franc/Desktop/Espacio%20unico/Antigravity/Pagina%20Valu/tests/test_compliance_and_search.py)).

---

## 📌 1. Motivación y Diagnóstico de Cumplimiento

Antes de esta actualización, el sitio web contaba con políticas genéricas (versión 1.0) que no satisfacían los estándares regulatorios exigidos para el sector salud en Chile ni anticipaban la entrada en vigor de la **Nueva Ley de Protección de Datos Personales** (Agencia de Protección de Datos Personales - APDP / estándar GDPR).

### Brechas detectadas y resueltas:
1. **Falta de Individualización Jurídica:** No se individualizaba la razón social ni el RUT de la sociedad titular.
2. **Ausencia de Protección Reforzada en Salud:** Tratamiento de datos sensibles de salud sin mención expresa de la **Ley N° 20.584** (Derechos y Deberes del Paciente), secreto profesional y custodia de fichas clínicas por 15 años (D.S. N° 41 MINSAL).
3. **Omisión de Pacientes Menores de Edad:** No existían cláusulas conforme a la **Ley N° 21.430** sobre el consentimiento informado por parte de padres o tutores legales.
4. **Catálogo ARCOP Incompleto:** Solo se mencionaba acceso y rectificación, omitiendo Oposición, Portabilidad y Bloqueo, así como el plazo legal de respuesta (15 días hábiles).
5. **Aviso Crítico de Urgencias:** En los términos no se excluían formalmente las emergencias médicas con riesgo vital ni se proveían los números de emergencia oficiales de Chile.

---

## 🏢 2. Identificación Oficial de la Entidad Responsable

Ambos documentos incorporan formalmente la personería jurídica de la institución:

* **Razón Social:** `CENTRO VALÚ SALUD INTEGRAL SPA`
* **RUT:** `77.058.617-8`
* **Nombre de Fantasía:** `Centro Valu`
* **Ubicación y Domicilio:** Coquimbo, Región de Coquimbo, Chile
* **Correo Oficial de Privacidad y Contacto:** `centrovalu@gmail.com`
* **Teléfono:** `+569 7245 4921`
* **Tribunales Competentes:** Tribunales Ordinarios de Justicia de Coquimbo / La Serena

---

## 🛡️ 3. Modificaciones Implementadas en Privacidad y Términos

### A. Política de Privacidad (`privacidad.html` - Versión 2.0)
* **Bases de Licitud:** Distinción clara entre fines asistenciales/sanitarios, consentimiento expreso en formularios y cookies analíticas.
* **Derechos ARCOP:** Acceso, Rectificación, Cancelación, Oposición, Portabilidad y Bloqueo. Canal gratuito vía correo con respuesta en un plazo máximo de **15 días hábiles**.
* **Fichas Clínicas:** Deber de reserva médica y resguardo por un período mínimo legal de **15 años**.
* **Menores de Edad:** Representación legal obligatoria y principio del interés superior del niño.
* **Seguridad y Brechas:** Transmisión cifrada HTTPS (SSL/TLS), control de acceso y protocolo de notificación de incidentes ante la APDP.

### B. Términos y Condiciones (`terminos.html` - Versión 2.0)
* **Exclusión de Urgencias:** Advertencia destacada (bloque amber) que aclara que el sitio web no gestiona urgencias vitales ni crisis agudas, derivando al **SAMU (131)**, **Línea de Prevención del Suicidio (*4141)** o centros de urgencia hospitalarios.
* **Agendamiento:** Las solicitudes en formularios representan pre-reservas sujetas a confirmación.
* **Pagos y Previsión:** Regulación de compra y validación de bonos **Fonasa** y emisión de boletas de salud para reembolso en Isapres y seguros complementarios.
* **Política de Cancelación:** Cancelaciones o reprogramaciones con un mínimo de **24 horas hábiles** de anticipación para evitar pérdida del cupo clínico.

---

## 🔍 4. Integración en el Buscador Global del Sitio

Para optimizar la experiencia de usuario y facilitar el acceso a la documentación legal:

1. **Datos en `assets/js/search-data.js`:**
   * Se incorporó el ítem `Política de Privacidad` (`url: "privacidad.html"`, ícono `🔒`, categoría `Legal`). Palabras clave indexadas: *privacidad, datos, protección de datos, confidencialidad, arco, arcop, cookies, ley 19628, ley 20584, consentimiento*.
   * Se incorporó el ítem `Términos y Condiciones` (`url: "terminos.html"`, ícono `📄`, categoría `Legal`). Palabras clave indexadas: *términos, condiciones, legal, reglamento, cancelación, inasistencias, pagos, urgencias, acuerdo*.
2. **Navegación Rápida en `assets/js/search-logic.js`:**
   * Se implementó el escucha del evento `keydown` para la tecla **Enter (↵)** en el input de búsqueda. Si el usuario escribe una búsqueda y presiona Enter, el buscador activa de inmediato el enlace del primer resultado, navegando de forma instantánea.

---

## 🧪 5. Suite de Pruebas Automatizadas

Se desarrolló el script de validación en Python `tests/test_compliance_and_search.py` que comprueba:

| Test Unitario | Elementos Verificados | Resultado |
| :--- | :--- | :---: |
| `test_privacidad_compliance` | Razón social, RUT, correo, teléfono, leyes 19.628, 20.584, 21.430, APDP, derechos ARCOP, plazo 15 días, 15 años custodia, canonical limpio. | ✅ PASS |
| `test_terminos_compliance` | Individualización jurídica, números de urgencia 131 y *4141, regla de 24 hrs, Fonasa, Isapres, menores, jurisdicción Coquimbo, canonical. | ✅ PASS |
| `test_search_data_integration` | Presencia de Política de Privacidad y Términos y Condiciones en `searchData` con palabras clave normalizadas. | ✅ PASS |
| `test_search_logic_enter_key` | Manejo del evento Enter en el input y ejecución de `click()` en el primer elemento. | ✅ PASS |
| `test_footer_links_presence` | Presencia obligatoria de enlaces `/privacidad` y `/terminos` en 11 páginas públicas clave. | ✅ PASS |

**Comando de ejecución:**
```bash
python -m unittest tests/test_compliance_and_search.py
```
> Resultado: `Ran 5 tests in 0.216s - OK`
