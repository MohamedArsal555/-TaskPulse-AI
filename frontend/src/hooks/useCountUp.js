import { useEffect, useRef, useState } from 'react';

// Animates a displayed number from 0 up to `value` on mount / whenever it changes.
export function useCountUp(value, duration = 900) {
  const [display, setDisplay] = useState(0);
  const frame = useRef();

  useEffect(() => {
    const to = Number(value) || 0;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(to * eased);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [value, duration]);

  return display;
}
