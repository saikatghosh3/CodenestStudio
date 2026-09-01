'use client';

import { cn } from '@/lib/utils';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeProvider';

const Earth = ({
  className,
  theta = 0.25,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 22000,
  mapBrightness = 6,
}) => {
  const canvasRef = useRef(null);
  const { theme, mounted } = useTheme();

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    const isDark = theme === 'dark';

    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 1.5,
      width: width * 1.5,
      height: width * 1.5,
      phi: 0,
      theta: theta,
      dark: isDark ? 1 : 0,
      scale: scale,
      diffuse: diffuse,
      mapSamples: mapSamples,
      mapBrightness: isDark ? mapBrightness : 8,
      baseColor: isDark ? [0.3, 0.3, 0.3] : [0.5, 0.65, 1],
      markerColor: isDark ? [1, 0, 0] : [0.1, 0.5, 0.9],
      glowColor: isDark ? [0.2745, 0.5765, 0.898] : [0.4, 0.6, 0.95],
      opacity: 1,
      offset: [0, 0],
      markers: [],
    });
    let animationFrameId;
    const animate = () => {
      phi += 0.003;
      globe.update({ phi });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, [mounted, theme, theta, scale, diffuse, mapSamples, mapBrightness]);

  return (
    <div
      className={cn(
        'flex items-center justify-center z-10 w-full max-w-[500px] lg:max-w-[650px] mx-auto',
        className
      )}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          aspectRatio: '1',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
    </div>
  );
};

export default Earth;
