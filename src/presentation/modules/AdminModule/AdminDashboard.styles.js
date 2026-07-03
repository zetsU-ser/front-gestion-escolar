import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Divider, Stack, Button, TableContainer, Table, TableCell, TableRow } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  textAlign: 'center',
  maxWidth: 700,
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const EmailText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
}));

export const ActionStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
}));

export const ManagementButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '30px',
  textTransform: 'none',
  fontSize: '1.1rem',
  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
}));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
}));

export const TableHeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderTopLeftRadius: theme.shape.borderRadius * 2,
  borderTopRightRadius: theme.shape.borderRadius * 2,
  '& .MuiTypography-root': {
    color: 'inherit',
  }
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const GroupHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  cursor: 'pointer',
}));

export const IndentedCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
}));
