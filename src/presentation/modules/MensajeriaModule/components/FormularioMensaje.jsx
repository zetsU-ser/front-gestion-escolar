import { Stack, TextField, MenuItem, CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { ALCANCES } from '../hooks/useMensajeriaViewModel';
import { FormPaper, StyledButton, CascadaContainer, AlumnoContainer } from '../MensajeriaView.styles';

// VIEW PATTERN
// renderiza la vista de formulariomensaje
export const FormularioMensaje = ({ viewModel }) => {
  const {
    form, loading, loadingCursos, loadingAlumnos, loadingAsignaciones,
    filtroTipo, setFiltroTipo, filtroGrado, setFiltroGrado, filtroLetra, setFiltroLetra,
    tiposDisponibles, gradosDisponibles, letrasDisponibles, alumnosFiltrados,
    handleChange, onSubmitForm
  } = viewModel;

  const renderCascadaCursos = () => (
    <CascadaContainer>
      <TextField select label="Nivel de Enseñanza" value={filtroTipo} disabled={loadingCursos} fullWidth
        onChange={(e) => { setFiltroTipo(e.target.value); setFiltroGrado(''); setFiltroLetra(''); }}
      >
        {tiposDisponibles.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
      </TextField>
      <TextField select label="Grado (Curso)" value={filtroGrado} disabled={!filtroTipo || loadingCursos} fullWidth
        onChange={(e) => { setFiltroGrado(e.target.value); setFiltroLetra(''); }}
      >
        {gradosDisponibles.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
      </TextField>
      <TextField select label="Letra" value={filtroLetra} disabled={!filtroGrado || loadingCursos} fullWidth
        onChange={(e) => setFiltroLetra(e.target.value)}
      >
        {letrasDisponibles.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
      </TextField>
    </CascadaContainer>
  );

  return (
    <FormPaper elevation={3}>
      <form onSubmit={onSubmitForm}>
        <Stack spacing={3}>
          <TextField select label="Alcance del Comunicado" name="alcance" value={form.alcance} onChange={handleChange} required fullWidth>
            {ALCANCES.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
          </TextField>

          {(form.alcance === 'CURSO' || form.alcance === 'ALUMNO') && renderCascadaCursos()}

          {form.alcance === 'ALUMNO' && (
            <AlumnoContainer>
              <TextField select label="Seleccione el Alumno" name="alumnoId" value={form.alumnoId} onChange={handleChange} required disabled={!form.cursoId || loadingAlumnos || loadingAsignaciones} fullWidth>
                {alumnosFiltrados.map(o => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
              </TextField>
            </AlumnoContainer>
          )}

          <TextField label="Asunto del Correo" name="asunto" value={form.asunto} onChange={handleChange} required placeholder="Ej: Reunión de Apoderados" fullWidth />
          <TextField label="Cuerpo del Mensaje" name="cuerpo" value={form.cuerpo} onChange={handleChange} fullWidth required multiline rows={6} placeholder="Escriba aquí el contenido oficial..." />

          <StyledButton 
            type="submit" variant="contained" color="primary" 
            disabled={loading || (form.alcance === 'CURSO' && !form.cursoId) || (form.alcance === 'ALUMNO' && !form.alumnoId)}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
          >
            {loading ? 'Procesando Envío...' : 'Enviar Comunicado'}
          </StyledButton>
        </Stack>
      </form>
    </FormPaper>
  );
};
