import { useState, useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { useCargaAcademica } from '../../../application/use-cases/useCargaAcademica';
import { useCursos } from '../../../application/use-cases/useCursos';
import { TablaHorario } from '../../components/organisms/TablaHorario';
import { FiltroSeleccionCurso } from '../../components/organisms/FiltroSeleccionCurso';
import { DashboardContainer, StyledPaper, Title, DescriptionText } from './ProfesorDashboard.styles';
import { Typography, CircularProgress, Box } from '@mui/material';

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

export const ProfesorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  const { cursos, loading: loadingCursos } = useCursos();

  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState('');

  if (loadingCargas || loadingCursos) {
    return (
      <DashboardContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </DashboardContainer>
    );
  }

  // Identificar el ID interno del profesor en base de datos.
  // currentUser.profile.id viene desde la tabla usuarios de mock o bd
  const profesorId = currentUser?.profile?.id;

  // Filtrar la carga que pertenece exclusivamente a este docente
  const miHorario = cargas.filter(c => c.docenteId === profesorId);

  // Extraer cursos únicos que dicta
  const misCursosIds = [...new Set(miHorario.map(c => c.cursoId))];
  const misCursos = cursos.filter(c => misCursosIds.includes(c.id));

  // Extraer asignaturas únicas que dicta
  const misAsignaturasIds = [...new Set(miHorario.map(c => c.asignaturaId))];
  const misAsignaturas = ASIGNATURAS_MOCK.filter(a => misAsignaturasIds.includes(a.id));

  const cursosOpciones = misCursos.map(c => ({
    value: c.id,
    label: `${c.nivel} ${c.letra}`
  }));

  const asignaturasOpciones = misAsignaturas.map(a => ({
    value: a.id,
    label: a.nombre
  }));

  const getDisplayData = (carga) => {
    const curso = cursos.find(c => c.id === carga.cursoId);
    const asignatura = ASIGNATURAS_MOCK.find(a => a.id === carga.asignaturaId);
    const bloque = BLOQUES.find(b => b.id === carga.bloqueHorario);
    return {
      cursoStr: curso ? `${curso.nivel} ${curso.letra}` : 'N/A',
      asignaturaStr: asignatura ? asignatura.nombre : 'N/A',
      diaStr: carga.diaSemana,
      bloqueStr: bloque ? bloque.label : 'N/A'
    };
  };

  return (
    <DashboardContainer>
      <StyledPaper elevation={4}>
        <Title variant="h3" gutterBottom>
          Portal Docente
        </Title>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Bienvenido, {currentUser?.profile?.nombre || currentUser?.email}
        </Typography>

        <DescriptionText variant="body1">
          Desde aquí puedes visualizar tu carga académica y seleccionar el curso y asignatura 
          con la que deseas trabajar.
        </DescriptionText>

        {/* Organismo: FiltroSeleccionCurso */}
        <FiltroSeleccionCurso
          cursosOpciones={cursosOpciones}
          asignaturasOpciones={asignaturasOpciones}
          cursoSeleccionado={cursoSeleccionado}
          asignaturaSeleccionada={asignaturaSeleccionada}
          onCursoChange={(e) => setCursoSeleccionado(e.target.value)}
          onAsignaturaChange={(e) => setAsignaturaSeleccionada(e.target.value)}
        />

        {/* Organismo: TablaHorario */}
        <TablaHorario
          horarioData={miHorario}
          getDisplayData={getDisplayData}
        />

      </StyledPaper>
    </DashboardContainer>
  );
};
