import { styled } from '@mui/material/styles';
import { Box, Button, Paper, Typography, Stack, TableContainer, TableHead, TableCell, Divider, Table, TableRow, TableBody } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const HeaderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  marginBottom: theme.spacing(4),
}));

export const HeaderStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const TablePaper = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
}));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const WhiteTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

export const EmptyRowCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const EnrollButton = styled(Button)(({ theme }) => ({
}));

export const TitleBox = styled(Box)(({ theme }) => ({
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));
