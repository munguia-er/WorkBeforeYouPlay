# **Work Before You Play**

Un sistema de automatización para **Windows** que te ayuda a ser más productivo. Este script verifica si has subido un mínimo de líneas de código a tu cuenta de **GitHub** y, si has cumplido tu meta, te permite abrir tus juegos favoritos. De lo contrario, cierra el proceso del juego para mantenerte enfocado.

-----

## 🚀 **Instalación**

Sigue estos pasos para instalar y configurar la aplicación en tu sistema.

### **Requisitos**

Necesitas tener **Node.js** instalado en tu computadora. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).

### **1. Clonar el repositorio**

Abre tu terminal (o `Git Bash`) y clona este repositorio:

```bash
git clone https://github.com/munguia-er/WorkBeforeYouPlay
cd WorkBeforeYouPlay
```

### **2. Instalar dependencias**

Ve a la carpeta del proyecto y ejecuta el siguiente comando para instalar las librerías necesarias:

```bash
npm install
```

### **3. Configurar tus credenciales de GitHub**

Necesitas crear un **GitHub Personal Access Token** para que el script pueda acceder a tu actividad de código.

1.  Ve a [Configuración de GitHub \> Developer settings \> Personal access tokens](https://github.com/settings/tokens).
2.  Haz clic en **Generate new token (classic)**.
3.  Dale un nombre (ej: `work-before-play`).
4.  Selecciona el permiso `repo` (permite acceso a los repositorios).
5.  Copia el token generado (**no lo compartas con nadie**).

Ahora, copia el archivo `example.env` a un nuevo archivo llamado **`.env`** y edita tus credenciales:

```
GITHUB_USERNAME="tu_usuario_de_github"
GITHUB_TOKEN="tu_token_generado_aqui"
```

### **4. Configurar tus juegos**

Copia el archivo `config.js.example` a un nuevo archivo llamado **`config.json`** y edítalo para especificar los juegos que quieres monitorear.

  - **`name`**: El nombre del juego (ej: "League of Legends").
  - **`path`**: La ruta completa al archivo ejecutable del juego (`.exe`).
  - **`minLines`**: La cantidad mínima de líneas de código que debes subir para poder jugar.

<!-- end list -->

```json
{
  "games": [
    {
      "name": "League of Legends",
      "executable": "RiotClientServices.exe",
      "path": "C:\\Riot Games\\Riot Client\\RiotClientServices.exe",
      "minLines": 500
    }
  ]
}
```

-----

## ⚙️ **Uso de la aplicación**

Para usar la aplicación, simplemente ejecuta el archivo `.bat` que se encarga de todo el proceso de verificación.

### **1. Ejecutar la verificación**

Ejecuta el archivo **`game_name.bat`** que se encuentra en la raíz del proyecto. El script se encargará de:

1.  Verificar tus líneas de código en GitHub.
2.  Abrir el juego si cumples la meta.
3.  Cerrar el proceso si no la cumples.

-----

## 🖥️ **Crear un acceso directo en el escritorio**

Para que te sea más cómodo, puedes crear un acceso directo del archivo `.bat` y colocarlo en tu escritorio.

1.  Abre la carpeta del proyecto y busca el archivo **`game_name.bat`**.
2.  Haz clic derecho sobre el archivo y selecciona **"Enviar a" \> "Escritorio (crear acceso directo)"**.
3.  (Opcional) Puedes renombrar el acceso directo a algo como **"League of Legends"** y cambiar su ícono. Para cambiar el ícono, haz clic derecho sobre el acceso directo, ve a **Propiedades** y luego haz clic en **"Cambiar ícono..."** para seleccionar el del juego original (`.exe`).

Ahora, cada vez que hagas clic en este acceso directo, el sistema te forzará a ser productivo antes de poder jugar.

-----

## 📄 **Licencia**

Este proyecto está bajo la [Licencia de Código Abierto de GNU (GPL)](https://choosealicense.com/licenses/gpl-3.0/).

**Autor:** munguia-er