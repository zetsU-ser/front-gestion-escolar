import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Divider, Stack, Button, CircularProgress, TableContainer, Table, TableCell, TableRow } from '@mui/material';

export const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  minHeight: '80vh',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: theme.shape.borderRadius * 2,
  textAlign: 'center',
  maxWidth: 600,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

export const DescriptionText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ActionStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  textTransform: 'none',
}));

export const CaptionText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
  color: theme.palette.text.disabled,
}));

export const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(5),
  alignItems: 'center',
  height: '50vh',
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
}));

export const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
}));

export const EmptyStateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const EmptyStatePaper = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'transparent',
  boxShadow: 'none',
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

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 800,
}));

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
}));

export const BloqueHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  width: '15%',
}));

export const DiaHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  width: '17%',
  textAlign: 'center',
}));

export const BloqueLabelCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[100],
}));

export const EmptyCargaCell = styled(TableCell)(({ theme }) => ({
  borderRight: '1px solid #eee',
}));

export const CargaCell = styled(TableCell)(({ theme }) => ({
  borderRight: '1px solid #eee',
  backgroundColor: '#e3f2fd',
  padding: theme.spacing(1),
}));

export const CargaBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: '80px',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));
