import { useState } from 'react';
import { Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectorDesplegable } from '../atoms/SelectorDesplegable';
import { InputTexto } from '../atoms/InputTexto';
import { TextAreaMensaje } from '../atoms/TextAreaMensaje';
import { BotonAccion } from '../atoms/BotonAccion';
import { Send as SendIcon } from '@mui/icons-material';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  maxWidth: '700px',
  margin: '0 auto',
}));

const ALCANCES = [
  { value: 'INSTITUCION', label: 'Toda la Institución' },
  { value: 'CURSO', label: 'Un Curso Específico' },
  { value: 'ALUMNO', label: 'Un Alumno Específico' }
];

/**
 * Organismo: FormularioMensajeriaGlobal
 * Formulario dinámico que adapta los selectores secundarios según el
 * "Alcance" elegido (Institución, Curso, Alumno).
 * Usado en: PaginaMensajeriaCoordinador, PaginaMensajeriaAdmin
 */
export const FormularioMensajeriaGlobal = ({
  onSubmit,
  loading,
  cursosOpciones = [],
  alumnosOpciones = [],
  alcancesOpciones = ALCANCES,
  loadingCursos,
  loadingAlumnos
}) => {
  const [form, setForm] = useState({
    alcance: alcancesOpciones[0]?.value || 'INSTITUCION',
    cursoId: '',
    alumnoId: '',
    asunto: '',
    cuerpo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'alcance' && { cursoId: '', alumnoId: '' }),
      ...(name === 'cursoId' && { alumnoId: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <FormPaper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <SelectorDesplegable
            label="Alcance del Comunicado"
            name="alcance"
            value={form.alcance}
            onChange={handleChange}
            opciones={alcancesOpciones}
            required
          />

          {form.alcance === 'CURSO' && (
            <SelectorDesplegable
              label="Seleccione el Curso"
              name="cursoId"
              value={form.cursoId}
              onChange={handleChange}
              opciones={cursosOpciones}
              required
              disabled={loadingCursos}
            />
          )}

          {form.alcance === 'ALUMNO' && (
            <SelectorDesplegable
              label="Seleccione el Alumno"
              name="alumnoId"
              value={form.alumnoId}
              onChange={handleChange}
              opciones={alumnosOpciones}
              required
              disabled={loadingAlumnos}
            />
          )}

          <InputTexto
            label="Asunto del Correo"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
            required
            placeholder="Ej: Reunión de Apoderados"
          />

          <TextAreaMensaje
            value={form.cuerpo}
            onChange={handleChange}
          />

          <BotonAccion
            type="submit"
            loading={loading}
            startIcon={<SendIcon />}
          >
            {loading ? 'Procesando Envío...' : 'Enviar Comunicado'}
          </BotonAccion>
        </Stack>
      </form>
    </FormPaper>
  );
};
