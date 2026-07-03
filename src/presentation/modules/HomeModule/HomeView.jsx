import { Navigate } from 'react-router-dom';
import { useHomeViewModel } from './hooks/useHomeViewModel';
import { HomeContainer, WelcomeTitle, Subtitle, LoginButton } from './HomeView.styles';

// VIEW PATTERN
// renderiza la vista de homeview
export const HomeView = () => {
  const { currentUser, handleGoToLogin } = useHomeViewModel();

  if (currentUser) return <Navigate to="/" replace />;

  return (
    <HomeContainer>
      <WelcomeTitle variant="h2">Sistema de Gestión Escolar</WelcomeTitle>
      <Subtitle variant="h5">Bienvenido a la plataforma educativa. Por favor inicia sesión para continuar.</Subtitle>
      <LoginButton variant="contained" color="primary" onClick={handleGoToLogin}>
        Ingresar al Sistema
      </LoginButton>
    </HomeContainer>
  );
};
