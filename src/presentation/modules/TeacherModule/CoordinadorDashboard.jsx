import { useContext, useState } from 'react';


// importa hooks globales y lógica de negocio
import { AuthContext } from '../../../application/context/AuthContext';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { useAsignacionesAlumnos } from '../../../application/use-cases/useAsignacionesAlumnos';

// importa componentes atómicos y moléculas
import { PanelDashboard } from '../../components/organisms/PanelDashboard';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { DetalleMetricasCoordinador } from '../../components/organisms/DetalleMetricasCoordinador';
import {
  DashboardContainer,
  StyledDivider
} from './CoordinadorDashboard.styles';

// define la vista principal del dashboard del coordinador
export const CoordinadorDashboard = () => {
  const { currentUser } = useContext(AuthContext); // obtiene la información del usuario autenticado

  // carga toda la data global necesaria para las métricas
  const { alumnos } = useAlumnos();
  const { cursos } = useCursos();
  const { usuarios: docentes } = useUsuarios('DOCENTE');
  const { asignaciones } = useAsignacionesAlumnos();

  const [metricaSeleccionada, setMetricaSeleccionada] = useState(null); // estado de la métrica clickeada

  // define la estructura de las tarjetas del panel
  const metricas = [
    { id: 'cursos', valor: cursos.length, titulo: 'Cursos Registrados' },
    { id: 'alumnos', valor: alumnos.length, titulo: 'Alumnos Matriculados' },
    { id: 'docentes', valor: docentes.length, titulo: 'Docentes Activos' }
  ];

  return (
    <DashboardContainer>
      <HeaderModulo 
        titulo="Panel de Coordinación" 
        correo={currentUser?.email}
      />

      <StyledDivider />

        <PanelDashboard 
          metricas={metricas} 
          onSelectMetrica={(id) => setMetricaSeleccionada(id === metricaSeleccionada ? null : id)} 
        />

        <DetalleMetricasCoordinador 
          metricaId={metricaSeleccionada} 
          docentes={docentes} 
          cursos={cursos} 
          alumnos={alumnos} 
          asignaciones={asignaciones}
        />

    </DashboardContainer>
  );
};
