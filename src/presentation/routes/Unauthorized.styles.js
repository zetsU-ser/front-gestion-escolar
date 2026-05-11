import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

export const UnauthorizedContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const HomeButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
