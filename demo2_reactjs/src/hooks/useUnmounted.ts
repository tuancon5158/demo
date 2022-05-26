import { useRef, useEffect } from 'react';

export const useUnmounted = () => {
  const isUnmounted = useRef<boolean>();

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  });

  return isUnmounted;
};
