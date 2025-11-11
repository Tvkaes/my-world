import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Stats } from './components/Stats';
import { CAMERA_CONFIG, RENDERING_CONFIG, GRASS_CONFIG } from './constants/config';
import './App.css';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <Stats />
      
      {/* Indicador de calidad y blade count */}
      <div
        style={{
          position: 'fixed',
          top: '40px',
          left: '10px',
          color: '#fff',
          fontFamily: 'monospace',
          fontSize: '12px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '5px 10px',
          borderRadius: '4px',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      >
        <div>Calidad: {GRASS_CONFIG.QUALITY_LEVEL.toUpperCase()}</div>
        <div>Blades: {GRASS_CONFIG.BLADE_COUNT.toLocaleString()}</div>
        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>
          {GRASS_CONFIG.QUALITY_DESCRIPTION}
        </div>
      </div>

      <Canvas
        camera={{
          position: [CAMERA_CONFIG.POSITION.x, CAMERA_CONFIG.POSITION.y, CAMERA_CONFIG.POSITION.z],
          fov: CAMERA_CONFIG.FOV,
          near: CAMERA_CONFIG.NEAR,
          far: CAMERA_CONFIG.FAR,
        }}
        gl={{
          antialias: RENDERING_CONFIG.antialias,
          alpha: RENDERING_CONFIG.alpha,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // Limitar device pixel ratio para mejor rendimiento
        style={{ background: RENDERING_CONFIG.backgroundColor }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
