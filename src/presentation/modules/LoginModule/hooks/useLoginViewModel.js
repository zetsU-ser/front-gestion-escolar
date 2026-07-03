import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useLogin } from '../../../../application/use-cases/useLogin';

// CUSTOM HOOK
// maneja la lógica de loginviewmodel
export const useLoginViewModel = () => {
  const { login, loading, error } = useLogin();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // redirige automáticamente según el rol si existe sesión activa
  useEffect(() => {
    if (currentUser && currentUser.role) {
      const role = currentUser.role.toLowerCase();
      if (role === 'admin') navigate('/admin');
      else if (role === 'coordinador') navigate('/coordinador');
      else if (role === 'docente') navigate('/profesor');
    }
  }, [currentUser, navigate]);

// ejecuta la acción asíncrona de handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error("Fallo de autenticación:", err);
    }
  };

  return {
    email, setEmail, password, setPassword,
    loading, error, handleSubmit, navigate
  };
};
