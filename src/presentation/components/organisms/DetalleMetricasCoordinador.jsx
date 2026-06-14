import React from 'react';
import { TablaPersonalAdmin } from './TablaPersonalAdmin';
import { TablaCursosAdmin } from './TablaCursosAdmin';
import { TablaAlumnosAdmin } from './TablaAlumnosAdmin';

// define el componente orquestador que decide qué tabla mostrar para el coordinador
export const DetalleMetricasCoordinador = ({ metricaId, docentes = [], cursos = [], alumnos = [], asignaciones = [] }) => {
  if (!metricaId) return null; // si no hay métrica seleccionada, oculta la vista

  switch (metricaId) { // revisa qué métrica fue seleccionada
    case 'docentes': 
      return <TablaPersonalAdmin usuarios={docentes} titulo="Detalle de Docentes Activos" />;
    
    case 'cursos': 
      return <TablaCursosAdmin cursos={cursos} asignaciones={asignaciones} />;
    
    case 'alumnos': 
      return <TablaAlumnosAdmin alumnos={alumnos} cursos={cursos} />;
      
    default: 
      return null;
  }
};
