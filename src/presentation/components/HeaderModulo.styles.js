import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  gap: theme.spacing(3),
  width: '100%',
}));

export const TitleActionBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  flex: 1,
}));

export const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textAlign: 'left',
}));

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  flexShrink: 0,
  justifyContent: 'flex-end',
}));

export const UserDetailsBox = styled(Box)(({ theme }) => ({
  textAlign: 'right',
}));

export const RoleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  lineHeight: 1.2,
  textTransform: 'capitalize',
}));
