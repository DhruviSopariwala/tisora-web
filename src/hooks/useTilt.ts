"use client";

import { useRef, useCallback } from "react";

interface TiltOptions {
  max?: number;       // max tilt degrees
  scale?: number;     // scale on hover
  speed?: number;     // transition speed ms
  glare?: boolean;    // show glare effect
}

export function useTilt(options: TiltOptions = {}) {
  const { max = 12, scale = 1.03, speed = 400 } = options;
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;
      el.style.transition = `transform ${speed * 0.1}ms ease-out`;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    },
    [max, scale, speed]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = `transform ${speed}ms ease-out`;
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }, [speed]);

  return { ref, onMouseMove, onMouseLeave };
}
