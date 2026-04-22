# GPS Camera 📸

Una aplicación Expo/React Native para capturar fotos con información de geolocalización en tiempo real.

## 🚀 Inicio rápido

1. Instalar dependencias

   ```bash
   npm install
   ```

2. Iniciar la aplicación

   ```bash
   npx expo start
   ```

   En la salida encontrarás opciones para abrir la app en:
   - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go)

3. Desarrollar

   Este proyecto usa [file-based routing](https://docs.expo.dev/router/introduction). Edita los archivos dentro de la carpeta **app** para ver los cambios en tiempo real.

## 📁 Estructura del Proyecto

```
app-gps-camera/
├── app/                      # Rutas y pantallas principales (Expo Router)
│   ├── _layout.tsx          # Layout raíz con providers globales
│   └── (tabs)/              # Grupo de pantallas con navegación por tabs
│       ├── _layout.tsx      # Layout de tabs
│       ├── index.tsx        # Pantalla de cámara (Camera Screen)
│       ├── plans.tsx        # Pantalla de planes
│       └── settings.tsx     # Pantalla de configuración
│
├── components/              # Componentes reutilizables
│   ├── MiniMap.tsx         # Mapa embebido que muestra ubicación en tiempo real
│   ├── ui/                 # Componentes de UI específicos
│   └── ...                 # Otros componentes
│
├── context/                 # Context API - estado global
│   └── location-context.tsx # Contexto de geolocalización
│
├── hooks/                   # Custom hooks reutilizables
│   ├── use-color-scheme.ts
│   ├── use-theme-color.ts
│   └── ubication/
│       └── use-location.ts  # Hook para obtener ubicación actual
│
├── helper/                  # Utilidades y funciones helpers
│   └── date-formattet.helper.ts # Formateo de fechas en español
│
├── constants/               # Constantes globales
│   └── theme.ts            # Colores y temas
│
├── assets/                  # Recursos estáticos
│   └── images/             # Imágenes, iconos, splash screens
│
├── app.json                # Configuración de Expo
├── package.json            # Dependencias del proyecto
├── tsconfig.json           # Configuración de TypeScript
├── tailwind.config.js      # Configuración de Tailwind CSS (NativeWind)
├── babel.config.js         # Configuración de Babel
└── metro.config.js         # Configuración de Metro bundler
```

### 📂 Explicación por carpeta

| Carpeta         | Propósito           | Qué añadir aquí                                                   |
| --------------- | ------------------- | ----------------------------------------------------------------- |
| **app/**        | Rutas y navegación  | Pantallas nuevas, layouts, tab screens                            |
| **components/** | UI reutilizable     | Componentes que se usan en múltiples pantallas                    |
| **context/**    | Estado global       | Contextos React para datos compartidos (auth, user, etc)          |
| **hooks/**      | Lógica reutilizable | Custom hooks para encapsular lógica (data fetching, eventos, etc) |
| **helper/**     | Utilidades          | Funciones puras, formatters, validadores                          |
| **constants/**  | Valores estáticos   | Colores, strings constantes, configuraciones                      |
| **assets/**     | Recursos            | Imágenes, fuentes, videos, audio                                  |

## 🛠 Stack Tecnológico

- **Framework**: [Expo](https://expo.dev)
- **React Native**: 0.81.5
- **React**: 19.1.0
- **Navegación**: Expo Router
- **Mapas**: react-native-maps
- **Estilos**: NativeWind (Tailwind CSS para React Native)
- **Cámara**: expo-camera
- **Ubicación**: expo-location
- **Lenguaje**: TypeScript

## 📚 Recursos útiles

- [Expo documentation](https://docs.expo.dev/): Fundamentos y temas avanzados
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Tutorial paso a paso
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [NativeWind Documentation](https://www.nativewind.dev/)

## 👥 Comunidad

- [Expo on GitHub](https://github.com/expo/expo): Plataforma open source
- [Discord community](https://chat.expo.dev): Chat con la comunidad

## 📝 Comandos disponibles

```bash
npm run dev           # Inicia el servidor de desarrollo
npm run android       # Abre en Android emulator
npm run ios           # Abre en iOS simulator
npm run web           # Abre en navegador
npm run lint          # Ejecuta eslint
npm run reset-project # Reinicia el proyecto
```
