import { useState, useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { useCargaAcademica } from '../../../application/use-cases/useCargaAcademica';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useAsignacionesAlumnos } from '../../../application/use-cases/useAsignacionesAlumnos';

import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { PanelDashboard } from '../../components/organisms/PanelDashboard';
import { DetalleMetricasProfesor } from '../../components/organisms/DetalleMetricasProfesor';
import { DashboardContainer, StyledDivider, LoadingContainer, LoadingSpinner } from './ProfesorDashboard.styles';

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
  const { asignaciones } = useAsignacionesAlumnos();

  // maneja el estado de la tabla interactiva
  const [metricaSeleccionada, setMetricaSeleccionada] = useState('horario'); // por defecto muestra el horario

  if (loadingCargas || loadingCursos) {
    return (
      <DashboardContainer>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </DashboardContainer>
    );
  }

  const profesorId = currentUser?.profile?.id;

  const miHorario = cargas.filter(c => c.docenteId === profesorId);

  const misCursosIds = [...new Set(miHorario.map(c => c.cursoId))];
  const misCursos = cursos.filter(c => misCursosIds.includes(c.id));

  const getDisplayData = (carga) => {
    const curso = cursos.find(c => c.id === carga.cursoId);
    const asignatura = ASIGNATURAS_MOCK.find(a => a.id === carga.asignaturaId);
    const bloque = BLOQUES.find(b => b.id === carga.bloqueHorario);
    return {
      docenteStr: curso ? `${curso.nivel} ${curso.letra}` : 'N/A', 
      asignaturaStr: asignatura ? asignatura.nombre : 'N/A',
      diaStr: carga.diaSemana,
      bloqueStr: bloque ? bloque.label : 'N/A'
    };
  };

  const metricas = [
    { id: 'cursos', valor: misCursos.length, titulo: 'Cursos Asignados' },
    { id: 'horario', valor: miHorario.length, titulo: 'Bloques Horarios' }
  ];

  return (
    <DashboardContainer>
      {/* muestra el encabezado de la página */}
      <HeaderModulo 
        titulo="Panel de Docentes"
        correo={currentUser?.email}
      />

      <StyledDivider />

      <PanelDashboard 
        metricas={metricas} 
        onSelectMetrica={(id) => setMetricaSeleccionada(id === metricaSeleccionada ? null : id)} 
      />

      {/* muestra la tabla interactiva según la tarjeta clickeada */}
      <DetalleMetricasProfesor 
        metricaId={metricaSeleccionada}
        miHorario={miHorario}
        getDisplayData={getDisplayData}
        cursos={misCursos}
        asignaciones={asignaciones}
      />

    </DashboardContainer>
  );
};
