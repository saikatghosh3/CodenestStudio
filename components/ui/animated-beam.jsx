'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Circle = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative z-10 flex items-center justify-center rounded-full border-2 border-border bg-background shadow-lg transition-colors duration-300',
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Circle.displayName = 'Circle';

function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 15,
  delay = 0,
  gradientStartColor = '#ffaa40',
  gradientStopColor = '#ff00aa',
  dotted = false,
  dotSize = 4,
  dotSpacing = 8,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) {
  const pathRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);

  const getDimensions = useCallback(() => {
    if (!containerRef.current || !fromRef.current || !toRef.current) return null;

    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();

    return {
      container: { width: containerRect.width, height: containerRect.height },
      from: {
        x: fromRect.left - containerRect.left + fromRect.width / 2,
        y: fromRect.top - containerRect.top + fromRect.height / 2,
      },
      to: {
        x: toRect.left - containerRect.left + toRect.width / 2,
        y: toRect.top - containerRect.top + toRect.height / 2,
      },
    };
  }, [containerRef, fromRef, toRef]);

  useEffect(() => {
    const update = () => {
      const d = getDimensions();
      if (d) setDimensions(d);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [getDimensions, containerRef]);

  useEffect(() => {
    if (!dimensions) return;
    let frameId = null;
    let startTime = null;

    const totalMs = (duration + delay) * 1000;
    const delayMs = delay * 1000;

    function tick(ts) {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) % totalMs;

      if (elapsed < delayMs) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const progress = (elapsed - delayMs) / (duration * 1000);
      if (pathRef.current) {
        const len = pathRef.current.getTotalLength();
        const offset = reverse
          ? len * (1 - progress)
          : -len * (1 - progress);
        pathRef.current.style.strokeDashoffset = offset;
      }
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [dimensions, duration, delay, reverse]);

  if (!dimensions) return null;

  const { from, to } = dimensions;
  const fx = from.x + startXOffset;
  const fy = from.y + startYOffset;
  const tx = to.x + endXOffset;
  const ty = to.y + endYOffset;
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2 + curvature;

  const d = `M ${fx},${fy} Q ${mx},${my} ${tx},${ty}`;
  const gradId = `grad-${fx.toFixed(0)}-${tx.toFixed(0)}-${fy.toFixed(0)}`;

  const pathLength = pathRef.current?.getTotalLength?.() || 300;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1={fx} y1={fy} x2={tx} y2={ty}>
          <stop offset="0%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={dotted ? `${dotSize} ${dotSpacing}` : undefined}
        style={{
          strokeDashoffset: -pathLength,
          opacity: 1,
        }}
      />
    </svg>
  );
}

export { AnimatedBeam, Circle };
