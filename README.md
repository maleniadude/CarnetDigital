# 📲 CarnetDigital

**Autor:** Fabio López  
**Descripción:**  
Aplicación móvil desarrollada con React Native (Expo) que simula un carnet digital con datos personales, notas, talleres y funcionalidades básicas de edición de perfil. Guarda datos localmente usando AsyncStorage y ofrece una interfaz moderna con navegación por pestañas y generación aleatoria de datos académicos.

---

## 🚀 Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Pasos para clonar y correr el proyecto

```bash
# Clona el repositorio
git clone https://github.com/tu_usuario/CarnetDigital.git

# Entra al proyecto
cd CarnetDigital

# Instala dependencias
npm install

# Inicia el servidor de desarrollo
npm start

# (Opcional) Configuración para entorno web
npx expo install react-dom react-native-web @expo/metro-runtime
```

---

## 📁 Estructura del proyecto

```
CarnetDigital/
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
```

---

## 📦 Instalaciones clave

### 📌 Navegación

```bash
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install @react-navigation/bottom-tabs
npm install @react-navigation/material-top-tabs react-native-tab-view
```

### 🖼️ Imágenes

```bash
npx expo install expo-image-picker
```

### 💾 AsyncStorage

```bash
npx expo install @react-native-async-storage/async-storage
```

### 📷 QR

```bash
npm install react-native-qrcode-svg
npx expo install react-native-svg
```

---

## 🧪 Ver versiones instaladas

```bash
npm list --depth=0
```

Ejemplo:

```bash
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
```

---

## 🧱 Arquitectura general

### 🔀 Navegación

- **Navigation.js:** Lógica de navegación basada en si hay un usuario autenticado (verifica desde AsyncStorage).
  - **AuthStack:** Pantallas de Login y Registro.
  - **AppStack:** Pantallas principales de la app.

- **Tabs.js:**
  - Navegación por pestañas inferiores (Bottom Tabs).
  - Navegación entre Notas y Talleres (Top Tabs).

### 🧠 Contextos

- **AuthContext.js:**
  - Maneja usuarios registrados y la sesión activa.
  - Funciones: `login`, `register`, `logout`, `updateProfile`.

- **DataContext.js:**
  - Genera datos aleatorios de notas y talleres.
  - Se accede mediante el hook `useData()`.

---

## 🖥️ Funcionalidades por pantalla

### 🔐 LoginScreen
- Inicio de sesión con matrícula y contraseña.
- Enlace a la pantalla de registro.
- Validación de campos vacíos.

### 📝 RegisterScreen
- Registro de nombre, carrera, correo e imagen.
- Uso de `expo-image-picker` para seleccionar imagen desde galería.
- Generación automática de matrícula.
- Validación de formato de correo y campos requeridos.

### 🪪 CarnetScreen
- Visualización del carnet con animación de giro (frontal y reverso).
- Uso de `Animated.Value` para rotación en eje Y.

### ✏️ EditScreen
- Permite actualizar información del usuario.
- Selección de nueva imagen de perfil.
- Guarda cambios en contexto y en AsyncStorage.

### 📊 NotasScreen
- Muestra 3 materias con notas aleatorias entre 0 y 5.
- Indica si el usuario está "Aprobado" o "Reprobado".
- Estilo responsivo con tarjetas.

### 🛠️ TalleresScreen
- Muestra 5 talleres generados aleatoriamente.
- 2 se muestran como completados, los otros con estado aleatorio.
- Scroll habilitado y diseño adaptable.

### ⚙️ SettingsScreen
- Cierre de sesión con confirmación (`Alert`).
- Switch para activar/desactivar notificaciones (sin funcionalidad implementada aún).
- Guarda preferencia en AsyncStorage.

---

## 🎨 Estilo general

- Tema oscuro consistente en todas las pantallas.
- Uso de `SafeAreaView`, `ScrollView`, `KeyboardAvoidingView`.
- Diseño centrado con tipografía clara y botones accesibles.
- Animaciones suaves para una experiencia nativa optimizada.