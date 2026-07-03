import { useState } from 'react';

// CUSTOM HOOK
// maneja la lógica de formstate
export const useFormState = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Auto-formateo del RUT: eliminar puntos para evitar 400 Bad Request en backend
    if (name === 'rut') {
      value = value.replace(/\./g, '');
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (newState = initialState) => {
    setForm(newState);
  };

  return { form, setForm, handleChange, resetForm };
};
