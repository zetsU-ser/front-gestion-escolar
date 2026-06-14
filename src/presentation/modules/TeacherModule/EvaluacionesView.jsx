import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../application/context/AuthContext';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useCargaAcademica } from '../../../application/use-cases/useCargaAcademica';

import { alumnoCursoRepository } from '../../../infrastructure/repositories/HttpCursosRepository';
import { calificacionRepository } from '../../../infrastructure/repositories/HttpCalificacionRepository';

import { TablaEvaluaciones } from '../../components/organisms/TablaEvaluaciones';
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

export const EvaluacionesView = () => {
  const { cursoId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  const { cursos, loading: loadingCursos } = useCursos();
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  
  // maneja el estado de la tabla interactiva y datos de alumnos
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(false);
  const [estadoNotas, setEstadoNotas] = useState({});
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
        
        // Simulación: Cargar notas de localStorage
        const storedNotas = localStorage.getItem(`notas_curso_${cursoFiltro}`);
        if (storedNotas) {
          setEstadoNotas(JSON.parse(storedNotas));
        } else {
          setEstadoNotas({});
        }
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
      setEstadoNotas({});
    }
  }, [cursoFiltro]);

  const handleNotaChange = (alumnoId, campo, valor) => {
    setEstadoNotas(prev => ({
      ...prev,
      [alumnoId]: { 
        ...prev[alumnoId], 
        [campo]: valor
      }
    }));
  };

  const handleGuardar = async () => {
    setLoadingGuardar(true);
    try {
      // Validar notas
      for (const al of alumnosCurso) {
        const notas = estadoNotas[al.id] || {};
        const n1 = parseFloat(notas.nota1);
        const n2 = parseFloat(notas.nota2);
        const n3 = parseFloat(notas.nota3);
        
        const isInvalid = (val, raw) => raw && (isNaN(val) || val < 1.0 || val > 7.0);
        if (isInvalid(n1, notas.nota1) || isInvalid(n2, notas.nota2) || isInvalid(n3, notas.nota3)) {
          throw new Error(`Existen calificaciones inválidas para el alumno ${al.nombre} ${al.apellido}. Recuerde que el rango es 1.0 a 7.0.`);
        }
      }

      const payload = {
        curso_id: Number(cursoFiltro),
        profesor_id: currentUser?.profile?.id,
        alumnos: alumnosCurso.map(a => ({
          alumno_id: a.id,
          nota1: estadoNotas[a.id]?.nota1 || null,
          nota2: estadoNotas[a.id]?.nota2 || null,
          nota3: estadoNotas[a.id]?.nota3 || null,
        }))
      };

      // Persistencia real mediante repositorio
      await calificacionRepository.createBatch(payload);
      
      alert('¡Evaluaciones guardadas con éxito!');
    } catch (error) {
      alert(error.message);
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
      <HeaderModulo titulo="Registro de Calificaciones" correo={currentUser?.email} />
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
              navigate(`/profesor/evaluaciones/${newCurso}`, { replace: true });
            } else {
              navigate(`/profesor/evaluaciones`, { replace: true });
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

      {/* renderiza la tabla de alumnos y registro de calificaciones */}
      {loadingAlumnos ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : cursoFiltro && alumnosCurso.length > 0 ? (
        <>
          <TablaEvaluaciones
            alumnos={alumnosCurso}
            estadoNotas={estadoNotas}
            onNotaChange={handleNotaChange}
            disabled={loadingGuardar}
          />

          <ButtonContainer>
            <BotonAccion 
              startIcon={<SaveIcon />} 
              onClick={handleGuardar}
              loading={loadingGuardar}
              color="primary"
            >
              Guardar Evaluaciones
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
