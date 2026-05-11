import { Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  DashboardContainer, 
  WelcomePaper, 
  Title, 
  EmailText, 
  StyledDivider, 
  DescriptionText, 
  ActionStack, 
  ManagementButton 
} from './AdminDashboard.styles';

/**
 * COMPONENTE: AdminDashboard
 * Punto de entrada para el rol ADMINISTRADOR.
 * Su función principal es la gestión de usuarios (Cuentas de sistema).
 */
export const AdminDashboard = () => {
  // --- CONSUMO DE CONTEXTO ---
  // Obtenemos la información de sesión para personalizar el saludo
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      {/* TARJETA DE BIENVENIDA CON EFECTO VIDRIO */}
      <WelcomePaper elevation={6}>
        <Title variant="h3" gutterBottom>
          Panel de Administración
        </Title>
        
        <EmailText variant="h5" color="textSecondary">
          {currentUser?.email}
        </EmailText>
        
        <StyledDivider />
        
        <DescriptionText variant="body1">
          Bienvenido al centro de control del establecimiento. 
          Como administrador, tienes permisos para gestionar las cuentas del personal docente 
          y de coordinación, garantizando la integridad de los accesos al sistema.
        </DescriptionText>
        
        <ActionStack direction="row" spacing={3}>
          <ManagementButton 
            variant="contained" 
            size="large"
            startIcon={<GroupIcon />}
            onClick={() => navigate('/usuarios')}
          >
            Gestionar Usuarios y Roles
          </ManagementButton>
        </ActionStack>
      </WelcomePaper>
    </DashboardContainer>
  );
};
