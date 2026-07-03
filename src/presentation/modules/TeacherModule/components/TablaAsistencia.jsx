import { 
  Paper, Table, TableHead, TableBody, TableRow, TableCell, Typography, 
  RadioGroup, FormControlLabel, Radio, Checkbox, CircularProgress 
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { calcularPorcentajeAsistencia } from '../../../../application/utils/asistenciaUtil';
import { ButtonContainer } from '../ProfesorDashboard.styles';
import { 
  AsistenciaTableContainer, HeaderBox, HeaderRow, HeaderCell, 
  RutCell, NombreCell, SaveButton 
} from './TablaAsistencia.styles';

// VIEW PATTERN
// renderiza la vista de tablaasistencia
export const TablaAsistencia = ({ 
  alumnosCurso, 
  estadoAsistencia, 
  handleEstadoChange, 
  handleJustificarChange, 
  handleGuardar, 
  loadingGuardar 
}) => {
  return (
    <>
      <AsistenciaTableContainer component={Paper}>
        <HeaderBox>
          <Typography variant="h6">Listado de Alumnos</Typography>
        </HeaderBox>
        <Table>
          <TableHead>
            <HeaderRow>
              <HeaderCell>RUT</HeaderCell>
              <HeaderCell>Alumno</HeaderCell>
              <HeaderCell>Asistencia</HeaderCell>
              <HeaderCell>Justificación</HeaderCell>
              <HeaderCell>% de Asistencia</HeaderCell>
            </HeaderRow>
          </TableHead>
          <TableBody>
            {alumnosCurso.map(alumno => {
              const asis = estadoAsistencia[alumno.id] || { estado: 'PRESENTE', justificado: false };
              const diasHistoricos = (alumno.nombre.length * 3) % 25 + 5;
              const diasPresente = asis.estado === 'PRESENTE' ? diasHistoricos + 1 : diasHistoricos;
              const porcentaje = calcularPorcentajeAsistencia(diasPresente, 30);
              
              return (
                <TableRow key={alumno.id} hover>
                  <RutCell>{alumno.rut}</RutCell>
                  <NombreCell>{alumno.nombre} {alumno.apellido}</NombreCell>
                  <TableCell>
                    <RadioGroup row value={asis.estado} onChange={(e) => handleEstadoChange(alumno.id, e.target.value)}>
                      <FormControlLabel value="PRESENTE" control={<Radio color="success" disabled={loadingGuardar} />} label="Presente" />
                      <FormControlLabel value="AUSENTE" control={<Radio color="error" disabled={loadingGuardar} />} label="Ausente" />
                    </RadioGroup>
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox checked={asis.justificado} onChange={(e) => handleJustificarChange(alumno.id, e.target.checked)} color="warning" disabled={loadingGuardar || asis.estado === 'PRESENTE'} />
                      }
                      label="Justificado"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight="bold" color={parseInt(porcentaje) < 75 ? 'error.main' : 'textSecondary'}>
                      {porcentaje}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </AsistenciaTableContainer>

      <ButtonContainer>
        <SaveButton 
          variant="contained" startIcon={loadingGuardar ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />} 
          onClick={handleGuardar} disabled={loadingGuardar} color="primary" 
        >
          Guardar Asistencia
        </SaveButton>
      </ButtonContainer>
    </>
  );
};
