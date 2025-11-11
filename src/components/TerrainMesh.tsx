import { useMemo } from 'react';
import * as THREE from 'three';
import { GRASS_CONFIG, TERRAIN_CONFIG } from '../constants/config';
import { getTerrainHeight } from '../utils/terrainNoise';

/**
 * Componente opcional que renderiza una malla del terreno debajo del césped
 * Ayuda a visualizar mejor las elevaciones
 */
export function TerrainMesh() {
  const geometry = useMemo(() => {
    const size = GRASS_CONFIG.PLANE_SIZE;
    const segments = 128; // Resolución de la malla

    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    
    // Rotar para que sea horizontal
    geo.rotateX(-Math.PI / 2);

    // Aplicar elevaciones del terreno
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const y = getTerrainHeight(x, z);
      positions.setY(i, y);
    }

    // Recalcular normales para iluminación correcta
    geo.computeVertexNormals();

    return geo;
  }, []);

  if (!TERRAIN_CONFIG.ENABLE_TERRAIN) {
    return null;
  }

  return (
    <mesh geometry={geometry} position={[0, -0.15, 0]}>
      <meshStandardMaterial 
        color="#7CB342" // Verde pasto claro y vibrante
        roughness={0.95}
        metalness={0.0}
      />
    </mesh>
  );
}
