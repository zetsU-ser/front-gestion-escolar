import { styled } from '@mui/material/styles';
import { AppBar, Typography, Box, Button } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.75)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 2px 10px 0 rgba(0,0,0,0.05)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  color: theme.palette.primary.dark,
  zIndex: theme.zIndex.drawer + 1,
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 'bold',
  letterSpacing: 1.5,
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));

export const LogoSpan = styled(Box)(({ theme }) => ({
  fontWeight: 'light',
  color: theme.palette.text.secondary,
}));

export const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));

export const NavButton = styled(Button)(({ theme }) => ({
  fontWeight: '600',
  textTransform: 'none',
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  borderRadius: '12px',
  textTransform: 'none',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderWidth: 1.5,
  '&:hover': {
    borderWidth: 1.5,
  },
}));
