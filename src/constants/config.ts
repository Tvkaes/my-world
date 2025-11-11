// Configuración exacta copiada del repositorio original
// https://github.com/James-Smyth/three-grass-demo

// Niveles de calidad para diferentes niveles de hardware
export type QualityLevel = 'low' | 'medium' | 'high' | 'ultra';

const QUALITY_SETTINGS: Record<QualityLevel, { bladeCount: number; description: string }> = {
  low: { bladeCount: 50000, description: 'Hardware bajo' },
  medium: { bladeCount: 100000, description: 'Hardware medio' },
  high: { bladeCount: 150000, description: 'Hardware alto' },
  ultra: { bladeCount: 200000, description: 'Original - Hardware muy alto' },
};

// Configuración actual - cambiar según tu hardware
const CURRENT_QUALITY: QualityLevel = 'medium'; // Ahora con 100,000 blades

export const GRASS_CONFIG = {
  // Parámetros principales del césped
  PLANE_SIZE: 300, // 10x más grande que el original (30)
  BLADE_COUNT: QUALITY_SETTINGS[CURRENT_QUALITY].bladeCount,
  BLADE_COUNT_ORIGINAL: 100000, // Valor original para referencia
  BLADE_WIDTH: 0.2, // Más ancho para mayor cobertura
  BLADE_HEIGHT: 2.5, // MÁS ALTO - antes era 0.8
  BLADE_HEIGHT_VARIATION: 1.5, // Mayor variación en altura
  
  // Parámetros de la geometría del blade
  VERTEX_COUNT: 5,
  MID_WIDTH_FACTOR: 0.5,
  TIP_OFFSET: 0.1,
  
  // Info de calidad actual
  QUALITY_LEVEL: CURRENT_QUALITY,
  QUALITY_DESCRIPTION: QUALITY_SETTINGS[CURRENT_QUALITY].description,
} as const;

export const TERRAIN_CONFIG = {
  // Configuración del terreno - Una loma suave tipo Zelda BotW
  ENABLE_TERRAIN: true,
  HEIGHT_SCALE: 8, // Altura moderada y suave
  NOISE_SCALE: 0.005, // MUY bajo = una sola loma grande y amplia
  OCTAVES: 2, // Solo 2 capas = muy suave, sin mucho detalle
  PERSISTENCE: 0.3, // Baja = transiciones más suaves
  LACUNARITY: 2.0, // Frecuencia de cada octava
} as const;

export const CAMERA_CONFIG = {
  // Configuración de la cámara (ajustada para campo más grande)
  FOV: 50,
  NEAR: 0.1,
  FAR: 2000, // Más lejos para ver campo grande
  POSITION: { x: -60, y: 30, z: 60 }, // Un poco más cerca para ver mejor el césped
  FOCAL_LENGTH: 15,
} as const;

export const CONTROLS_CONFIG = {
  // Configuración de OrbitControls (zoom habilitado para campo grande)
  enablePan: false,
  enableZoom: true, // Habilitado para explorar campo grande
  minPolarAngle: 0.5, // Más libertad de ángulo
  maxPolarAngle: 1.57, // Permite ver más plano
  enableDamping: true,
  dampingFactor: 0.1,
  target: { x: 0, y: 0, z: 0 },
  minDistance: 20, // Distancia mínima de zoom
  maxDistance: 500, // Distancia máxima de zoom
} as const;

export const RENDERING_CONFIG = {
  // Configuración del renderer
  antialias: true,
  alpha: true,
  backgroundColor: '#4ab8ff',
} as const;

export const VERTEX_COLORS = {
  // Colores de vértices para el césped
  BLACK: [0, 0, 0] as [number, number, number],
  GRAY: [0.5, 0.5, 0.5] as [number, number, number],
  WHITE: [1.0, 1.0, 1.0] as [number, number, number],
} as const;
