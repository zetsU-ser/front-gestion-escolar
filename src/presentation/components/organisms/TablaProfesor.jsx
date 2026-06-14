import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { DetailWrapper, HeaderBox, StyledTableHeadRow, HeaderCell } from './TablaProfesor.styles';

/**
 * Organismo: TablaProfesor
 * Estructura base para las tablas del docente (Asistencia, Evaluaciones, etc).
 * Asegura el estilo de cabecera azul superior para coherencia de diseño.
 */
export const TablaProfesor = ({
  titulo = "Listado de Alumnos",
  headers = [],
  children,
  isEmpty = false,
  colSpanEmpty = 4
}) => {
  return (
    <DetailWrapper component={Paper} elevation={3}>
      <HeaderBox>
        <Typography variant="h6">
          {titulo}
        </Typography>
      </HeaderBox>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            {headers.map((header, index) => (
              <HeaderCell key={index}>
                {header}
              </HeaderCell>
            ))}
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell colSpan={colSpanEmpty} align="center">
                No hay registros disponibles.
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </DetailWrapper>
  );
};
