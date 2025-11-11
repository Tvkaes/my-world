# Three.js Grass Demo - React + TypeScript

Una migración exacta del [three-grass-demo](https://github.com/James-Smyth/three-grass-demo) original a React + TypeScript, manteniendo la misma funcionalidad, apariencia visual y rendimiento.

## 📝 Descripción

Este proyecto es una réplica perfecta del demo original de césped estilizado con animación de viento, adaptado para funcionar con React, TypeScript y React Three Fiber. El proyecto mantiene exactamente:

- Los mismos shaders (vertex y fragment)
- La misma geometría del césped (5 vértices por blade)
- Los mismos parámetros de configuración
- La misma distribución de 100,000 blades de césped
- La misma animación de viento
- El mismo sistema de texturas
- Los mismos controles de cámara

## 🎯 Características

- **Campo de césped infinito**: 100,000 blades de césped distribuidos en un área circular
- **Animación de viento realista**: Implementada mediante shaders GLSL personalizados
- **Geometría custom**: Cada blade tiene 5 vértices con variación aleatoria de altura y rotación
- **Texturas mezcladas**: Combinación de textura de césped y nubes en movimiento
- **Controles de cámara**: OrbitControls con restricciones específicas para mejor visualización

## 🛠️ Stack Tecnológico

- **React 19.2.0**: Librería de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **Three.js 0.159.0**: Motor de renderizado 3D (actualizado desde 0.120.1 del original por compatibilidad)
- **React Three Fiber**: React renderer para Three.js
- **React Three Drei**: Utilidades para R3F
- **vite-plugin-glsl**: Plugin para importar archivos GLSL

**Nota**: La versión de Three.js fue actualizada a 0.159.0 (desde la 0.120.1 original) para compatibilidad con las dependencias modernas de React Three Fiber y Drei. Los shaders y la lógica se mantienen idénticos.

## 📦 Instalación

### Requisitos Previos

- Node.js (versión 16 o superior)
- pnpm (recomendado) o npm

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd grass-field-react
```

2. Instalar dependencias:
```bash
pnpm install
```

## 🚀 Uso

### Modo Desarrollo

```bash
pnpm dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`

### Build de Producción

```bash
pnpm build
```

El build se generará en la carpeta `dist/`

### Preview del Build

```bash
pnpm preview
```

## 📁 Estructura del Proyecto

```
grass-field-react/
├── public/
│   ├── grass.jpg          # Textura de césped
│   └── cloud.jpg          # Textura de nubes
├── src/
│   ├── components/
│   │   ├── GrassField.tsx # Componente principal del césped
│   │   └── Scene.tsx      # Escena 3D con cámara y controles
│   ├── constants/
│   │   └── config.ts      # Configuraciones copiadas del original
│   ├── shaders/
│   │   ├── grass.vert.glsl # Vertex shader (copia exacta)
│   │   └── grass.frag.glsl # Fragment shader (copia exacta)
│   ├── utils/
│   │   └── grassGeometry.ts # Generador de geometría del césped
│   ├── App.tsx            # Componente raíz
│   ├── App.css            # Estilos básicos
│   ├── main.tsx           # Punto de entrada
│   └── vite-env.d.ts      # Declaraciones de tipos
├── index.html             # HTML principal
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias del proyecto
```

## 🎨 Parámetros de Configuración

### Ajustar Rendimiento (IMPORTANTE)

El proyecto renderiza **100,000 blades de césped** por defecto (configuración original), lo cual requiere hardware potente.

**Si experimentas lag o FPS bajos**, ajusta la calidad en `src/constants/config.ts` línea 15:

```typescript
const CURRENT_QUALITY: QualityLevel = 'medium'; // Cambiar según tu hardware
```

**Opciones disponibles**:
- `'low'` - 25,000 blades (hardware bajo)
- `'medium'` - 50,000 blades (hardware medio) ⭐ **RECOMENDADO**
- `'high'` - 75,000 blades (hardware alto)
- `'ultra'` - 100,000 blades (original, requiere GPU potente)

📖 **Ver [PERFORMANCE.md](./PERFORMANCE.md) para guía completa de optimización**

### Otros Parámetros

Los parámetros del césped están en `src/constants/config.ts`:

```typescript
GRASS_CONFIG = {
  PLANE_SIZE: 30,              // Tamaño del área del campo
  BLADE_WIDTH: 0.1,            // Ancho de cada blade
  BLADE_HEIGHT: 0.8,           // Altura base
  BLADE_HEIGHT_VARIATION: 0.6, // Variación de altura
}
```

**⚠️ Advertencia**: Modificar estos valores puede afectar significativamente el rendimiento.

## 🎮 Controles

- **Rotar cámara**: Click izquierdo + arrastrar
- **Zoom**: Deshabilitado (para mantener consistencia visual)
- **Pan**: Deshabilitado (para mantener enfoque en el césped)

## 🔍 Detalles Técnicos

### Geometría del Césped

Cada blade de césped está compuesto por:
- **5 vértices**: Base izquierda, base derecha, media izquierda, media derecha, punta
- **3 triángulos**: Formando la geometría del blade
- **Vertex colors**: Usados para controlar la intensidad de la animación (negro en la base, gris en el medio, blanco en la punta)

### Sistema de Animación

La animación del viento se implementa en el vertex shader usando:
- Función seno para crear movimiento ondulatorio
- Variación basada en coordenadas UV para efecto no uniforme
- Control diferenciado por vertex color (la punta se mueve más que la base)

### Distribución de Blades

Los blades se distribuyen usando:
- Distribución circular uniforme
- Coordenadas polares (r, θ) convertidas a cartesianas
- Variación aleatoria en rotación y altura de cada blade

## 📊 Rendimiento

El proyecto está optimizado para mantener 60 FPS en hardware medio mediante:
- Geometría estática (generada una sola vez al inicio)
- Shaders eficientes con cálculos mínimos
- Uso de BufferGeometry para mejor rendimiento
- Animación solo mediante uniforms (sin recalcular geometría)

**Rendimiento esperado**:
- Hardware alto: 60+ FPS
- Hardware medio: 50-60 FPS
- Hardware bajo: 30-50 FPS

## 🙏 Créditos

### Proyecto Original
- **Autor**: James Smyth
- **Repositorio**: [three-grass-demo](https://github.com/James-Smyth/three-grass-demo)
- **Licencia**: SEE LICENSE IN FILE

### Migración a React
Este proyecto es una migración del código original a React + TypeScript, manteniendo la fidelidad exacta al comportamiento y apariencia visual.

### Librerías y Herramientas
- [Three.js](https://threejs.org/) - Librería de gráficos 3D
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) - React renderer para Three.js
- [React Three Drei](https://github.com/pmndrs/drei) - Utilidades para R3F
- [Vite](https://vitejs.dev/) - Build tool
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación

## 📝 Notas de Implementación

Este proyecto sigue fielmente el código original con las siguientes adaptaciones:

1. **Migración a React Components**: La lógica se organizó en componentes React manteniendo la misma estructura funcional
2. **TypeScript**: Se agregaron tipos estrictos sin cambiar la lógica
3. **React Three Fiber**: Se usó R3F como abstracción sobre Three.js, pero manteniendo los mismos parámetros
4. **Shaders sin modificación**: Los shaders GLSL son copias exactas del original
5. **Geometría idéntica**: La generación de geometría usa exactamente los mismos cálculos
6. **Configuración explícita**: Todos los valores están explícitamente definidos, no se usan defaults

## 🐛 Solución de Problemas

### El proyecto se ve con lag / FPS bajos

**Esto es normal**. El proyecto original renderiza 100,000 blades de césped (500,000 vértices).

**Solución rápida**:
1. Abre `src/constants/config.ts`
2. Cambia línea 15: `const CURRENT_QUALITY: QualityLevel = 'medium';`
3. Prueba con `'low'` si persiste el problema

📖 **Lee [PERFORMANCE.md](./PERFORMANCE.md)** para soluciones detalladas.

### El proyecto no compila
- Verifica que todas las dependencias estén instaladas: `pnpm install`
- Verifica la versión de Node.js: `node --version` (debe ser 16+)

### Las texturas no cargan
- Verifica que los archivos `grass.jpg` y `cloud.jpg` estén en `public/`
- Verifica la consola del navegador para errores 404

### El césped no se anima
- Verifica la consola del navegador para errores de shaders
- Asegúrate de que WebGL está habilitado en tu navegador

## 📄 Licencia

Este proyecto mantiene la misma licencia que el original. Ver archivo LICENSE.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Mantén la fidelidad al proyecto original
2. No modifiques shaders o geometría sin justificación técnica
3. Documenta cualquier cambio de configuración
4. Asegúrate de que el rendimiento se mantiene

---

**Nota**: Este es un proyecto educativo que demuestra cómo migrar código Three.js vanilla a React + TypeScript manteniendo exactitud absoluta en funcionalidad y apariencia visual.
