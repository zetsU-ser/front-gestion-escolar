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
import {
  DashboardContainer,
  DashboardPaper,
  TitleText,
  EmailText,
  StyledDivider,
  DescriptionText,
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

  const metricas = [
    { valor: cursos.length, titulo: 'Cursos Registrados' },
    { valor: alumnos.length, titulo: 'Alumnos Matriculados' },
    { valor: docentes.length, titulo: 'Docentes Activos' }
  ];

  return (
    <DashboardContainer>
      <DashboardPaper elevation={6}>
        <TitleText variant="h3" gutterBottom>
          Gestión de Coordinación
        </TitleText>

        <EmailText variant="h5" color="textSecondary">
          {currentUser?.email}
        </EmailText>

        <StyledDivider />

        {/* Organismo: PanelDashboard → TarjetaMetrica[] */}
        <PanelDashboard metricas={metricas} />

        <DescriptionText variant="body1">
          Bienvenido al centro de planificación. Como coordinador, tienes la responsabilidad
          de estructurar los niveles académicos y asegurar que cada estudiante esté
          correctamente matriculado en su curso.
        </DescriptionText>

        {/* Átomos: BotonAccion × 3 */}
        <ActionStack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 4, flexWrap: 'wrap', gap: 2 }}>
          <BotonAccion
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/cursos')}
          >
            Gestión Académica
          </BotonAccion>
          <BotonAccion
            color="secondary"
            startIcon={<ClassIcon />}
            onClick={() => navigate('/coordinador/carga-academica')}
          >
            Carga Académica
          </BotonAccion>
          <BotonAccion
            color="info"
            startIcon={<SendIcon />}
            onClick={() => navigate('/coordinador/mensajeria')}
          >
            Mensajería Global
          </BotonAccion>
        </ActionStack>
      </DashboardPaper>
    </DashboardContainer>
  );
};
