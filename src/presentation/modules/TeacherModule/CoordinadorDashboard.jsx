import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';
import { Send as SendIcon } from '@mui/icons-material';
import { AuthContext } from '../../../application/context/AuthContext';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { PanelDashboard } from '../../components/organisms/PanelDashboard';
import { BotonAccion } from '../../components/atoms/BotonAccion';
import { useState } from 'react';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { DetalleMetricasCoordinador } from '../../components/organisms/DetalleMetricasCoordinador';
import {
  DashboardContainer,
  StyledDivider,
  ActionStack
} from './CoordinadorDashboard.styles';

/**
 * Página: PaginaHomeCoordinador
 * Composición Atomic Design:
 *   Organismo → PanelDashboard (TarjetaMetrica[])
 *   Átomo    → BotonAccion (navegación a submódulos)
 */
export const CoordinadorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { alumnos } = useAlumnos();
  const { cursos } = useCursos();
  const { usuarios: docentes } = useUsuarios('DOCENTE');

  const [metricaSeleccionada, setMetricaSeleccionada] = useState(null);

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
        />

    </DashboardContainer>
  );
};
