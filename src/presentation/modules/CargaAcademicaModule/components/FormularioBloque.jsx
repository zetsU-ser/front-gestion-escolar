import { Stack, MenuItem, CircularProgress } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { FormPaper, ResponsiveTextField, FlexTextField, FormGroupStack, SaveButton } from './FormularioBloque.styles';
import { DIAS_SEMANA, BLOQUES } from '../hooks/useCargaAcademicaViewModel';

// VIEW PATTERN
// renderiza la vista de formulariobloque
export const FormularioBloque = ({
  form, handleChangeForm, handleAsignarBloque, 
  asignaturasOpciones, docentesFiltrados, loadingDocentes, loadingCargas
}) => {
  return (
    <FormPaper elevation={2}>
      <form onSubmit={handleAsignarBloque}>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ flexWrap: 'wrap' }}>
          <ResponsiveTextField
            select label="Asignatura" name="asignaturaId" value={form.asignaturaId}
            onChange={handleChangeForm} required fullWidth
          >
            {asignaturasOpciones.map(opcion => <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>)}
          </ResponsiveTextField>
          <ResponsiveTextField
            select label="Docente" name="docenteId" value={form.docenteId}
            onChange={handleChangeForm} required disabled={!form.asignaturaId || loadingDocentes}
            fullWidth
          >
            {docentesFiltrados.map(opcion => <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>)}
          </ResponsiveTextField>
        </Stack>
        <FormGroupStack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          <FlexTextField
            select label="Día de la Semana" name="diaSemana" value={form.diaSemana}
            onChange={handleChangeForm} required fullWidth
          >
            {DIAS_SEMANA.map(dia => <MenuItem key={dia} value={dia}>{dia}</MenuItem>)}
          </FlexTextField>
          <FlexTextField
            select label="Bloque Horario" name="bloqueHorario" value={form.bloqueHorario}
            onChange={handleChangeForm} required fullWidth
          >
            {BLOQUES.map(opcion => <MenuItem key={opcion.id} value={opcion.id}>{opcion.label}</MenuItem>)}
          </FlexTextField>
        </FormGroupStack>
        <SaveButton
          type="submit" variant="contained" color="primary" disabled={loadingCargas}
          startIcon={loadingCargas ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
        >
          Asignar al Horario
        </SaveButton>
      </form>
    </FormPaper>
  );
};
