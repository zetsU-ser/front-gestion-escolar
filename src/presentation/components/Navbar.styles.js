import { styled } from '@mui/material/styles';
import { AppBar, Typography, Box, Button, ListItemIcon, ListItemText, Drawer, Divider, List, ListItemButton } from '@mui/material';

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

export const AppContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
}));

export const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== '$drawerWidth'
})(({ theme, $drawerWidth }) => ({
  width: $drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: $drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(0, 0, 0, 0.08)',
  },
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const SidebarDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

export const NavList = styled(List)(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const NavIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const NavText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightMedium,
}));

export const LogoutList = styled(List)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(4),
}));

export const LogoutListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  color: theme.palette.text.secondary,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(211, 47, 47, 0.08)',
    color: theme.palette.error.main,
    transform: 'translateX(4px)',
  },
  '&:hover .MuiListItemIcon-root': {
    color: theme.palette.error.main,
  }
}));

export const LogoutIconWrapper = styled(ListItemIcon)(({ theme }) => ({
  color: 'inherit',
  minWidth: 40,
  transition: 'color 0.2s ease-in-out',
}));

export const LogoutText = styled(ListItemText)(({ theme }) => ({
  '& .MuiTypography-root': {
    fontWeight: theme.typography.fontWeightMedium,
  }
}));

export const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
}));
