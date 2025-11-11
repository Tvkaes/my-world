import { useEffect, useRef } from 'react';

// Componente para mostrar FPS y estadísticas de rendimiento
export function Stats() {
  const fpsRef = useRef<HTMLDivElement>(null);
  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let frameId: number;

    const measurePerformance = () => {
      const now = performance.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Mantener últimos 60 frames
      frameTimesRef.current.push(delta);
      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      // Calcular FPS promedio
      const avgDelta = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      const fps = Math.round(1000 / avgDelta);

      if (fpsRef.current) {
        fpsRef.current.textContent = `FPS: ${fps}`;
        
        // Color según rendimiento
        if (fps >= 55) {
          fpsRef.current.style.color = '#0f0';
        } else if (fps >= 30) {
          fpsRef.current.style.color = '#ff0';
        } else {
          fpsRef.current.style.color = '#f00';
        }
      }

      frameId = requestAnimationFrame(measurePerformance);
    };

    frameId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={fpsRef}
      style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        color: '#0f0',
        fontFamily: 'monospace',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '5px 10px',
        borderRadius: '4px',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      FPS: --
    </div>
  );
}
