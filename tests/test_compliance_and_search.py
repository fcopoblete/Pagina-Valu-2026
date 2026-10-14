"""
Archivo: tests/test_compliance_and_search.py
Descripción: Suite de pruebas automatizadas para verificar el cumplimiento normativo legal
             (Ley 19.628, Ley 20.584, Ley 21.430, APDP/GDPR) de privacidad y términos,
             así como la integración y navegación del buscador global de Centro Valu.
Fecha de última modificación: 2026-10-14
Autor: Antigravity (AI Assistant)
"""

import unittest
import os
import re

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

class TestCentroValuComplianceAndSearch(unittest.TestCase):

    def _read_file(self, relative_path):
        full_path = os.path.join(BASE_DIR, relative_path)
        self.assertTrue(os.path.exists(full_path), f"El archivo {relative_path} debe existir.")
        with open(full_path, 'r', encoding='utf-8') as f:
            return f.read()

    def test_privacidad_compliance(self):
        """Verifica que privacidad.html cumpla con las leyes de salud y protección de datos."""
        content = self._read_file('privacidad.html')

        # 1. Identificación jurídica
        self.assertIn('CENTRO VALÚ SALUD INTEGRAL SPA', content)
        self.assertIn('77.058.617-8', content)
        self.assertIn('centrovalu@gmail.com', content)
        self.assertIn('+569 7245 4921', content)

        # 2. Marco Legal
        self.assertIn('Ley N° 19.628', content)
        self.assertIn('Ley N° 20.584', content)
        self.assertIn('Ley N° 21.430', content)
        self.assertIn('Nueva Ley de Protección de Datos Personales', content)

        # 3. Derechos ARCOP completos
        arcop_rights = ['Acceso', 'Rectificación', 'Cancelación', 'Oposición', 'Portabilidad', 'Bloqueo']
        for right in arcop_rights:
            self.assertIn(right, content, f"Falta el derecho {right} en la política de privacidad.")

        # 4. Plazos y custodia clínica
        self.assertIn('15 días hábiles', content)
        self.assertIn('15 años', content)

        # 5. Canonical limpio
        self.assertIn('<link rel="canonical" href="https://centrovalu.cl/privacidad"', content)

    def test_terminos_compliance(self):
        """Verifica que terminos.html contemple condiciones claras de salud, fonasa y cancelación."""
        content = self._read_file('terminos.html')

        # 1. Identificación jurídica
        self.assertIn('CENTRO VALÚ SALUD INTEGRAL SPA', content)
        self.assertIn('77.058.617-8', content)
        self.assertIn('centrovalu@gmail.com', content)

        # 2. Exclusión de urgencias médicas
        self.assertIn('131', content)
        self.assertIn('*4141', content)
        self.assertIn('Exclusión de Urgencias Médicas', content)

        # 3. Cancelación e inasistencias
        self.assertIn('24 horas de anticipación', content)

        # 4. Convenios y previsional
        self.assertIn('Convenio Fonasa', content)
        self.assertIn('Isapres y Reembolsos', content)

        # 5. Menores de edad y derechos de pacientes
        self.assertIn('Ley N° 20.584', content)
        self.assertIn('Ley N° 21.430', content)

        # 6. Jurisdicción
        self.assertIn('Coquimbo', content)

        # 7. Canonical limpio
        self.assertIn('<link rel="canonical" href="https://centrovalu.cl/terminos"', content)

    def test_search_data_integration(self):
        """Verifica que search-data.js contenga los ítems de Privacidad y Términos con sus palabras clave."""
        content = self._read_file('assets/js/search-data.js')

        self.assertIn('"Política de Privacidad"', content)
        self.assertIn('"privacidad.html"', content)
        self.assertIn('"privacidad"', content)
        self.assertIn('"proteccion de datos"', content)
        self.assertIn('"arcop"', content)

        self.assertIn('"Términos y Condiciones"', content)
        self.assertIn('"terminos.html"', content)
        self.assertIn('"terminos"', content)
        self.assertIn('"cancelacion"', content)
        self.assertIn('"urgencias"', content)

    def test_search_logic_enter_key(self):
        """Verifica que search-logic.js permita seleccionar y navegar directamente con Enter."""
        content = self._read_file('assets/js/search-logic.js')

        self.assertIn("e.key === 'Enter'", content)
        self.assertIn("firstResult.click()", content)

    def test_footer_links_presence(self):
        """Verifica que las principales páginas públicas enlacen a /privacidad y /terminos en el footer."""
        pages = [
            'index.html',
            'psicologia.html',
            'pediatria.html',
            'fonoaudiologia.html',
            'terapia-ocupacional.html',
            'psicopedagogia.html',
            'test-evaluaciones.html',
            'formacion.html',
            'convenios.html',
            'quienes-somos.html',
            'profesionales.html'
        ]
        for page in pages:
            content = self._read_file(page)
            self.assertIn('/privacidad', content, f"{page} debe tener enlace a /privacidad en el footer.")
            self.assertIn('/terminos', content, f"{page} debe tener enlace a /terminos en el footer.")

if __name__ == '__main__':
    unittest.main()
