import { TablaProfesor } from './TablaProfesor';
import { FilaAlumno } from '../molecules/FilaAlumno';
import { TableCell, Typography } from '@mui/material';
import { SelectorEstado } from '../atoms/SelectorEstado';
import { CheckboxJustificar } from '../atoms/CheckboxJustificar';
import { calcularPorcentajeAsistencia } from '../../../application/utils/asistenciaUtil';

/**
 * Organismo: TablaAsistencia
 * Renderiza la matriz completa de asistencia de un curso utilizando estructuras reutilizables.
 */
export const TablaAsistencia = ({
  alumnos,
  estadoAsistencia, // Objeto { alumnoId: { estado, justificado } }
  onEstadoChange,
  onJustificarChange,
  disabled
}) => {
  const headers = ['RUT', 'Alumno', 'Asistencia', 'Justificación', '% de Asistencia'];

  return (
    <TablaProfesor
      titulo="Listado de Alumnos"
      headers={headers}
      isEmpty={alumnos.length === 0}
      colSpanEmpty={headers.length}
    >
      {alumnos.map(alumno => {
        const asis = estadoAsistencia[alumno.id] || { estado: 'PRESENTE', justificado: false };
        
        // Simulación: Cálculo dinámico de asistencia
        const diasHistoricos = (alumno.nombre.length * 3) % 25 + 5;
        const totalDias = 30;
        const diasPresente = asis.estado === 'PRESENTE' ? diasHistoricos + 1 : diasHistoricos;
        return (
          <FilaAlumno key={alumno.id} alumno={alumno}>
            <TableCell>
              <SelectorEstado
                value={asis.estado}
                onChange={(val) => onEstadoChange(alumno.id, val)}
                disabled={disabled}
              />
            </TableCell>
            <TableCell>
              <CheckboxJustificar
                checked={asis.justificado}
                onChange={(val) => onJustificarChange(alumno.id, val)}
                disabled={disabled || asis.estado === 'PRESENTE'}
              />
            </TableCell>
            <TableCell align="center">
              <Typography 
                fontWeight="bold" 
                color={
                  parseInt(calcularPorcentajeAsistencia(diasPresente, totalDias)) < 75 
                    ? 'error.main' 
                    : 'textSecondary'
                }
              >
                {calcularPorcentajeAsistencia(diasPresente, totalDias)}
              </Typography>
            </TableCell>
          </FilaAlumno>
        );
      })}
    </TablaProfesor>
  );
};

