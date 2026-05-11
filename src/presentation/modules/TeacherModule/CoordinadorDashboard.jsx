import { Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import { useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  DashboardContainer, 
  DashboardPaper, 
  TitleText, 
  EmailText, 
  StyledDivider, 
  DescriptionText, 
  ActionStack, 
  ActionButton, 
  PrimaryButton 
} from './CoordinadorDashboard.styles';

export const CoordinadorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

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

        <DescriptionText variant="body1">
          Bienvenido al centro de planificación. Como coordinador, tienes la responsabilidad
          de estructurar los niveles académicos y asegurar que cada estudiante esté
          correctamente matriculado en su curso.
        </DescriptionText>

        <ActionStack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <PrimaryButton
            variant="contained"
            size="large"
            startIcon={<PeopleIcon />}
            onClick={() => navigate('/alumnos')}
          >
            Fichas de Alumnos
          </PrimaryButton>
          <ActionButton
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/cursos')}
          >
            Configurar Cursos
          </ActionButton>
        </ActionStack>
      </DashboardPaper>
    </DashboardContainer>
  );
};
