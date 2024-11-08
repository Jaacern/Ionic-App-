# TeLlevoAPP

TeLlevoAPP es una aplicación móvil desarrollada en **Ionic Angular** que conecta a estudiantes que tienen transporte propio con aquellos que necesitan transporte para regresar a casa después de clases. La aplicación facilita la creación y aceptación de viajes, promoviendo el compañerismo y reduciendo la huella de carbono.

## 📱 Características

- **Registro e Inicio de Sesión**:  
  Autenticación mediante correo electrónico y contraseña utilizando **Firebase Authentication**.

- **Selección de Rol**:  
  Los usuarios pueden elegir entre ser **conductores** o **pasajeros**.

- **Creación de Viajes**:  
  Los conductores pueden crear viajes especificando el **destino**, **costo por persona** y **número de asientos disponibles**.

- **Aceptación de Viajes**:  
  Los pasajeros pueden ver los viajes disponibles y aceptar uno. Al hacerlo, **reservan un asiento** y pueden ver la **ruta** y la **ubicación del conductor**.

- **Mapa en Tiempo Real**:  
  Utiliza **Mapbox** para mostrar **rutas** y **ubicaciones en tiempo real**.

- **Historial de Viajes**:  
  Los usuarios pueden ver un historial de los **viajes** que han creado o aceptado.

## 🛠️ Tecnologías Utilizadas

- **Ionic Angular**: Framework para el desarrollo de aplicaciones híbridas.
- **Firebase**: Utilizado para la **autenticación** y la **base de datos en tiempo real**.
- **Mapbox**: Integración de **mapas** y **visualización de rutas**.
- **Capacitor Geolocation**: Para obtener la **ubicación actual** del usuario.

## 📝 Instalación

Para ejecutar esta aplicación localmente, sigue estos pasos:

### 🔧 Prerrequisitos
Asegúrate de tener instalados:

- **Node.js**
- **Ionic CLI**
- **Firebase CLI**
- **Capacitor CLI**

### 📥 Pasos de Instalación

1. **Clona este repositorio**:

   ```bash
   git clone https://github.com/tu-usuario/TeLlevoAPP.git
Navega al directorio del proyecto:

bash
Copiar código
cd TeLlevoAPP
Instala las dependencias del proyecto:

bash
Copiar código
npm install
Configura Firebase:

Crea un proyecto en Firebase Console.
Agrega la configuración de Firebase en environment.ts y environment.prod.ts.
Instala Capacitor Plugins:

bash
Copiar código
npm install @capacitor/core @capacitor/cli
npm install @capacitor/geolocation @capacitor/google-maps
Sincroniza Capacitor:

bash
Copiar código
npx cap sync
Inicia la aplicación en tu navegador:

bash
Copiar código
ionic serve
📦 Publicación del APK
Compila la aplicación para Android:

bash
Copiar código
ionic build
npx cap add android
npx cap open android
💡 Contribución
Las contribuciones son bienvenidas. Si deseas mejorar esta aplicación o agregar nuevas funcionalidades, no dudes en hacer un fork y enviar un pull request.

📄 Licencia
Este proyecto está licenciado bajo la Licencia MIT.

Explicación
Introducción: Descripción general de la aplicación.
Características: Lista de funcionalidades principales.
Tecnologías Utilizadas: Breve mención de las tecnologías clave.
Instalación: Pasos detallados para configurar el proyecto localmente.
Publicación del APK: Instrucciones para compilar y publicar el APK.
Contribución: Invitación para colaborar en el proyecto.
Licencia: Información sobre la licencia del proyecto.
markdown
Copiar código

### Explicación de los iconos:

- 📱 **Características**: Icono que representa una app o características generales.
- 🛠️ **Tecnologías Utilizadas**: Icono de herramientas para resaltar las tecnologías clave.
- 📝 **Instalación**: Icono de un papel y lápiz, ideal para los pasos de instalación.
- 🔧 **Prerrequisitos**: Herramienta para simbolizar las dependencias necesarias.
- 📦 **Publicación del APK**: Caja o paquete, haciendo alusión a la distribución del APK.
- 💡 **Contribución**: Bombilla, simboliza ideas y contribuciones abiertas.
- 📄 **Licencia**: Icono de documento para señalar la información sobre la licencia.

Con estos iconos se mejora la presentación y hace que la información sea más accesible visualmente
