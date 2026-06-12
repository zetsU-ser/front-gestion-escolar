import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress, Stack } from '@mui/material';
import { AuthContext } from '../../../application/context/AuthContext';
import { useCursos } from '../../../application/use-cases/useCursos';
import { alumnoCursoRepository } from '../../../infrastructure/repositories/HttpCursosRepository';
import { TablaEvaluaciones } from '../../components/organisms/TablaEvaluaciones';
import { BotonAccion } from '../../components/atoms/BotonAccion';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DashboardContainer, StyledPaper, Title } from './ProfesorDashboard.styles';

export const EvaluacionesView = () => {
  const { cursoId, asignaturaId } = useParams();
  const navigate = useNavigate();
  const { cursos, loading: loadingCursos } = useCursos();
  
  const [alumnosCurso, setAlumnosCurso] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(true);
  const [estadoNotas, setEstadoNotas] = useState({});
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
        curso_id: Number(cursoId),
        asignatura_id: Number(asignaturaId),
        alumnos: alumnosCurso.map(a => ({
          alumno_id: a.id,
          nota1: estadoNotas[a.id]?.nota1 || null,
          nota2: estadoNotas[a.id]?.nota2 || null,
          nota3: estadoNotas[a.id]?.nota3 || null,
        }))
      };

      // Simular guardado masivo
      await new Promise(r => setTimeout(r, 1000));
      console.log('Payload a ms-gestion-academica:', payload);
      alert('¡Evaluaciones guardadas con éxito!');
    } catch (error) {
      alert(error.message);
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
          Registro de Calificaciones
        </Title>
        <Typography variant="h6" color="secondary" sx={{ mb: 4 }}>
          {cursoActual ? `Curso: ${cursoActual.nivel} ${cursoActual.letra}` : 'Curso'}
        </Typography>

        <TablaEvaluaciones
          alumnos={alumnosCurso}
          estadoNotas={estadoNotas}
          onNotaChange={handleNotaChange}
          disabled={loadingGuardar}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <BotonAccion 
            color="secondary"
            startIcon={<SaveIcon />} 
            onClick={handleGuardar}
            loading={loadingGuardar}
          >
            Guardar Evaluaciones
          </BotonAccion>
        </Box>
      </StyledPaper>
    </DashboardContainer>
  );
};
