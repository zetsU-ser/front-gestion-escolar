import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import { Send as SendIcon } from '@mui/icons-material';
import { AuthContext } from '../../../application/context/AuthContext';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { useUsuarios } from '../../../application/use-cases/useUsuarios';
import { PanelDashboard } from '../../components/organisms/PanelDashboard';
import { BotonAccion } from '../../components/atoms/BotonAccion';
import {
  DashboardContainer,
  WelcomePaper,
  Title,
  EmailText,
  StyledDivider,
  DescriptionText,
  ActionStack
} from './AdminDashboard.styles';

/**
 * Página: PaginaHomeAdmin
 * Composición Atomic Design:
 *   Organismo → PanelDashboard (TarjetaMetrica[])
 *   Átomo    → BotonAccion (navegación a submódulos)
 */
export const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { alumnos } = useAlumnos();
  const { usuarios: personal } = useUsuarios();

  const metricas = [
    { valor: personal.length, titulo: 'Personal Registrado' },
    { valor: alumnos.length, titulo: 'Alumnos Matriculados' },
  ];

  return (
    <DashboardContainer>
      <WelcomePaper elevation={6}>
        <Title variant="h3" gutterBottom>
          Panel de Administración
        </Title>

        <EmailText variant="h5" color="textSecondary">
          {currentUser?.email}
        </EmailText>

        <StyledDivider />

        {/* Organismo: PanelDashboard → TarjetaMetrica[] */}
        <PanelDashboard metricas={metricas} />

        <DescriptionText variant="body1">
          Bienvenido al centro de control del establecimiento.
          Como administrador, tienes permisos para gestionar las cuentas del personal docente
          y de coordinación, garantizando la integridad de los accesos al sistema.
        </DescriptionText>

        {/* Átomos: BotonAccion × 3 */}
        <ActionStack direction="row" spacing={2} sx={{ mt: 4, flexWrap: 'wrap', gap: 2 }}>
          <BotonAccion
            startIcon={<GroupIcon />}
            onClick={() => navigate('/admin/personal')}
          >
            Registrar Personal
          </BotonAccion>
          <BotonAccion
            color="secondary"
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/admin/alumnos')}
          >
            Matricular Alumnos
          </BotonAccion>
          <BotonAccion
            color="info"
            startIcon={<SendIcon />}
            onClick={() => navigate('/admin/mensajeria')}
          >
            Mensajería Global
          </BotonAccion>
        </ActionStack>
      </WelcomePaper>
    </DashboardContainer>
  );
};
