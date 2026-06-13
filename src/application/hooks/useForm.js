import { useFormState } from './useFormState';
import { useFormErrors } from './useFormErrors';

export const useForm = (initialState, validateFn) => {
  const { form, setForm, handleChange: handleStateChange, resetForm } = useFormState(initialState);
  const { errors, setErrors, clearError, clearAllErrors } = useFormErrors();

  const handleFieldChange = (e) => {
    handleStateChange(e);
    // Limpiamos el error del campo específico cuando el usuario escribe
    clearError(e.target.name);
  };

  const reset = (newState = initialState) => {
    resetForm(newState);
    clearAllErrors();
  };

  const handleSubmit = (onSubmit) => (e) => {
    if (e) e.preventDefault();
    
    if (validateFn) {
      const validationErrors = validateFn(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return; // Detener el submit si hay errores
      }
    }
    
    // Si la validación es exitosa (o no hay función de validación), ejecutamos el callback final
    onSubmit(form);
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    handleFieldChange,
    reset,
    handleSubmit
  };
};
