# 📲 CarnetDigital

**Autor:** Fabio López  
**Descripción:**  
Aplicación móvil desarrollada con React Native (Expo) que simula un carnet digital con datos personales, notas, talleres y funcionalidades básicas de edición de perfil. Guarda datos localmente usando AsyncStorage y ofrece una interfaz moderna con navegación por pestañas y generación aleatoria de datos académicos.

---

## Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Pasos para clonar y correr el proyecto

**Clona el repositorio**
    ```bash
        - git clone https://github.com/tu_usuario/CarnetDigital.git

**Entra al proyecto**
    ```bash
        - cd CarnetDigital

**Instala dependencias**
    ```bash
        - npm install

**Inicia el servidor de desarrollo**
    ```bash
        - npm start

**Configurar para Web**
    ```bash
        - npx expo install react-dom react-native-web @expo metro-runtime


## Estructura del proyecto
**CarnetDigital/**
    ```bash
        │
        ├── App.js
        │
        ├── /components
        │   ├── Navigation.js
        │   └── /nav
        │       └── Tabs.js
        │
        ├── /screens
        │   ├── registration/
        │   │   ├── LoginScreen.js
        │   │   └── RegisterScreen.js
        │   ├── CarnetScreen.js
        │   ├── EditScreen.js
        │   ├── SettingsScreen.js
        │   ├── NotasScreen.js
        │   └── TalleresScreen.js
        │
        └── /context
            ├── AuthContext.js
            └── DataContext.js

### Instalaciones clave
**Navegacion**
    ```bash
        - npx expo install @react-navigation/native
        - npx expo install @react-navigation/native-stack
        - npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
        - npx expo install @react-navigation/bottom-tabs
        - npm install @react-navigation/material-top-tabs react-native-tab-view
**Imagenes**
    ```bash
        - npx expo install expo-image-picker
**AsyncStorage**
    ```bash
        - npx expo install @react-native-async-storage/async-storage
**QR**
    ```bash
        - npm install react-native-qrcode-svg
        - npx expo install react-native-svg

### Ver versiones instaladas:
**...**
    ```bash
        - npm list --depth=0
**Ejemplo de de este caso:**
├── @babel/core@7.27.1
├── @expo/metro-runtime@5.0.4
├── @react-native-async-storage/async-storage@2.1.2
├── @react-navigation/bottom-tabs@7.3.13
├── @react-navigation/material-top-tabs@7.2.13    
├── @react-navigation/native-stack@7.3.13
├── @react-navigation/native@7.1.9
├── expo-image-picker@16.1.4
├── expo-status-bar@2.2.3
├── expo@53.0.9
├── react-dom@19.0.0
├── react-native-gesture-handler@2.24.0
├── react-native-qrcode-svg@6.3.15
├── react-native-reanimated@3.17.5
├── react-native-safe-area-context@5.4.0
├── react-native-screens@4.10.0
├── react-native-svg@15.11.2
├── react-native-tab-view@4.1.0
├── react-native-web@0.20.0
├── react-native@0.79.2
└── react@19.0.0

## Arquitectura general

### Navegación
Navigation.js: 
Contiene la lógica para mostrar diferentes stacks según si hay usuario logueado (usando AsyncStorage).
- AuthStack: Acceso a Login y Register.
- AppStack: Acceso a las pantallas principales de la app.

Tabs.js:
- BottomTabs: Navegación general.
- TopTabs: Acceso a Notas y Talleres.
### Contextos
AuthContext.js:
- Guarda usuarios.
- Funciones: login, register, logout, updateProfile.
### Almacena sesión en AsyncStorage.
DataContext.js:
- Genera y expone datos de notas y talleres aleatorios.
- Se accede con el hook useData().

## Funcionalidades por pantalla

### LoginScreen
- Ingreso con matrícula y contraseña.
- Navegación a registro.
- Validación de campos vacíos.
### RegisterScreen
- Registro de nombre, carrera, correo e imagen.
- Usa expo-image-picker para seleccionar desde la galería.
- Generación automática de matrícula.
- Validación de formato de correo y campos completos.
### CarnetScreen
- Muestra carnet con giro animado (frente/reverso).
- Usa Animated.Value y rotaciones en eje Y.
### EditScreen
- Permite actualizar datos del usuario.
- Selección de nueva imagen de perfil.
- Guarda cambios en contexto y AsyncStorage.
### NotasScreen
- Muestra 3 materias con notas aleatorias (0 a 5).
- Indica si está Aprobado o Reprobado.
- Estilo responsivo con tarjetas.
### TalleresScreen
- Muestra 5 talleres generados aleatoriamente.
- 2 Completados, otros con estado aleatorio.
- Scroll y diseño adaptado.
### SettingsScreen
- Cierre de sesión con confirmación (Alert).
- Switch de notificaciones (sin funcionalidad activa aún).
- Guarda preferencia de notificaciones en AsyncStorage.

## Estilo general
Tema oscuro consistente en todas las pantallas.
Uso de SafeAreaView, ScrollView, KeyboardAvoidingView.
Diseño centrado, con tipografía clara y botones accesibles.
Animaciones fluidas y experiencia nativa.
