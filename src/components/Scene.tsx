import { OrbitControls } from '@react-three/drei';
import { CONTROLS_CONFIG } from '../constants/config';
import { GrassField } from './GrassField';
import { TerrainMesh } from './TerrainMesh';

export function Scene() {
  return (
    <>
      {/* Iluminación para mejor visualización del terreno */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={0.8}
        castShadow={false}
      />
      
      {/* OrbitControls con zoom habilitado para explorar el terreno */}
      <OrbitControls
        enablePan={CONTROLS_CONFIG.enablePan}
        enableZoom={CONTROLS_CONFIG.enableZoom}
        minPolarAngle={CONTROLS_CONFIG.minPolarAngle}
        maxPolarAngle={CONTROLS_CONFIG.maxPolarAngle}
        enableDamping={CONTROLS_CONFIG.enableDamping}
        dampingFactor={CONTROLS_CONFIG.dampingFactor}
        target={[CONTROLS_CONFIG.target.x, CONTROLS_CONFIG.target.y, CONTROLS_CONFIG.target.z]}
        minDistance={CONTROLS_CONFIG.minDistance}
        maxDistance={CONTROLS_CONFIG.maxDistance}
      />

      {/* Malla de terreno (opcional, mejora visualización) */}
      <TerrainMesh />

      {/* Campo de césped siguiendo el terreno */}
      <GrassField />
    </>
  );
}
