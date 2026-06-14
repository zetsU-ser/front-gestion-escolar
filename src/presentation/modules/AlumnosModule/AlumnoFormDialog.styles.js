import { styled } from '@mui/material/styles';
import { DialogTitle, DialogActions, Button, Dialog, DialogContent, TextField, Stack } from '@mui/material';

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

export const StyledDialog = styled(Dialog)(({ theme }) => ({
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
}));

export const StyledButton = styled(Button)(({ theme }) => ({
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
}));
