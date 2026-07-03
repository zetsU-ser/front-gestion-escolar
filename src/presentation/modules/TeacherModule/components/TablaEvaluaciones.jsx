import { 
  Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress 
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { calcularPromedio } from '../../../../application/utils/promediosUtil';
import { ButtonContainer } from '../ProfesorDashboard.styles';
import { 
  EvaluacionesTableContainer, HeaderBox, HeaderRow, HeaderCell, 
  RutCell, NombreCell, NotaTextField, SaveButton 
} from './TablaEvaluaciones.styles';

const handleNotaInput = (onChange) => (e) => {
  let val = e.target.value;
  if (!/^[0-7]*\.?[0-9]*$/.test(val)) return;
  onChange(val);
};

// VIEW PATTERN
// renderiza la vista de tablaevaluaciones
export const TablaEvaluaciones = ({ 
  alumnosCurso, 
  estadoNotas, 
  handleNotaChange, 
  handleGuardar, 
  loadingGuardar 
}) => {
  return (
    <>
      <EvaluacionesTableContainer component={Paper}>
        <HeaderBox>
          <Typography variant="h6">Listado de Alumnos</Typography>
        </HeaderBox>
        <Table>
          <TableHead>
            <HeaderRow>
              <HeaderCell>RUT</HeaderCell>
              <HeaderCell>Alumno</HeaderCell>
              <HeaderCell>Evaluación 1</HeaderCell>
              <HeaderCell>Evaluación 2</HeaderCell>
              <HeaderCell>Evaluación 3</HeaderCell>
              <HeaderCell align="center">Promedio Final</HeaderCell>
            </HeaderRow>
          </TableHead>
          <TableBody>
            {alumnosCurso.map(alumno => {
              const notas = estadoNotas[alumno.id] || { nota1: '', nota2: '', nota3: '' };
              const promedio = calcularPromedio([notas.nota1, notas.nota2, notas.nota3]);
              const isReprobado = promedio < 4.0 && promedio !== '-';
              
              return (
                <TableRow key={alumno.id} hover>
                  <RutCell>{alumno.rut}</RutCell>
                  <NombreCell>{alumno.nombre} {alumno.apellido}</NombreCell>
                  {[1, 2, 3].map(n => (
                    <TableCell key={n}>
                      <NotaTextField
                        size="small"
                        value={notas[`nota${n}`]}
                        onChange={handleNotaInput((val) => handleNotaChange(alumno.id, `nota${n}`, val))}
                        disabled={loadingGuardar}
                        placeholder="e.g. 7.0"
                        slotProps={{ htmlInput: { inputMode: 'decimal', maxLength: 3 } }}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <Typography fontWeight="bold" color={isReprobado ? 'error.main' : 'primary.main'}>
                      {promedio}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </EvaluacionesTableContainer>

      <ButtonContainer>
        <SaveButton 
          variant="contained" startIcon={loadingGuardar ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} 
          onClick={handleGuardar} disabled={loadingGuardar} color="primary" 
        >
          Guardar Evaluaciones
        </SaveButton>
      </ButtonContainer>
    </>
  );
};
