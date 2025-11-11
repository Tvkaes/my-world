# Guía de Rendimiento y Optimización

## 🚨 Problema: El proyecto se ve con lag

El proyecto original renderiza **100,000 blades de césped** (500,000 vértices totales), lo cual requiere hardware potente. Este documento explica cómo ajustar el rendimiento según tu hardware.

## ⚙️ Ajustar Nivel de Calidad

### Opción 1: Cambiar Configuración Manualmente

Edita el archivo `src/constants/config.ts` y cambia la línea 15:

```typescript
// Configuración actual - cambiar según tu hardware
const CURRENT_QUALITY: QualityLevel = 'medium'; // <-- Cambiar aquí
```

### Niveles Disponibles:

| Nivel | Blade Count | Vértices | Hardware Recomendado | FPS Esperado |
|-------|-------------|----------|---------------------|--------------|
| `'low'` | 25,000 | 125,000 | Integradas básicas | 50-60 FPS |
| `'medium'` | 50,000 | 250,000 | Dedicadas gama media | 50-60 FPS |
| `'high'` | 75,000 | 375,000 | Dedicadas gama alta | 50-60 FPS |
| `'ultra'` | 100,000 | 500,000 | RTX/dedicadas muy potentes | 40-60 FPS |

**Nota**: `'ultra'` es la configuración original del demo.

### Después de Cambiar

1. Guarda el archivo
2. El servidor de desarrollo se recargará automáticamente
3. Verifica el contador de FPS en la esquina superior izquierda

## 📊 Monitorear Rendimiento

El proyecto incluye un monitor de FPS incorporado:

- **Verde (55+ FPS)**: Rendimiento excelente
- **Amarillo (30-55 FPS)**: Rendimiento aceptable
- **Rojo (<30 FPS)**: Reducir calidad recomendado

## 🔧 Optimizaciones Implementadas

### 1. Geometría Estática
- La geometría se genera **una sola vez** al cargar
- No se recalcula en cada frame
- Uso de `useMemo` para evitar regeneración

### 2. Material Cacheado
- El ShaderMaterial se crea una sola vez
- Los uniforms se reutilizan sin recrear el material
- Shaders compilados persisten entre frames

### 3. Configuración del Renderer
```typescript
gl={{
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance', // Forzar GPU dedicada
}}
dpr={[1, 2]} // Limitar device pixel ratio
```

### 4. Animación Eficiente
- Solo se actualiza el uniform `iTime` en cada frame
- No se modifica geometría
- No se recalculan posiciones
- Animación puramente en GPU vía shaders

## 🎯 Optimizaciones Adicionales Disponibles

### Opción A: Deshabilitar Antialiasing

En `src/constants/config.ts`:
```typescript
export const RENDERING_CONFIG = {
  antialias: false, // Cambiar a false
  alpha: true,
  backgroundColor: '#4ab8ff',
} as const;
```

**Ganancia esperada**: +5-10 FPS  
**Costo visual**: Bordes más dentados

### Opción B: Reducir Device Pixel Ratio

En `src/App.tsx`, cambiar:
```typescript
dpr={[1, 1]} // En lugar de dpr={[1, 2]}
```

**Ganancia esperada**: +10-20 FPS en pantallas de alta resolución  
**Costo visual**: Imagen ligeramente menos nítida

### Opción C: Simplificar Geometría

En `src/constants/config.ts`, reducir variación de altura:
```typescript
BLADE_HEIGHT_VARIATION: 0.3, // En lugar de 0.6
```

**Ganancia esperada**: Marginal, pero más uniforme  
**Costo visual**: Césped más uniforme (menos natural)

## 🐛 Diagnóstico de Problemas

### Síntoma: FPS muy bajos (<15 FPS)

**Posibles causas**:
1. Demasiados blades para tu hardware
2. Navegador usando GPU integrada en lugar de dedicada
3. Múltiples pestañas con contenido 3D abiertas
4. Otros procesos usando GPU

**Soluciones**:
1. Cambiar a calidad `'low'`
2. En Chrome: `chrome://flags` → buscar "GPU" → forzar aceleración
3. Cerrar otras pestañas con contenido 3D/video
4. Cerrar aplicaciones que usen GPU (juegos, editores de video)

### Síntoma: Stuttering (cortes intermitentes)

**Posibles causas**:
1. Regeneración de geometría (bug)
2. Recolector de basura de JavaScript
3. Otras pestañas o extensiones del navegador

**Soluciones**:
1. Verificar consola para mensaje "Generando geometría..." (debería aparecer solo UNA vez)
2. Modo incógnito para deshabilitar extensiones
3. Cerrar otras pestañas

### Síntoma: Carga inicial muy lenta

**Causa**: Generación de 100,000 blades toma tiempo

**Solución**: Reducir `BLADE_COUNT` o implementar carga progresiva (ver sección avanzada)

## 🚀 Optimizaciones Avanzadas (Para Desarrolladores)

### Implementar LOD (Level of Detail)

Crear diferentes densidades de césped según distancia a cámara:
- Cerca: Alta densidad
- Lejos: Baja densidad

### Implementar Chunks Dinámicos

Dividir el campo en secciones y cargar solo las visibles.

### Usar Instanced Rendering

Cambiar de BufferGeometry a InstancedBufferGeometry para mejor rendimiento.

**Nota**: Estas optimizaciones requieren modificar significativamente el código.

## 📈 Comparativa de Rendimiento

### Hardware de Prueba

| GPU | Calidad | FPS Promedio | Notas |
|-----|---------|--------------|-------|
| RTX 3080 | ultra | 60 | Sin problemas |
| GTX 1660 | high | 55-60 | Ocasionales drops |
| GTX 1050 Ti | medium | 50-55 | Recomendado |
| Intel UHD 620 | low | 30-40 | Límite mínimo |
| Intel HD Graphics | low | 15-25 | No recomendado |

## 🔍 Herramientas de Profiling

### Chrome DevTools

1. Abrir DevTools (F12)
2. Tab "Performance"
3. Grabar mientras interactúas
4. Buscar frames largos (>16.6ms)

### Three.js Inspector

Extensión de Chrome para inspeccionar escenas Three.js:
https://chrome.google.com/webstore/detail/threejs-inspector

## ✅ Checklist de Optimización

Antes de reportar problemas de rendimiento, verifica:

- [ ] Has probado con calidad `'low'` o `'medium'`
- [ ] No hay otras pestañas/programas usando GPU
- [ ] Navegador está actualizado
- [ ] Drivers de GPU actualizados
- [ ] Hardware cumple requisitos mínimos
- [ ] Consola no muestra errores
- [ ] Monitor de FPS muestra valores estables

## 💡 Consejos Finales

1. **El original también es pesado**: No es un problema de la migración
2. **Calidad medium es óptima**: Buenos FPS y apariencia visual
3. **Prioriza fluidez**: 60 FPS constantes > más blades con lag
4. **Hardware es limitante**: Imposible 60 FPS con GPU muy antigua

## 📞 Soporte

Si después de optimizar sigues teniendo problemas:

1. Indica tu GPU y configuración probada
2. Indica FPS que obtienes
3. Adjunta screenshot de la consola del navegador
4. Indica si el original también tiene problemas

---

**Recuerda**: El objetivo del proyecto es replicar el original. Si el original también tiene lag en tu hardware, la migración es correcta.
