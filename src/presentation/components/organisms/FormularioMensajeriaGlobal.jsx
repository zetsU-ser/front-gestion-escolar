import { useState, useMemo, useEffect } from 'react';
import { Stack, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SelectorDesplegable } from '../atoms/SelectorDesplegable';
import { InputTexto } from '../atoms/InputTexto';
import { TextAreaMensaje } from '../atoms/TextAreaMensaje';
import { BotonAccion } from '../atoms/BotonAccion';
import { Send as SendIcon } from '@mui/icons-material';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
}));

const ALCANCES = [
  { value: 'INSTITUCION', label: 'Toda la Institución' },
  { value: 'CURSO', label: 'Un Curso Específico' },
  { value: 'ALUMNO', label: 'Un Alumno Específico' }
];

export const FormularioMensajeriaGlobal = ({
  onSubmit,
  loading,
  cursosRaw = [],
  alumnosRaw = [],
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

  // Filtros en cascada (Tipo Enseñanza -> Grado -> Letra)
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroGrado, setFiltroGrado] = useState('');
  const [filtroLetra, setFiltroLetra] = useState('');

  // Enriquecemos los cursos con las propiedades parseadas
  const cursosEnriquecidos = useMemo(() => {
    return cursosRaw.map(c => {
      const [grado, tipo] = (c.nivel || '').split(' ');
      return { ...c, grado, tipo: tipo === 'Básico' || tipo === 'Básica' ? 'Básica' : 'Media' };
    });
  }, [cursosRaw]);

  // Paso 1: Tipos de enseñanza disponibles ('Básica' o 'Media')
  const tiposDisponibles = useMemo(() => {
    const tipos = [...new Set(cursosEnriquecidos.map(c => c.tipo))].filter(Boolean);
    return tipos.map(t => ({ value: t, label: t }));
  }, [cursosEnriquecidos]);

  // Paso 2: Grados disponibles según el tipo de enseñanza seleccionado
  const gradosDisponibles = useMemo(() => {
    if (!filtroTipo) return [];
    const grados = [...new Set(cursosEnriquecidos.filter(c => c.tipo === filtroTipo).map(c => c.grado))].filter(Boolean);
    return grados.sort().map(g => ({ value: g, label: g }));
  }, [cursosEnriquecidos, filtroTipo]);

  // Paso 3: Letras disponibles según el tipo y grado
  const letrasDisponibles = useMemo(() => {
    if (!filtroTipo || !filtroGrado) return [];
    const letras = cursosEnriquecidos
      .filter(c => c.tipo === filtroTipo && c.grado === filtroGrado)
      .map(c => c.letra)
      .filter(Boolean);
    return [...new Set(letras)].sort().map(l => ({ value: l, label: l }));
  }, [cursosEnriquecidos, filtroTipo, filtroGrado]);

  // Alumnos filtrados por el curso final
  const alumnosFiltrados = useMemo(() => {
    if (!form.cursoId) return [];
    return alumnosRaw
      .filter(a => a.cursoId === form.cursoId)
      .map(a => ({ value: a.id, label: `${a.nombre} ${a.apellido} (${a.rut})` }));
  }, [alumnosRaw, form.cursoId]);

  // Efecto para buscar y asignar el cursoId automáticamente cuando se completa la cascada
  useEffect(() => {
    if (filtroTipo && filtroGrado && filtroLetra) {
      const cursoEncontrado = cursosEnriquecidos.find(
        c => c.tipo === filtroTipo && c.grado === filtroGrado && c.letra === filtroLetra
      );
      if (cursoEncontrado) {
        setForm(prev => ({ ...prev, cursoId: cursoEncontrado.id, alumnoId: '' }));
      }
    } else {
      setForm(prev => ({ ...prev, cursoId: '', alumnoId: '' }));
    }
  }, [filtroTipo, filtroGrado, filtroLetra, cursosEnriquecidos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      // Si cambia el alcance, limpiar todos los filtros
      ...(name === 'alcance' && { cursoId: '', alumnoId: '' })
    }));
    
    if (name === 'alcance') {
      setFiltroTipo('');
      setFiltroGrado('');
      setFiltroLetra('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm({
        alcance: alcancesOpciones[0]?.value || 'INSTITUCION',
        cursoId: '',
        alumnoId: '',
        asunto: '',
        cuerpo: ''
      });
      setFiltroTipo('');
      setFiltroGrado('');
      setFiltroLetra('');
    }
  };

  const renderCascadaCursos = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pl: 2, borderLeft: '4px solid #1976d2' }}>
      <SelectorDesplegable
        label="Nivel de Enseñanza"
        name="filtroTipo"
        value={filtroTipo}
        onChange={(e) => {
          setFiltroTipo(e.target.value);
          setFiltroGrado('');
          setFiltroLetra('');
        }}
        opciones={tiposDisponibles}
        disabled={loadingCursos}
      />
      <SelectorDesplegable
        label="Grado (Curso)"
        name="filtroGrado"
        value={filtroGrado}
        onChange={(e) => {
          setFiltroGrado(e.target.value);
          setFiltroLetra('');
        }}
        opciones={gradosDisponibles}
        disabled={!filtroTipo || loadingCursos}
      />
      <SelectorDesplegable
        label="Letra"
        name="filtroLetra"
        value={filtroLetra}
        onChange={(e) => setFiltroLetra(e.target.value)}
        opciones={letrasDisponibles}
        disabled={!filtroGrado || loadingCursos}
      />
    </Box>
  );

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

          {(form.alcance === 'CURSO' || form.alcance === 'ALUMNO') && renderCascadaCursos()}

          {form.alcance === 'ALUMNO' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pl: 2, borderLeft: '4px solid #9c27b0' }}>
              <SelectorDesplegable
                label="Seleccione el Alumno"
                name="alumnoId"
                value={form.alumnoId}
                onChange={handleChange}
                opciones={alumnosFiltrados}
                required
                disabled={!form.cursoId || loadingAlumnos}
              />
            </Box>
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
            // Deshabilitar envío si falta información de la cascada
            disabled={
              (form.alcance === 'CURSO' && !form.cursoId) ||
              (form.alcance === 'ALUMNO' && !form.alumnoId)
            }
          >
            {loading ? 'Procesando Envío...' : 'Enviar Comunicado'}
          </BotonAccion>
        </Stack>
      </form>
    </FormPaper>
  );
};
