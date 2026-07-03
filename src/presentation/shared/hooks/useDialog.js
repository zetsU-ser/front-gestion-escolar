import { useState } from 'react';

// CUSTOM HOOK
// maneja la lógica de dialog
export const useDialog = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [itemData, setItemData] = useState(null);

  const openDialog = (data = null) => {
    setItemData(data);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setItemData(null);
  };

  return {
    isOpen,
    itemData,
    openDialog,
    closeDialog
  };
};
