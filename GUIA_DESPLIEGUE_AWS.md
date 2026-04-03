# Guía de Despliegue en AWS para Centro Valu

Aquí tienes la hoja de ruta para publicar la página web en AWS. Dado que el sitio web que construimos es "estático" (archivos HTML, CSS y JS puro que no requieren un compilador en el servidor como PHP o Node), tienes excelentes opciones en AWS.

## 🚨 Tareas Críticas antes de salir a Producción

Aunque el código ya está optimizado y los webhooks apuntan a los endpoints de producción, antes de desplegar te recomiendo evaluar lo siguiente:

> [!WARNING]
> **Configuración de CORS en n8n:** Tus formularios se comunican con tu n8n (`https://n8n.sinesfuerzo.cl`). Asegúrate de que el webhook de tu n8n permita solicitudes (Cross-Origin Resource Sharing) desde el dominio oficial que conectarás (ej: `https://centrovalu.cl`). De lo contrario, los envíos de los pacientes fallarán con un error en el navegador.

> [!IMPORTANT]
> **Certificado SSL (HTTPS):** La página web en producción **debe** utilizar HTTPS. Si despliegas con HTTP, el navegador bloqueará los formularios hacia n8n por ser "Contenido Mixto" inseguro, y pedirá permisos molestos. 
> *Las soluciones que te detallo más abajo en AWS te proveen un SSL gratuito fácilmente.*

> [!TIP]
> **Analítica y Seguimiento:** Si planeas medir métricas o lanzar campañas, es el momento ideal para introducir la etiqueta de **Google Analytics 4** o **Meta Pixel** en el `head` de los archivos. (Si lo deseas, yo puedo añadirlos rápidamente antes de que despliegues).

---

## 🚀 Opciones de Despliegue en AWS

Has mencionado "una instancia de AWS" (lo que típicamente se refiere a **EC2**). Sin embargo, al ser un sitio web estático, un EC2 clásico puede ser matar moscas a cañonazos y añadirte mantenimiento de servidor innecesario. 

Aquí tienes las 2 mejores formas de hacerlo, elige la que más te acomode:

### Opción 1: AWS Amplify (🏆 MUY Recomendado)

Es la forma más rápida y robusta para sitios web modernos. Como ya tienes el código subido a Git/GitHub, Amplify lee tu repositorio y publica la web automáticamente. Cada vez que hacemos un `git push` (como el que acabamos de hacer), la web se actualizará sola sin que tengas que entrar a un servidor por comandos.

**Paso a paso con Amplify:**
1. Ve a la consola de AWS y busca el servicio **AWS Amplify**.
2. Haz clic en **Host web app** (o *New app -> Host web app*).
3. Selecciona **GitHub** como tu proveedor de repositorio y conéctalo con tu cuenta.
4. Selecciona el repositorio de **Pagina Valu** y la rama `main`.
5. Deja la configuración de construcción ("Build settings") por defecto que AWS detecte y dale a guardar/desplegar. ¡Tu sitio estará online al instante con una URL temporal de AWS!
6. En el menú de Amplify del proyecto, ve a **Domain Management** -> **Add domain**. 
7. Escribe tu dominio de nic.cl (ej: `centrovalu.cl`), y AWS te dará unos "Registros A o CNAME" que debes copiar e ir a pegar a nic.cl (en la configuración DNS del dominio). AWS te proveerá el certificado **SSL GRATIS** automáticamente en cuanto el dominio propague.

### Opción 2: Instancia EC2 con Nginx (☁️ El Servidor Clásico)

Si prefieres tener un "servidor virtual" que puedas gestionar tú mismo desde la consola, o si a futuro quieres correr bases de datos o servicios (como n8n) bajo el mismo techo.

**Paso a paso con EC2:**
1. Ve a la consola **EC2** en AWS.
2. Haz clic en **Launch Instance** (Lanzar instancia).
3. Selecciona una "AMI" (Sistema Operativo) como **Ubuntu 24.04**. Elige el tipo de instancia `t2.micro` o `t3.micro` (suelen entrar en la capa gratuita el primer año).
4. Crea o selecciona un **Key pair (.pem)** para poder conectarte por SSH a la máquina.
5. En Configuración de Red (Network Settings), asegúrate de marcar estas casillas antes de avanzar:
   - *Allow SSH traffic*
   - ***Allow HTTP traffic from the internet***
   - ***Allow HTTPS traffic from the internet***
6. Lanza la instancia. Una vez iniciada, anota su "Public IPv4 address".

**Conexión y archivos (vía terminal/SSH):**
Te conectarás a la IP mediante `ssh -i tu-llave.pem ubuntu@TU_IP_PUBLICA`.
Luego, instalas el servidor web y bajas el código de GitHub:

```bash
# 1. Actualizas el sistema e instalas servidor web y git
sudo apt update && sudo apt install nginx git -y

# 2. Clonas este código que acabamos de mandar a GitHub (solo necesitas la URL pública)
sudo rm -rf /var/www/html/*
sudo git clone https://github.com/TU-USUARIO/El-Repo.git /temp-repo
sudo cp -r /temp-repo/* /var/www/html/

# 3. Permisos para que la web lea los archivos
sudo chown -R www-data:www-data /var/www/html/
```

**Para conectar el Dominio (nic.cl) y el SSL:**
1. En tu panel de NIC.cl debes asignar un servidor DNS apuntando hacia la "Public IPv4 address" de tu EC2.
2. **Para el SSL:** Vuelves a la terminal del EC2 y ejecutas:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d centrovalu.cl -d www.centrovalu.cl
   ```
   Certbot configurará automáticamente `nginx` para que tengas HTTPS seguro con un certificado sin costo a través de Let's Encrypt.
