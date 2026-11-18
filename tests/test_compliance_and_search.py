"""
Archivo: tests/test_compliance_and_search.py
Descripción: Suite de pruebas automatizadas para verificar el cumplimiento normativo legal
             (Ley 19.628, Ley 20.584, Ley 21.430, APDP/GDPR) de privacidad y términos,
             así como la integración y navegación del buscador global de Centro Valu.
Fecha de última modificación: 2026-11-18
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

        # Nueva sucursal y Gimnasio Terapéutico
        self.assertIn('"Gimnasio Terapéutico"', content)
        self.assertIn('"gimnasio-terapeutico.html"', content)
        self.assertIn('"estimulacion temprana"', content)
        self.assertIn('"gil de castro"', content)

    def test_search_logic_enter_key(self):
        """Verifica que search-logic.js permita seleccionar y navegar directamente con Enter."""
        content = self._read_file('assets/js/search-logic.js')

        self.assertIn("e.key === 'Enter'", content)
        self.assertIn("firstResult.click()", content)

    def test_footer_links_presence(self):
        """Verifica que las principales páginas públicas enlacen a /privacidad y /terminos en el footer."""
        pages = [
            'index.html',
            'gimnasio-terapeutico.html',
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

    def test_gimnasio_terapeutico_compliance(self):
        """Verifica que gimnasio-terapeutico.html cumpla con canonical limpio, SEO, sedes y datos clave."""
        content = self._read_file('gimnasio-terapeutico.html')

        # 1. Canonical limpio sin .html
        self.assertIn('<link rel="canonical" href="https://centrovalu.cl/gimnasio-terapeutico"', content)

        # 2. Dirección de nueva sucursal
        self.assertIn('Gil de Castro 122', content)

        # 3. Planes oficiales
        self.assertIn('Plan Descubrimiento', content)
        self.assertIn('Plan Exploración', content)
        self.assertIn('Plan Crecimiento', content)
        self.assertIn('Plan Integral', content)

        # 4. Enlace a WhatsApp directo con mensaje predefinido
        self.assertIn('wa.me/56972454921', content)

    def test_bruno_araya_photo_standard_and_sync(self):
        """Verifica que la foto de Bruno Araya exista, cumpla con el peso máximo (<100KB) y tenga versión sincronizada."""
        webp_path = os.path.join(BASE_DIR, 'assets', 'img', 'team', 'bruno-araya.webp')
        self.assertTrue(os.path.exists(webp_path), "La imagen WebP de Bruno Araya debe existir.")
        file_size = os.path.getsize(webp_path)
        self.assertLess(file_size, 100 * 1024, f"El archivo bruno-araya.webp debe pesar menos de 100KB (actual: {file_size} bytes).")

        target_ref = 'assets/img/team/bruno-araya.webp?v=202610'
        for rel_file in ['assets/js/pro-data.js', 'assets/js/search-data.js', 'fonoaudiologia.html', 'profesionales.html']:
            content = self._read_file(rel_file)
            self.assertIn(target_ref, content, f"{rel_file} debe referenciar {target_ref} con cache-busting actualizado.")

    def test_gimnasio_and_to_images_and_programs(self):
        """Verifica que las imágenes y nuevos contenidos de gimnasio y terapia ocupacional existan y estén enlazados."""
        colgantes = os.path.join(BASE_DIR, 'assets', 'img', 'gimnasio', 'Colgantes.jpeg')
        sensorial = os.path.join(BASE_DIR, 'assets', 'img', 'gimnasio', 'Sensorial.jpeg')
        piscina = os.path.join(BASE_DIR, 'assets', 'img', 'gimnasio', 'piscina pelotas.jpeg')
        self.assertTrue(os.path.exists(colgantes), 'Colgantes.jpeg debe existir')
        self.assertTrue(os.path.exists(sensorial), 'Sensorial.jpeg debe existir')
        self.assertTrue(os.path.exists(piscina), 'piscina pelotas.jpeg debe existir')

        gim_html = self._read_file('gimnasio-terapeutico.html')
        self.assertIn('assets/img/gimnasio/Colgantes.jpeg', gim_html)
        self.assertIn('assets/img/gimnasio/Sensorial.jpeg', gim_html)
        self.assertIn('assets/img/gimnasio/piscina%20pelotas.jpeg', gim_html)
        self.assertIn('object-[center_90%]', gim_html)

        to_html = self._read_file('terapia-ocupacional.html')
        self.assertIn('assets/img/gimnasio/Colgantes.jpeg', to_html)
        self.assertIn('Habilidades Sociales', to_html)
        self.assertIn('Selectividad Alimentaria', to_html)
        self.assertIn('Modalidades y Programas', to_html)
        self.assertIn('Evaluación de Terapia Ocupacional', to_html)
        self.assertIn('Plan Individual', to_html)
        self.assertIn('Plan en Pareja', to_html)
        self.assertIn('Plan Grupal', to_html)

    def test_retired_professionals_removed(self):
        """Verifica que Valeria Alfaro y Priscilla Figueroa hayan sido retiradas de páginas y buscadores."""
        files_to_check = [
            'profesionales.html',
            'psicologia.html',
            'terapia-ocupacional.html',
            'assets/js/pro-data.js',
            'assets/js/search-data.js'
        ]
        for rel_path in files_to_check:
            content = self._read_file(rel_path)
            self.assertNotIn('valeria-alfaro', content, f'valeria-alfaro no debe existir en {rel_path}')
            self.assertNotIn('priscilla-figueroa', content, f'priscilla-figueroa no debe existir en {rel_path}')
            self.assertNotIn('Valeria Alfaro', content, f'Valeria Alfaro no debe existir en {rel_path}')
            self.assertNotIn('Priscilla Figueroa', content, f'Priscilla Figueroa no debe existir en {rel_path}')

if __name__ == '__main__':
    unittest.main()

