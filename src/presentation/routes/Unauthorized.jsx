import { useNavigate } from 'react-router-dom';
import { 
  UnauthorizedContainer, 
  ErrorText, 
  MessageText, 
  HomeButton 
} from './Unauthorized.styles';

export const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <UnauthorizedContainer>
      <ErrorText variant="h3">No autorizado</ErrorText>
      <MessageText variant="body1">No tienes los permisos necesarios para ver esta página.</MessageText>
      <HomeButton variant="contained" onClick={() => navigate('/')}>Volver al Inicio</HomeButton>
    </UnauthorizedContainer>
  );
};
