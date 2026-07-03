import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../application/context/AuthContext';

// CUSTOM HOOK
// maneja la lógica de homeviewmodel
export const useHomeViewModel = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return {
    currentUser,
    handleGoToLogin
  };
};
