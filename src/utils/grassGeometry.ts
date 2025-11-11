import * as THREE from 'three';
import { GRASS_CONFIG, VERTEX_COLORS } from '../constants/config';
import { getTerrainHeight } from './terrainNoise';

// Función copiada exactamente del repositorio original
function convertRange(val: number, oldMin: number, oldMax: number, newMin: number, newMax: number): number {
  return (((val - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}

interface BladeVertex {
  pos: number[];
  uv: number[];
  color: number[];
}

interface Blade {
  verts: BladeVertex[];
  indices: number[];
}

// Función copiada exactamente del repositorio original
function generateBlade(center: THREE.Vector3, vArrOffset: number, uv: number[]): Blade {
  const MID_WIDTH = GRASS_CONFIG.BLADE_WIDTH * GRASS_CONFIG.MID_WIDTH_FACTOR;
  const TIP_OFFSET = GRASS_CONFIG.TIP_OFFSET;
  const height = GRASS_CONFIG.BLADE_HEIGHT + (Math.random() * GRASS_CONFIG.BLADE_HEIGHT_VARIATION);

  const yaw = Math.random() * Math.PI * 2;
  const yawUnitVec = new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw));
  const tipBend = Math.random() * Math.PI * 2;
  const tipBendUnitVec = new THREE.Vector3(Math.sin(tipBend), 0, -Math.cos(tipBend));

  // Find the Bottom Left, Bottom Right, Top Left, Top right, Top Center vertex positions
  const bl = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((GRASS_CONFIG.BLADE_WIDTH / 2) * 1));
  const br = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((GRASS_CONFIG.BLADE_WIDTH / 2) * -1));
  const tl = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * 1));
  const tr = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(yawUnitVec).multiplyScalar((MID_WIDTH / 2) * -1));
  const tc = new THREE.Vector3().addVectors(center, new THREE.Vector3().copy(tipBendUnitVec).multiplyScalar(TIP_OFFSET));

  tl.y += height / 2;
  tr.y += height / 2;
  tc.y += height;

  // Vertex Colors
  const black = VERTEX_COLORS.BLACK;
  const gray = VERTEX_COLORS.GRAY;
  const white = VERTEX_COLORS.WHITE;

  const verts: BladeVertex[] = [
    { pos: bl.toArray(), uv: uv, color: [...black] },
    { pos: br.toArray(), uv: uv, color: [...black] },
    { pos: tr.toArray(), uv: uv, color: [...gray] },
    { pos: tl.toArray(), uv: uv, color: [...gray] },
    { pos: tc.toArray(), uv: uv, color: [...white] }
  ];

  const indices = [
    vArrOffset,
    vArrOffset + 1,
    vArrOffset + 2,
    vArrOffset + 2,
    vArrOffset + 4,
    vArrOffset + 3,
    vArrOffset + 3,
    vArrOffset,
    vArrOffset + 2
  ];

  return { verts, indices };
}

// Función copiada exactamente del repositorio original
export function generateGrassGeometry(): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];

  for (let i = 0; i < GRASS_CONFIG.BLADE_COUNT; i++) {
    const VERTEX_COUNT = GRASS_CONFIG.VERTEX_COUNT;
    const surfaceMin = GRASS_CONFIG.PLANE_SIZE / 2 * -1;
    const surfaceMax = GRASS_CONFIG.PLANE_SIZE / 2;

    // Distribución CUADRADA en lugar de circular
    // Para cubrir todo el terreno uniformemente
    const x = surfaceMin + Math.random() * GRASS_CONFIG.PLANE_SIZE;
    const z = surfaceMin + Math.random() * GRASS_CONFIG.PLANE_SIZE;

    // Obtener altura del terreno en esta posición
    const terrainHeight = getTerrainHeight(x, z);
    
    // Levantar el césped por encima del terreno para que no se hunda
    const grassOffset = 0.2; // Offset para que el césped esté encima
    
    const pos = new THREE.Vector3(x, terrainHeight + grassOffset, z);

    const uv = [
      convertRange(pos.x, surfaceMin, surfaceMax, 0, 1),
      convertRange(pos.z, surfaceMin, surfaceMax, 0, 1)
    ];

    const blade = generateBlade(pos, i * VERTEX_COUNT, uv);
    blade.verts.forEach(vert => {
      positions.push(...vert.pos);
      uvs.push(...vert.uv);
      colors.push(...vert.color);
    });
    blade.indices.forEach(indice => indices.push(indice));
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  geom.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  // geom.computeFaceNormals(); // Deprecated method from original Three.js v0.120.1

  return geom;
}
