import { useState } from 'react';

export const useFormState = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (newState = initialState) => {
    setForm(newState);
  };

  return { form, setForm, handleChange, resetForm };
};
