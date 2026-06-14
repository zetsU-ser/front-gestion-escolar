import React from 'react';
import { TablaPersonalAdmin } from './TablaPersonalAdmin';
import { TablaCursosAdmin } from './TablaCursosAdmin';
import { TablaAlumnosAdmin } from './TablaAlumnosAdmin';

// define el componente orquestador que decide qué tabla mostrar
export const DetalleMetricasAdmin = ({ metricaId, usuarios = [], cursos = [], alumnos = [], asignaciones = [] }) => {
  if (!metricaId) return null; // si no hay métrica seleccionada, oculta la vista

  switch (metricaId) { // revisa qué métrica fue seleccionada
    case 'personal': 
      return <TablaPersonalAdmin usuarios={usuarios} />;
    
    case 'cursos': 
      return <TablaCursosAdmin cursos={cursos} asignaciones={asignaciones} />;
    
    case 'alumnos': 
      return <TablaAlumnosAdmin alumnos={alumnos} cursos={cursos} asignaciones={asignaciones} />;
      
    default: 
      return null;
  }
};
