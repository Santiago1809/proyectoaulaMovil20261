# AGENTS.md - Guía para Agentes de Codificación

Este archivo contiene instrucciones para agentes automáticos (como GitHub Copilot, Cursor, etc.) que operan en este repository. Define comandos de build, testing, y pautas de estilo.

## Build & Development Commands

Estos scripts están definidos en `package.json`:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}
```

- `npm start` o `expo start`: Inicia el servidor de desarrollo Expo.
- `npm run android`: Inicia Expo y abre en emulador Android.
- `npm run ios`: Inicia Expo y abre en simulador iOS.
- `npm run web`: Inicia la app en navegador web.

## Lint & Test Commands

El projecto **no tiene configurados** linters o tests aún. Se recomienda agregar:

- **ESLint** para análisis de código: `npm install --save-dev eslint`
- **Prettier** para formateo: `npm install --save-dev prettier`
- **Jest** para pruebas unitarias: `npm install --save-dev jest`

Una vez configurados, agregar scripts como:
```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx",
    "format": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch"
  }
```

Para ejecutar un test individual: `npm test -- -t "Nombre del test"`.

## Code Style Guidelines

### Imports
- Orden: 1) React, 2) Dependencias externas (npm), 3) Dependencias internas (archivos locales).
- Agrupar imports del mismo tipo con líneas en blanco.
- Usar imports con llaves cuando se importan múltiples ítems.
- Ejemplo:
  ```javascript
  import React, { useState, useEffect } from "react";
  import { View, Text, StyleSheet } from "react-native";

  import useAuth from "../hooks/useAuth";
  import { colors } from "../components/colors";
  ```

### Formatting
- Indentación: 2 espacios.
- Punto y coma opcional, pero se recomienda usarlo para consistencia.
- Comillas dobles para strings.
- Máximo 100-120 caracteres por línea.
- Espacios around operators: `x = y + z`.

### Types
- El projecto usa JavaScript (no TypeScript).
- Se agrega `prop-types` para validación de props si es necesario.
- Se pueden agregar JSDoc comments para documentar APIs.
- Archivo `env.d.ts` provee tipos para variables de entorno.

### Naming Conventions
- **Componentes**: PascalCase (ej. `PrimaryButton`, `HomeScreen`).
- **Hooks**: camelCase con prefijo `use` (ej. `useAuth`, `useBooks`).
- **Funciones/variables**: camelCase (ej. `handleSubmit`, `isLoading`).
- **Archivos de componentes**: PascalCase para componentes; kebab-case para utilidades.
- **Constantes**: UPPER_SNAKE_CASE (ej. `API_URL`) o camelCase según contexto.

### Error Handling
- Validar entradas de usuario antes de enviar.
- Usar `try/catch` para llamadas asíncronas.
- Mostrar errores al usuario con `Alert.alert()`.
- Loggear errores en desarrollo con `console.error`.
- No exponer detalles de errores de servidor en producción (usar mensajes genéricos).

### Components
- Preferir componentes funcionales.
- Usar hooks (`useState`, `useEffect`, `useCallback`) para estado y efectos.
- Mantener componentes puros: sin side effects directos en render.
- Extraer lógica compleja a hooks personalizados.
- Prop drilling evitado usando Context o state management.

### Hooks
- Ubicar en carpeta `hooks/`.
- Nombre empieza con `use` (ej. `useAuthActions`).
- Responsabilidad única: cada hook maneja una domain (auth, books, loans).
- Devolver objetos o arrays con datos y funciones.
- Manejar loading y error states dentro del hook.

### State Management
- Estado local: `useState` para UI states.
- Estado compartido: `Context API` para auth, etc.
- Evitar almacenar datos derivados en state; calcular en render.

### Colors
- Todos los colores se definen en `components/colors.js`.
- Usar nombres semánticos (`primary`, `text`, `background`, `error`, etc.) en lugar de colores hex en componentes.

### Assets
- Imágenes estáticas en `assets/`.
- Acceder con `require("../assets/imagen.png")`.
- No mezclar assets con código.

### File Structure
```
project/
├── app.json            # Config Expo
├── babel.config.js     # Config Babel
├── firebase.js         # Inicialización Firebase
├── screens/            # Pantallas (solo UI, sin lógica)
├── components/         # Componentes reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Home/           # Componentes de la pantalla principal
│   ├── Book/           # Componentes de libro
│   ├── colors.js
│   └── index.js        # Barrel exports
├── hooks/              # Custom hooks (lógica de negocio)
├── contexts/           # Context providers
├── navigation/         # Configuración de navegación
├── assets/             # Imágenes, fuentes, etc.
└── utils/              # Funciones utilitarias (si aplica)
```

### Console Logs
- Evitar `console.log` en código que se va a commitear.
- Usar `console.warn` o `console.error` solo para debugging en develop.
- Remover logs antes de merge a main.

### Security
- No hardcode API keys o secrets. Usar variables de entorno (`.env`) con `react-native-dotenv`.
- Validar y sanitizar entradas de usuario.
- No almacenar datos sensibles en AsyncStorage sin cifrado.

### Additional Notes
- No existen reglas de Cursor (`.cursorrules`) ni instrucciones de Copilot (`.github/copilot-instructions.md`).
- Seguir las convenciones existentes en el codebase.

---

Para cualquier duda, consultar README.md y comentarios en el código.
