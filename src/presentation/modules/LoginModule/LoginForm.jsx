import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../application/context/AuthContext';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLogin } from '../../../application/use-cases/useLogin';
import {
  LoginPaper,
  StyledAvatar,
  TitleText,
  SubtitleText,
  StyledAlert,
  FormBox,
  SubmitButton,
  FooterText,
  StyledContainer,
  StyledTextField,
  LoadingSpinner,
  BackButton
} from './LoginForm.styles';

export const LoginForm = () => {
  const { login, loading, error } = useLogin();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redireccion automatica si hay sesion activa
  useEffect(() => {
    if (currentUser && currentUser.role) {
      const role = currentUser.role.toLowerCase();
      if (role === 'admin') navigate('/admin');
      else if (role === 'coordinador') navigate('/coordinador');
      else if (role === 'docente') navigate('/profesor');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error("Fallo de autenticación:", err);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <BackButton startIcon={<ArrowBackIcon />} onClick={() => navigate('/home')}>
        Volver
      </BackButton>
      <LoginPaper elevation={10}>
        <StyledAvatar>
          <LockOutlinedIcon fontSize="large" />
        </StyledAvatar>

        <TitleText component="h1" variant="h4">
          Bienvenido
        </TitleText>
        <SubtitleText variant="body2" color="textSecondary">
          Ingresa tus credenciales institucionales
        </SubtitleText>

        {error && (
          <StyledAlert severity="error">
            {error}
          </StyledAlert>
        )}

        <FormBox component="form" onSubmit={handleSubmit} noValidate>
          <StyledTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size={26} color="inherit" /> : 'Entrar al Sistema'}
          </SubmitButton>
        </FormBox>
      </LoginPaper>

      <FooterText variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} Colegio - Sistema de Gestión Académica
      </FooterText>
    </StyledContainer>
  );
};
