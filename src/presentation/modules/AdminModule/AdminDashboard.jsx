import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../application/context/AuthContext';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { useCursos } from '../../../application/use-cases/useCursos';
import { PanelDashboard } from '../../components/organisms/PanelDashboard';
import { DetalleMetricasAdmin } from '../../components/organisms/DetalleMetricasAdmin';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import {
  DashboardContainer,
  StyledDivider
} from './AdminDashboard.styles';

export const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { alumnos } = useAlumnos();
  const { usuarios: personal } = useUsuarios();
  const { cursos } = useCursos();
  
  // maneja el estado de la tabla interactiva
  const [metricaSeleccionada, setMetricaSeleccionada] = useState(null);

  const metricas = [
    { id: 'personal', valor: personal.length, titulo: 'Personal Registrado' },
    { id: 'cursos', valor: cursos.length, titulo: 'Cursos Registrados' },
    { id: 'alumnos', valor: alumnos.length, titulo: 'Alumnos Matriculados' },
  ];

  return (
    <DashboardContainer>
      {/* muestra el encabezado de la página */}
      <HeaderModulo 
        titulo="Panel de Administración" 
        correo={currentUser?.email}
      />

      <StyledDivider />

      <PanelDashboard 
        metricas={metricas} 
        onSelectMetrica={(id) => setMetricaSeleccionada(id === metricaSeleccionada ? null : id)} 
      />

      {/* muestra la tabla interactiva según la tarjeta clickeada */}
      <DetalleMetricasAdmin 
        metricaId={metricaSeleccionada} 
        usuarios={personal} 
        cursos={cursos} 
        alumnos={alumnos} 
      />
    </DashboardContainer>
  );
};
