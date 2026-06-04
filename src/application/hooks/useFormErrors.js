import { useState } from 'react';

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
