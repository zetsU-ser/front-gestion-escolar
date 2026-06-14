import { useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from '../../../application/context/AuthContext';

import {
  HomeContainer,
  WelcomeTitle,
  Subtitle,
  LoginButton
} from './HomeView.styles';

export const HomeView = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Si ya está autenticado, no debería ver el home, sino su dashboard
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <HomeContainer>
      <WelcomeTitle variant="h2">
        Sistema de Gestión Escolar
      </WelcomeTitle>
      <Subtitle variant="h5">
        Bienvenido a la plataforma educativa. Por favor inicia sesión para continuar.
      </Subtitle>
      <LoginButton 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/login')}
      >
        Ingresar al Sistema
      </LoginButton>
    </HomeContainer>
  );
};
