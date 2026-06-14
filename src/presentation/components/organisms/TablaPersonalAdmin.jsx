import React from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableHead
} from '@mui/material';

import {
  DetailWrapper,
  HeaderBox,
  StyledTableHeadRow,
  HeaderCell
} from './TablaPersonalAdmin.styles';
import { FilaPersonal } from '../molecules/FilaPersonal';

// define el componente TablaPersonalAdmin para mostrar los usuarios
export const TablaPersonalAdmin = ({ usuarios = [], titulo = "Detalle de Personal Registrado" }) => {
  const personal = usuarios.filter(u => u.rol !== 'ALUMNO'); // excluye a los alumnos de la lista

  return (
    <DetailWrapper component={Paper}>
      <HeaderBox>
        <Typography variant="h6">{titulo}</Typography>
      </HeaderBox>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <HeaderCell>Nombre Completo</HeaderCell>
            <HeaderCell>Rol</HeaderCell>
            <HeaderCell>Especificación</HeaderCell>
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {personal.map(p => ( // mapea los usuarios filtrados y renderiza una fila por cada uno
            <FilaPersonal key={p.id} usuario={p} />
          ))}
        </TableBody>
      </Table>
    </DetailWrapper>
  );
};
