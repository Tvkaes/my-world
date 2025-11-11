import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { generateGrassGeometry } from '../utils/grassGeometry';
import grassVertexShader from '../shaders/grass.vert.glsl';
import grassFragmentShader from '../shaders/grass.frag.glsl';

export function GrassField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const startTimeRef = useRef(Date.now());
  
  // Cargar texturas exactamente como en el original
  const grassTexture = useLoader(THREE.TextureLoader, '/grass.jpg');
  const cloudTexture = useLoader(THREE.TextureLoader, '/cloud.jpg');
  
  // Configurar la textura de nubes exactamente como en el original
  useEffect(() => {
    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
  }, [cloudTexture]);

  // Generar geometría una sola vez (equivalente a generateField() del original)
  const geometry = useMemo(() => {
    console.log('Generando geometría del césped...');
    return generateGrassGeometry();
  }, []);

  // Crear uniforms y material una sola vez
  const { material, uniforms } = useMemo(() => {
    console.log('Creando material del césped...');
    
    const uniformsObj = {
      textures: { 
        value: [grassTexture, cloudTexture] 
      },
      iTime: { 
        type: 'f' as const, 
        value: 0.0 
      }
    };

    const mat = new THREE.ShaderMaterial({
      uniforms: uniformsObj,
      vertexShader: grassVertexShader,
      fragmentShader: grassFragmentShader,
      vertexColors: true,
      side: THREE.DoubleSide,
    });

    return { material: mat, uniforms: uniformsObj };
  }, [grassTexture, cloudTexture]);

  // Animación: actualizar iTime exactamente como en el original
  // En el original: grassUniforms.iTime.value = elapsedTime;
  useFrame(() => {
    const elapsedTime = Date.now() - startTimeRef.current;
    uniforms.iTime.value = elapsedTime;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
