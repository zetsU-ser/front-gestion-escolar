import React from 'react';
import { Box, TableRow, TableCell } from '@mui/material';
import { VistaHorario } from './VistaHorario';
import { TablaProfesor } from './TablaProfesor';

// define el componente orquestador que decide qué mostrar en el panel de profesor
export const DetalleMetricasProfesor = ({ 
  metricaId, 
  miHorario, 
  getDisplayData,
  cursos,
  asignaciones = []
}) => {
  if (!metricaId) return null; // si no hay métrica seleccionada, oculta la vista

  const countAlumnos = (cursoId) => asignaciones.filter(asig => asig.curso && asig.curso.id === cursoId).length;

  switch (metricaId) {
    case 'horario': 
      return (
        <Box>
          <VistaHorario
            cargasCurso={miHorario}
            getDisplayData={getDisplayData}
            titulo="Horario docente"
          />
        </Box>
      );
    
    case 'cursos': 
      return (
        <TablaProfesor 
          titulo="Mis Cursos" 
          headers={['Nombre del Curso', 'Estudiantes Matriculados']}
          isEmpty={cursos.length === 0}
          colSpanEmpty={2}
        >
          {cursos.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.nivel} {c.letra}</TableCell>
              <TableCell>{countAlumnos(c.id)} Registros</TableCell>
            </TableRow>
          ))}
        </TablaProfesor>
      );
      
    default: 
      return null;
  }
};
