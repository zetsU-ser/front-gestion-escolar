import { useState, useCallback } from 'react';

// CUSTOM HOOK
// maneja la lógica de collapsible
export const useCollapsible = (initialState = true) => {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return { isOpen, toggle };
};
