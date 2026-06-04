export const validateSchema = (schema, values) => {
  const errors = {};
  for (const field in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, field)) {
      const errorMessage = schema[field](values[field], values);
      if (errorMessage) {
        errors[field] = errorMessage;
      }
    }
  }
  return errors;
};
