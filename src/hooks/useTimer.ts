import { useState, useEffect } from 'react';

export function useTimer(startTime: number | null, duration: number) {
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60); // Convert minutes to seconds
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, duration * 60 - elapsed);
      
      setTimeLeft(remaining);
      setIsWarning(remaining <= 120); // Warning at 2 minutes

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    minutes,
    seconds,
    isWarning,
    timeLeft,
    formattedTime: `${minutes}:${seconds.toString().padStart(2, '0')}`,
  };
}
