import { useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { useCargaAcademica } from '../../../application/use-cases/useCargaAcademica';
import { FiltroNivelCurso } from '../../components/molecules/FiltroNivelCurso';
import { FormularioAsignacionHorario } from '../../components/organisms/FormularioAsignacionHorario';
import { VistaHorario } from '../../components/organisms/VistaHorario';
import { MainContainer, HeaderContainer, TitleText } from './CargaAcademicaView.styles';

const ASIGNATURAS_MOCK = [
  { id: 1, nombre: 'Matemáticas' },
  { id: 2, nombre: 'Lenguaje y Comunicación' },
  { id: 3, nombre: 'Historia y Geografía' },
  { id: 4, nombre: 'Ciencias Naturales' },
  { id: 5, nombre: 'Inglés' }
];

const BLOQUES = [
  { id: 1, label: 'Bloque 1 (08:00 - 09:30)' },
  { id: 2, label: 'Bloque 2 (09:45 - 11:15)' },
  { id: 3, label: 'Bloque 3 (11:30 - 13:00)' },
  { id: 4, label: 'Bloque 4 (14:00 - 15:30)' }
];

/**
 * Página: CargaAcademicaView
 * Compone la vista completa aplicando Atomic Design.
 */
export const CargaAcademicaView = () => {
  const { cursos, loading: loadingCursos } = useCursos();
  const { usuarios: docentes, loading: loadingDocentes } = useUsuarios('DOCENTE');
  const { cargas, loading: loadingCargas, asignarBloque, eliminarBloque } = useCargaAcademica();

  // Estados locales para la selección jerárquica
  const [nivel, setNivel] = useState('');
  const [cursoId, setCursoId] = useState('');

  // Filtrar cursos por nivel seleccionado
  const cursosOpciones = cursos
    .filter(c => {
      if (!nivel) return true;
      if (nivel === 'BASICA') return c.nivel?.includes('Básico');
      if (nivel === 'MEDIA') return c.nivel?.includes('Medio');
      return true;
    })
    .map(c => ({
      value: c.id,
      label: `${c.nivel} ${c.letra}`
    }));

  const docentesOpciones = docentes.map(d => ({
    value: d.id,
    label: `${d.nombre} ${d.apellido}`
  }));

  const asignaturasOpciones = ASIGNATURAS_MOCK.map(a => ({
    value: a.id,
    label: a.nombre
  }));

  // Filtrar cargas para el curso seleccionado
  const cargasCurso = cargas.filter(c => c.cursoId === cursoId);

  // Helper para resolver nombres en la tabla visual
  const getDisplayData = (carga) => {
    const docente = docentes.find(d => d.id === carga.docenteId);
    const asignatura = ASIGNATURAS_MOCK.find(a => a.id === carga.asignaturaId);
    const bloque = BLOQUES.find(b => b.id === carga.bloqueHorario);
    return {
      docenteStr: docente ? `${docente.nombre} ${docente.apellido}` : 'N/A',
      asignaturaStr: asignatura ? asignatura.nombre : 'N/A',
      diaStr: carga.diaSemana,
      bloqueStr: bloque ? bloque.label : 'N/A'
    };
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar esta asignación?')) {
      try { await eliminarBloque(id); }
      catch (error) { alert(error.message); }
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <TitleText variant="h5">Carga Académica y Horarios</TitleText>
      </HeaderContainer>

      {/* 1. Nivel y Curso */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" gutterBottom color="textSecondary">
          Selección de Curso
        </Typography>
        <FiltroNivelCurso
          nivelSeleccionado={nivel}
          onNivelChange={(e) => {
            setNivel(e.target.value);
            setCursoId(''); // resetear curso al cambiar nivel
          }}
          cursoSeleccionado={cursoId}
          onCursoChange={(e) => setCursoId(e.target.value)}
          cursosOpciones={cursosOpciones}
          loadingCursos={loadingCursos}
        />
      </Paper>

      {/* 2. Formulario y Horario (Solo si hay un curso seleccionado) */}
      {cursoId ? (
        <>
          <FormularioAsignacionHorario
            cursoId={cursoId}
            docentesOpciones={docentesOpciones}
            asignaturasOpciones={asignaturasOpciones}
            loadingDocentes={loadingDocentes}
            loadingCargas={loadingCargas}
            onAsignar={asignarBloque}
          />

          <VistaHorario
            cargasCurso={cargasCurso}
            getDisplayData={getDisplayData}
            onEliminar={handleEliminar}
          />
        </>
      ) : (
        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'transparent' }}>
          <Typography color="textSecondary">
            Seleccione un nivel educativo y luego un curso para construir su horario.
          </Typography>
        </Paper>
      )}

    </MainContainer>
  );
};
