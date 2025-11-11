import { createNoise2D } from 'simplex-noise';
import { TERRAIN_CONFIG } from '../constants/config';

// Crear generador de noise
const noise2D = createNoise2D();

/**
 * Genera la altura del terreno en una posición (x, z) usando Simplex Noise
 * Implementa múltiples octavas para crear terreno natural con detalles
 */
export function getTerrainHeight(x: number, z: number): number {
  if (!TERRAIN_CONFIG.ENABLE_TERRAIN) {
    return 0;
  }

  let height = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0; // Para normalizar

  // Aplicar múltiples octavas de noise
  for (let i = 0; i < TERRAIN_CONFIG.OCTAVES; i++) {
    const sampleX = x * TERRAIN_CONFIG.NOISE_SCALE * frequency;
    const sampleZ = z * TERRAIN_CONFIG.NOISE_SCALE * frequency;
    
    const noiseValue = noise2D(sampleX, sampleZ);
    height += noiseValue * amplitude;
    
    maxValue += amplitude;
    amplitude *= TERRAIN_CONFIG.PERSISTENCE;
    frequency *= TERRAIN_CONFIG.LACUNARITY;
  }

  // Normalizar y escalar
  height = height / maxValue;
  height = height * TERRAIN_CONFIG.HEIGHT_SCALE;

  return height;
}

/**
 * Calcula la normal del terreno en una posición para que los blades
 * se orienten perpendiculares a la superficie
 */
export function getTerrainNormal(x: number, z: number, delta: number = 0.1): [number, number, number] {
  if (!TERRAIN_CONFIG.ENABLE_TERRAIN) {
    return [0, 1, 0]; // Normal apuntando hacia arriba
  }

  const heightL = getTerrainHeight(x - delta, z);
  const heightR = getTerrainHeight(x + delta, z);
  const heightD = getTerrainHeight(x, z - delta);
  const heightU = getTerrainHeight(x, z + delta);

  // Calcular vectores tangentes
  const dx = heightR - heightL;
  const dz = heightU - heightD;

  // Normal es perpendicular a los tangentes
  const nx = -dx;
  const ny = 2 * delta;
  const nz = -dz;

  // Normalizar
  const length = Math.sqrt(nx * nx + ny * ny + nz * nz);
  
  return [nx / length, ny / length, nz / length];
}
