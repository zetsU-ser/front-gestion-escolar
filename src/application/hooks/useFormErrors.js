import { useState } from 'react';

// CUSTOM HOOK
// maneja la lógica de formerrors
export const useFormErrors = () => {
  const [errors, setErrors] = useState({});

  const clearError = (name) => {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const clearAllErrors = () => {
    setErrors({});
  };

  return { errors, setErrors, clearError, clearAllErrors };
};
