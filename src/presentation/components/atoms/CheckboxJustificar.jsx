import { Checkbox, FormControlLabel } from '@mui/material';

export const CheckboxJustificar = ({ checked, onChange, disabled }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          color="warning"
          disabled={disabled}
        />
      }
      label="Justificado"
    />
  );
};
