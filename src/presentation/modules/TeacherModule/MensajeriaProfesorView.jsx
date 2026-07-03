import { useContext, useState, useMemo } from 'react';
import { Stack, Paper, Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send as SendIcon } from '@mui/icons-material';

import { AuthContext } from '../../../application/context/AuthContext';
import { useMensajeriaProfesor } from './hooks/useMensajeriaProfesor';
import { useCascadaCursos } from '../../shared/hooks/useCascadaCursos';

import { HeaderModulo } from '../../components/HeaderModulo';
import { MainContainer, CascadaContainer, AlumnoContainer } from '../MensajeriaModule/MensajeriaView.styles';
import { StyledDivider } from './ProfesorDashboard.styles';
import { FormPaper, StyledButton } from './MensajeriaProfesorView.styles';

// VIEW PATTERN
// renderiza la vista de mensajeriaprofesorview
export const MensajeriaProfesorView = () => {
  const { currentUser } = useContext(AuthContext);
  
  const {
    loading,
    misCursos,
    misAlumnos,
    alcancesOpciones,
    loadingCursos,
    loadingAlumnos,
    handleSubmit
  } = useMensajeriaProfesor(currentUser);

  const [form, setForm] = useState({
    alcance: alcancesOpciones[0]?.value || 'CURSO',
    cursoId: '',
    alumnoId: '',
    asunto: '',
    cuerpo: ''
  });

  const {
    filtroTipo,
    setFiltroTipo,
    filtroGrado,
    setFiltroGrado,
    filtroLetra,
    setFiltroLetra,
    tiposDisponibles,
    gradosDisponibles,
    letrasDisponibles,
    limpiarFiltros
  } = useCascadaCursos(misCursos, (cursoId) => {
    setForm(prev => ({ ...prev, cursoId, alumnoId: '' }));
  });

  const alumnosFiltrados = useMemo(() => {
    if (!form.cursoId) return [];
    return misAlumnos
      .filter(a => a.cursoId === form.cursoId)
      .map(a => ({ value: a.id, label: `${a.nombre} ${a.apellido} (${a.rut})` }));
  }, [misAlumnos, form.cursoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'alcance' && { cursoId: '', alumnoId: '' })
    }));

    if (name === 'alcance') {
      limpiarFiltros();
    }
  };

// ejecuta la acción asíncrona de onSubmitForm
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(form);
    if (success) {
      setForm({
        alcance: alcancesOpciones[0]?.value || 'CURSO',
        cursoId: '',
        alumnoId: '',
        asunto: '',
        cuerpo: ''
      });
      limpiarFiltros();
    }
  };

  const renderCascadaCursos = () => (
    <CascadaContainer>
      <TextField
        select
        label="Nivel de Enseñanza"
        name="filtroTipo"
        value={filtroTipo}
        onChange={(e) => {
          setFiltroTipo(e.target.value);
          setFiltroGrado('');
          setFiltroLetra('');
        }}
        disabled={loadingCursos}
        fullWidth
      >
        {tiposDisponibles.map(opcion => (
          <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Grado (Curso)"
        name="filtroGrado"
        value={filtroGrado}
        onChange={(e) => {
          setFiltroGrado(e.target.value);
          setFiltroLetra('');
        }}
        disabled={!filtroTipo || loadingCursos}
        fullWidth
      >
        {gradosDisponibles.map(opcion => (
          <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Letra"
        name="filtroLetra"
        value={filtroLetra}
        onChange={(e) => setFiltroLetra(e.target.value)}
        disabled={!filtroGrado || loadingCursos}
        fullWidth
      >
        {letrasDisponibles.map(opcion => (
          <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
        ))}
      </TextField>
    </CascadaContainer>
  );

  return (
    <MainContainer>
      <HeaderModulo 
        titulo="Mensajería Docente" 
        correo={currentUser?.email}
      />
      <StyledDivider />

      <FormPaper elevation={3}>
        <form onSubmit={onSubmitForm}>
          <Stack spacing={3}>
            <TextField
              select
              label="Alcance del Comunicado"
              name="alcance"
              value={form.alcance}
              onChange={handleChange}
              required
              fullWidth
            >
              {alcancesOpciones.map(opcion => (
                <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
              ))}
            </TextField>

            {(form.alcance === 'CURSO' || form.alcance === 'ALUMNO') && renderCascadaCursos()}

            {form.alcance === 'ALUMNO' && (
              <AlumnoContainer>
                <TextField
                  select
                  label="Seleccione el Alumno"
                  name="alumnoId"
                  value={form.alumnoId}
                  onChange={handleChange}
                  required
                  disabled={!form.cursoId || loadingAlumnos}
                  fullWidth
                >
                  {alumnosFiltrados.map(opcion => (
                    <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
                  ))}
                </TextField>
              </AlumnoContainer>
            )}

            <TextField
              label="Asunto del Correo"
              name="asunto"
              value={form.asunto}
              onChange={handleChange}
              required
              placeholder="Ej: Reunión de Apoderados"
              fullWidth
            />

            <TextField
              label="Cuerpo del Mensaje"
              name="cuerpo"
              value={form.cuerpo}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={6}
              placeholder="Escriba aquí el contenido oficial..."
            />

            <StyledButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                loading ||
                (form.alcance === 'CURSO' && !form.cursoId) ||
                (form.alcance === 'ALUMNO' && !form.alumnoId)
              }
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
            >
              {loading ? 'Procesando Envío...' : 'Enviar Comunicado'}
            </StyledButton>
          </Stack>
        </form>
      </FormPaper>
    </MainContainer>
  );
};
