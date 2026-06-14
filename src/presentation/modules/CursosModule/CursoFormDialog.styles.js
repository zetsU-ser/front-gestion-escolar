import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
}));
