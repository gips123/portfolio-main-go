"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  delay: number;
  isInView: boolean;
}

export default function AnimatedCounter({ value, delay, isInView }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 1000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [value, delay, isInView]);

  return <span>{displayValue}</span>;
}

