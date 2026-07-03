import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLoginViewModel } from './hooks/useLoginViewModel';
import {
  LoginPaper, StyledAvatar, TitleText, SubtitleText, StyledAlert,
  FormBox, SubmitButton, FooterText, StyledContainer, StyledTextField,
  LoadingSpinner, BackButton
} from './LoginForm.styles';

// VIEW PATTERN
// renderiza la vista de loginform
export const LoginForm = () => {
  const {
    email, setEmail, password, setPassword,
    loading, error, handleSubmit, navigate
  } = useLoginViewModel();

  return (
    <StyledContainer component="main" maxWidth="xs">
      <BackButton startIcon={<ArrowBackIcon />} onClick={() => navigate('/home')}>Volver</BackButton>
      
      <LoginPaper elevation={10}>
        <StyledAvatar><LockOutlinedIcon fontSize="large" /></StyledAvatar>
        <TitleText component="h1" variant="h4">Bienvenido</TitleText>
        <SubtitleText variant="body2" color="textSecondary">Ingresa tus credenciales institucionales</SubtitleText>

        {error && <StyledAlert severity="error">{error}</StyledAlert>}

        <FormBox component="form" onSubmit={handleSubmit} noValidate>
          <StyledTextField margin="normal" required fullWidth id="email" label="Correo Electrónico" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          <StyledTextField margin="normal" required fullWidth name="password" label="Contraseña" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          <SubmitButton type="submit" fullWidth variant="contained" size="large" disabled={loading}>
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
