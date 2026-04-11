import { useEffect } from 'react';

export default function useOutsideClick<T extends HTMLElement>(
  elementRef: React.RefObject<T | null>,
  onOutsideClick: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [elementRef, onOutsideClick]);
}
