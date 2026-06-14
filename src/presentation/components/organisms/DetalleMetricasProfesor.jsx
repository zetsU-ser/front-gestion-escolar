import React from 'react';
import { TablaHorario } from './TablaHorario';
import { FiltroSeleccionCurso } from './FiltroSeleccionCurso';
import { Paper, Typography, Box } from '@mui/material';

// define el componente orquestador que decide qué mostrar en el panel de profesor
export const DetalleMetricasProfesor = ({ 
  metricaId, 
  miHorario, 
  getDisplayData,
  cursosOpciones,
  asignaturasOpciones,
  cursoSeleccionado,
  asignaturaSeleccionada,
  onCursoChange,
  onAsignaturaChange
}) => {
  if (!metricaId) return null; // si no hay métrica seleccionada, oculta la vista

  switch (metricaId) {
    case 'horario': 
      return (
        <Box>
          <FiltroSeleccionCurso
            cursosOpciones={cursosOpciones}
            asignaturasOpciones={asignaturasOpciones}
            cursoSeleccionado={cursoSeleccionado}
            asignaturaSeleccionada={asignaturaSeleccionada}
            onCursoChange={onCursoChange}
            onAsignaturaChange={onAsignaturaChange}
          />
          <TablaHorario
            horarioData={miHorario}
            getDisplayData={getDisplayData}
          />
        </Box>
      );
    
    case 'cursos': 
      return (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Mis Cursos Asignados</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Tienes {cursosOpciones.length} curso(s) asignado(s) en tu carga académica.
          </Typography>
        </Paper>
      );
    
    case 'asignaturas': 
      return (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h6" color="primary">Mis Asignaturas</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Estás dictando {asignaturasOpciones.length} asignatura(s) distintas.
          </Typography>
        </Paper>
      );
      
    default: 
      return null;
  }
};
