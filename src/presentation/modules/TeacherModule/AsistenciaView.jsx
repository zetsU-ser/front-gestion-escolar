import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../application/context/AuthContext';
import { useSnackbar } from '../../../application/context/SnackbarContext';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useCargaAcademica } from '../../../application/use-cases/useCargaAcademica';

import { alumnoCursoRepository } from '../../../infrastructure/repositories/HttpCursosRepository';
import { asistenciaRepository } from '../../../infrastructure/repositories/HttpAsistenciaRepository';

import { TablaAsistencia } from '../../components/organisms/TablaAsistencia';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { FiltroNivelCurso } from '../../components/molecules/FiltroNivelCurso';
import { DetalleCursoInfo } from '../../components/molecules/DetalleCursoInfo';
import { BotonAccion } from '../../components/atoms/BotonAccion';

import { Save as SaveIcon } from '@mui/icons-material';

import { 
  DashboardContainer, 
  StyledPaper, 
  StyledDivider, 
  FilterPaper, 
  SectionTitle, 
  LoadingContainer, 
  ButtonContainer, 
  LoadingSpinner, 
  EmptyStatePaper, 
  EmptyStateText 
} from './ProfesorDashboard.styles';

export const AsistenciaView = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();
  
  const { cursos, loading: loadingCursos } = useCursos();
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  
  // maneja el estado de la tabla interactiva y datos de alumnos
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [estadoAsistencia, setEstadoAsistencia] = useState({});
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  // maneja el estado de los filtros
  const [nivelFiltro, setNivelFiltro] = useState('');
  const [cursoFiltro, setCursoFiltro] = useState(cursoId || '');

  // extrae los cursos que dicta el docente
  const profesorId = currentUser?.profile?.id;
  const miHorario = cargas.filter(c => c.docenteId === profesorId);
  const misCursosIds = [...new Set(miHorario.map(c => c.cursoId))];
  const misCursos = cursos.filter(c => misCursosIds.includes(c.id));

  const cursoActual = cursos.find(c => String(c.id) === String(cursoFiltro));

  // filtra las opciones de cursos según el nivel seleccionado
  const cursosOpciones = misCursos
    .filter(c => {
      if (!nivelFiltro) return true;
      if (nivelFiltro === 'BASICA') return c.nivel?.includes('Básico');
      if (nivelFiltro === 'MEDIA') return c.nivel?.includes('Medio');
      return true;
    })
    .map(c => ({
      value: c.id,
      label: `${c.nivel} ${c.letra}`
    }));

  useEffect(() => {
    if (cursoId) {
      setCursoFiltro(cursoId);
    }
  }, [cursoId]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      setLoadingAlumnos(true);
      try {
        const asignaciones = await alumnoCursoRepository.getByCurso(cursoFiltro);
        const listaAlumnos = asignaciones.map(a => a.alumno).filter(Boolean);
        setAlumnosCurso(listaAlumnos);
      } catch (err) {
        console.error("Error cargando alumnos del curso:", err);
      } finally {
        setLoadingAlumnos(false);
      }
    };
    if (cursoFiltro) {
      fetchAlumnos();
    } else {
      setAlumnosCurso([]);
    }
  }, [cursoFiltro]);

  // inicializa el estado de asistencia cargando de localStorage o asumiendo PRESENTE
  useEffect(() => {
    if (alumnosCurso.length > 0) {
      const stored = localStorage.getItem(`asistencia_curso_${cursoFiltro}`);
      if (stored) {
        setEstadoAsistencia(JSON.parse(stored));
      } else {
        const initialState = {};
        alumnosCurso.forEach(a => {
          initialState[a.id] = { estado: 'PRESENTE', justificado: false };
        });
        setEstadoAsistencia(initialState);
      }
    }
  }, [alumnosCurso, cursoFiltro]);

  const handleEstadoChange = (alumnoId, nuevoEstado) => {
    setEstadoAsistencia(prev => ({
      ...prev,
      [alumnoId]: { 
        ...prev[alumnoId], 
        estado: nuevoEstado,
        justificado: nuevoEstado === 'PRESENTE' ? false : prev[alumnoId]?.justificado || false
      }
    }));
  };

  const handleJustificarChange = (alumnoId, justificado) => {
    setEstadoAsistencia(prev => ({
      ...prev,
      [alumnoId]: { ...prev[alumnoId], justificado }
    }));
  };

  const handleGuardar = async () => {
    setLoadingGuardar(true);
    try {
      const payload = {
        curso_id: Number(cursoFiltro),
        profesor_id: currentUser?.profile?.id,
        fecha: new Date().toISOString().split('T')[0],
        alumnos: alumnosCurso.map(a => ({
          alumno_id: a.id,
          estado: estadoAsistencia[a.id]?.estado || 'PRESENTE',
          justificado: estadoAsistencia[a.id]?.justificado || false
        }))
      };

      // Persistencia real usando el repositorio
      await asistenciaRepository.create(payload);
      
      showSnackbar('¡Asistencia guardada con éxito!', 'success');
    } catch (error) {
      showSnackbar('Error al guardar asistencia.', 'error');
    } finally {
      setLoadingGuardar(false);
    }
  };

  if (loadingCargas || loadingCursos) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      {/* muestra el encabezado de la página */}
      <HeaderModulo titulo="Registro de Asistencia Diaria" correo={currentUser?.email} />
      <StyledDivider />

      <FilterPaper>
        <SectionTitle variant="h6">
          Selecciona Nivel y Curso para operar
        </SectionTitle>
        <FiltroNivelCurso
          nivelSeleccionado={nivelFiltro}
          onNivelChange={(e) => {
            setNivelFiltro(e.target.value);
            setCursoFiltro('');
          }}
          cursoSeleccionado={cursoFiltro}
          onCursoChange={(e) => {
            const newCurso = e.target.value;
            setCursoFiltro(newCurso);
            if (newCurso) {
              navigate(`/profesor/asistencia/${newCurso}`, { replace: true });
            } else {
              navigate(`/profesor/asistencia`, { replace: true });
            }
          }}
          cursosOpciones={cursosOpciones}
          loadingCursos={loadingCursos}
        />
      </FilterPaper>

      {/* renderiza el detalle de información si hay curso */}
      {cursoFiltro && (
        <DetalleCursoInfo curso={cursoActual} />
      )}

      {/* renderiza la tabla de alumnos y toma de asistencia */}
      {loadingAlumnos ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : cursoFiltro && alumnosCurso.length > 0 ? (
        <>
          <TablaAsistencia
            alumnos={alumnosCurso}
            estadoAsistencia={estadoAsistencia}
            onEstadoChange={handleEstadoChange}
            onJustificarChange={handleJustificarChange}
            disabled={loadingGuardar}
          />

          <ButtonContainer>
            <BotonAccion 
              startIcon={<SaveIcon />} 
              onClick={handleGuardar}
              loading={loadingGuardar}
              color="primary"
            >
              Guardar Asistencia
            </BotonAccion>
          </ButtonContainer>
        </>
      ) : cursoFiltro ? (
        <EmptyStatePaper>
          <EmptyStateText>No hay alumnos registrados en este curso.</EmptyStateText>
        </EmptyStatePaper>
      ) : null}
    </DashboardContainer>
  );
};
