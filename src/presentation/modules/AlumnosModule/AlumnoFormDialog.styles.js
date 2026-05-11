import { styled } from '@mui/material/styles';
import { DialogTitle, DialogActions, Button } from '@mui/material';

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));
