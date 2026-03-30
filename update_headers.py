import os
import re

def update_header(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Fix Header Container Height and Flex Layout
    content = content.replace('h-24 md:h-20', 'h-24')
    
    # Update Left Part (Logo) to shrink-0
    content = content.replace('flex items-center justify-start flex-grow min-w-0 pr-4', 'flex items-center justify-start shrink-0 pr-4')
    
    # Update Right Part (Nav/Buttons) to flex-grow with compact gaps
    # We target the old version first
    content = content.replace('flex items-center justify-end gap-2 sm:gap-4 shrink-0', 'flex items-center justify-end gap-2 sm:gap-x-4 flex-grow')
    # Or if already updated to flex-grow but with old gaps
    content = content.replace('flex items-center justify-end gap-2 sm:gap-4 flex-grow', 'flex items-center justify-end gap-2 sm:gap-x-4 flex-grow')

    # Compact Nav Desktop gaps
    content = content.replace('gap-8 mr-6', 'gap-x-5 mr-4')

    # Update comments for clarity
    content = content.replace('AHORA CON FLEX-GROW PARA OCUPAR TODO EL ESPACIO RESTANTE', 'AHORA CON SHRINK-0 PARA MANTENERSE FIJO A LA IZQUIERDA')
    content = content.replace('AHORA CON SHRINK-0 PARA MANTENERSE FIJO A LA DERECHA', 'AHORA CON FLEX-GROW PARA OCUPAR EL ESPACIO RESTANTE')

    # 2. Fix Logo Text Size and container
    content = content.replace('md:text-lg text-primary-900', 'md:text-xl text-primary-900')
    content = content.replace('md:text-[10px] tracking-tight', 'md:text-[11px] tracking-tight')

    # 3. Hide Contact button on mobile only in the HEADER
    def add_hidden_header_button(text):
        header_match = re.search(r'<header.*?</header>', text, re.S)
        if not header_match: return text
        header_content = header_match.group(0)
        
        # Non-capturing group for filenames ?:
        forms_pattern = r'(?:formulario-contacto|contacto-convenios|formulario-formacion)\.html'
        
        # pattern:
        # Group 1: Prefix with href and class="
        # Group 2: Existing classes
        # Group 3: Rest of the tag and content
        button_pattern = r'(<a\s+[^>]*?href="' + forms_pattern + r'"[^>]*?class=")(?![^"]*hidden sm:flex)([^"]*?bg-primary-600[^"]*?")([^>]*?>\s*Contáctanos\s*</a>)'
        
        updated_header = re.sub(button_pattern, r'\1hidden sm:flex \2\3', header_content, flags=re.S)
        
        if updated_header != header_content:
            return text.replace(header_content, updated_header)
        return text

    content = add_hidden_header_button(content)

    # 4. Apple/iOS Optimizations (Metadata)
    if 'viewport-fit=cover' not in content:
        content = content.replace('content="width=device-width, initial-scale=1.0"', 'content="width=device-width, initial-scale=1.0, viewport-fit=cover"')
    
    apple_meta = """    <link rel="apple-touch-icon" href="assets/brand/logo-valu.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="Centro Valu">"""
    
    if 'apple-mobile-web-app-capable' not in content:
        content = content.replace('<link rel="icon" type="image/png" href="favicon.png">', '<link rel="icon" type="image/png" href="favicon.png">\n' + apple_meta)

    # 5. CSS Compatibility (Webkit)
    if '-webkit-backdrop-filter' not in content:
        content = content.replace('backdrop-filter: blur(12px);', 'backdrop-filter: blur(12px);\n            -webkit-backdrop-filter: blur(12px);')
    
    # Global iOS/Safari fixes in the first <style> block
    ios_css = """
        /* iOS Normalization & Tap Highlight */
        input, button, textarea, select {
            -webkit-appearance: none;
            appearance: none;
        }
        
        .rounded-xl { border-radius: 0.75rem !important; }
        .rounded-2xl { border-radius: 1rem !important; }
        .rounded-3xl { border-radius: 1.5rem !important; }
        .rounded-\[2rem\] { border-radius: 2rem !important; }
        .rounded-\[2\.5rem\] { border-radius: 2.5rem !important; }

        * {
            -webkit-tap-highlight-color: transparent;
        }"""
    
    if '-webkit-tap-highlight-color' not in content:
        # Insert before the closing </style> of the first style block (usually focus rings or animations)
        content = content.replace('</style>', ios_css + '\n    </style>', 1)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    
    return False

# List of files to process
html_files = [f for f in os.listdir('.') if f.endswith('.html')]
updated_count = 0
updated_files = []

for file in html_files:
    if file == 'index.html': continue # Manual version
    if update_header(file):
        updated_count += 1
        updated_files.append(file)

print(f"Updated {updated_count} files correctly.")
if updated_files:
    print(f"Files: {', '.join(updated_files)}")
