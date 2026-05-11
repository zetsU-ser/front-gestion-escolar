import { Typography } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ClassIcon from '@mui/icons-material/Class';
import { 
  DashboardContainer, 
  StyledPaper, 
  Title, 
  StyledDivider, 
  DescriptionText, 
  ActionStack, 
  ActionButton, 
  CaptionText 
} from './ProfesorDashboard.styles';

export const ProfesorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <StyledPaper elevation={4}>
        <Title variant="h3" gutterBottom>
          Portal Docente
        </Title>
        
        <Typography variant="h6" color="textSecondary">
          Bienvenido, {currentUser?.nombre || currentUser?.email}
        </Typography>
        
        <StyledDivider />

        <DescriptionText variant="body1">
          Has ingresado al sistema de gestión académica. 
          Aquí podrás consultar tus cursos asignados, registrar asistencia y subir calificaciones.
        </DescriptionText>

        <ActionStack direction="row" spacing={2}>
          <ActionButton 
            variant="outlined" 
            startIcon={<ClassIcon />}
          >
            Mis Cursos
          </ActionButton>
          <ActionButton 
            variant="outlined" 
            startIcon={<AssignmentIndIcon />}
          >
            Mi Carga Académica
          </ActionButton>
        </ActionStack>
        
        <CaptionText variant="caption" display="block">
          Módulo en desarrollo - Funcionalidades de aula próximamente disponibles.
        </CaptionText>
      </StyledPaper>
    </DashboardContainer>
  );
};
