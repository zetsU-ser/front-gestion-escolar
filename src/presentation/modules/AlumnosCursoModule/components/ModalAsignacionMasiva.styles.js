import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const EmptyTypography = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
}));
