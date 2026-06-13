import React from 'react'; // importa la librería React
import { Chip, IconButton } from '@mui/material'; // importa componentes de UI de Material
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // importa ícono de flecha hacia abajo
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'; // importa ícono de flecha hacia arriba

import {
  SeparatorRow,
  SeparatorCell,
  SeparatorContent,
  SeparatorTitleBox,
  SeparatorTitle
} from './FilaSeparadora.styles';

// define el componente FilaSeparadora y sus propiedades
export const FilaSeparadora = ({ titulo, cantidad, colSpan, isAbierto, onClick }) => {
  if (cantidad === 0) return null; // si no hay registros, no renderiza nada

  return (
    <SeparatorRow onClick={onClick}> {/* ejecuta la función onClick al presionar la fila */}
      <SeparatorCell colSpan={colSpan} isAbierto={isAbierto}> {/* la celda abarca múltiples columnas */}
        <SeparatorContent>
          <SeparatorTitleBox>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              {isAbierto ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} {/* cambia el ícono si está abierto o cerrado */}
            </IconButton>
            <SeparatorTitle variant="subtitle2">
              {titulo}
            </SeparatorTitle>
          </SeparatorTitleBox>
          <Chip 
            label={`${cantidad} Registros`} 
            size="small" 
            color="primary" 
            variant="outlined" 
            sx={{ fontWeight: 'bold', bgcolor: 'white' }} 
          />
        </SeparatorContent>
      </SeparatorCell>
    </SeparatorRow>
  );
};
