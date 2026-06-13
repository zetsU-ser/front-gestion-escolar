import { RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';

export const SelectorEstado = ({ value, onChange, disabled }) => {
  return (
    <Box sx={{ minWidth: 150 }}>
      <RadioGroup
        row
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel
          value="PRESENTE"
          control={<Radio color="success" disabled={disabled} />}
          label="Presente"
        />
        <FormControlLabel
          value="AUSENTE"
          control={<Radio color="error" disabled={disabled} />}
          label="Ausente"
        />
      </RadioGroup>
    </Box>
  );
};
