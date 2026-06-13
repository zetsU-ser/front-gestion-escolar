import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress, Stack } from '@mui/material';
import { AuthContext } from '../../../application/context/AuthContext';
import { useCursos } from '../../../application/use-cases/useCursos';
import { alumnoCursoRepository } from '../../../infrastructure/repositories/HttpCursosRepository';
import { TablaAsistencia } from '../../components/organisms/TablaAsistencia';
import { BotonAccion } from '../../components/atoms/BotonAccion';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DashboardContainer, StyledPaper, Title } from './ProfesorDashboard.styles';

export const AsistenciaView = () => {
  const { cursoId, asignaturaId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cursos, loading: loadingCursos } = useCursos();
  
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(true);
  const [estadoAsistencia, setEstadoAsistencia] = useState({});
  const [loadingGuardar, setLoadingGuardar] = useState(false);

  const cursoActual = cursos.find(c => String(c.id) === String(cursoId));

  useEffect(() => {
    const fetchAlumnos = async () => {
      setLoadingAlumnos(true);
      try {
        const asignaciones = await alumnoCursoRepository.getByCurso(cursoId);
        const listaAlumnos = asignaciones.map(a => a.alumno).filter(Boolean);
        setAlumnosCurso(listaAlumnos);
      } catch (err) {
        console.error("Error cargando alumnos del curso:", err);
      } finally {
        setLoadingAlumnos(false);
      }
    };
    if (cursoId) fetchAlumnos();
  }, [cursoId]);

  // Inicializar estado asumiendo todos presentes si no hay estado guardado
  useEffect(() => {
    if (alumnosCurso.length > 0 && Object.keys(estadoAsistencia).length === 0) {
      const initialState = {};
      alumnosCurso.forEach(a => {
        initialState[a.id] = { estado: 'PRESENTE', justificado: false };
      });
      setEstadoAsistencia(initialState);
    }
  }, [alumnosCurso]);

  const handleEstadoChange = (alumnoId, nuevoEstado) => {
    setEstadoAsistencia(prev => ({
      ...prev,
      [alumnoId]: { 
        ...prev[alumnoId], 
        estado: nuevoEstado,
        // Si cambia a presente, forzamos justificado a false
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
        curso_id: Number(cursoId),
        asignatura_id: Number(asignaturaId),
        profesor_id: currentUser?.profile?.id,
        fecha: new Date().toISOString().split('T')[0],
        alumnos: alumnosCurso.map(a => ({
          alumno_id: a.id,
          estado: estadoAsistencia[a.id]?.estado || 'PRESENTE',
          justificado: estadoAsistencia[a.id]?.justificado || false
        }))
      };

      // Simular guardado hacia ms-asistencia
      await new Promise(r => setTimeout(r, 1000));
      console.log('Payload a ms-asistencia:', payload);
      alert('¡Asistencia guardada con éxito!');
    } catch (error) {
      alert('Error al guardar asistencia.');
    } finally {
      setLoadingGuardar(false);
    }
  };

  if (loadingAlumnos || loadingCursos) {
    return (
      <DashboardContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <StyledPaper elevation={4}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <BotonAccion variant="text" onClick={() => navigate('/profesor')}>
            <ArrowBackIcon /> Volver al Horario
          </BotonAccion>
        </Stack>

        <Title variant="h4" gutterBottom>
          Registro de Asistencia Diaria
        </Title>
        <Typography variant="h6" color="primary" sx={{ mb: 4 }}>
          {cursoActual ? `Curso: ${cursoActual.nivel} ${cursoActual.letra}` : 'Curso'} | Fecha: {new Date().toLocaleDateString('es-CL')}
        </Typography>

        <TablaAsistencia
          alumnos={alumnosCurso}
          estadoAsistencia={estadoAsistencia}
          onEstadoChange={handleEstadoChange}
          onJustificarChange={handleJustificarChange}
          disabled={loadingGuardar}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <BotonAccion 
            startIcon={<SaveIcon />} 
            onClick={handleGuardar}
            loading={loadingGuardar}
          >
            Guardar Asistencia
          </BotonAccion>
        </Box>
      </StyledPaper>
    </DashboardContainer>
  );
};
