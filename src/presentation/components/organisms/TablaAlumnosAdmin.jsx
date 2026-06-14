import React, { useState } from 'react';
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
} from './TablaAlumnosAdmin.styles';
import { GrupoFilasAlumnos } from '../molecules/GrupoFilasAlumnos';

// define el componente TablaAlumnosAdmin para cruzar y mostrar datos de alumnos
export const TablaAlumnosAdmin = ({ alumnos = [], cursos = [], asignaciones = [] }) => {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({ // estado para manejar el despliegue de las listas
    basica: true,
    media: true,
    otros: false
  });

  const toggleSeccion = (seccion) => { // función para alternar estado abierto/cerrado
    setSeccionesAbiertas(prev => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  const alumnosBasica = []; // inicializa arreglos vacíos para agrupar alumnos
  const alumnosMedia = [];
  const alumnosOtros = [];

  alumnos.forEach(alumno => { // recorre a los alumnos para clasificarlos
    const asignacion = asignaciones.find(a => a.alumno?.id === alumno.id); // busca si el alumno tiene asignación
    const curso = asignacion ? cursos.find(c => c.id === asignacion.curso?.id) : null; // recupera el curso asignado
    alumno.cursoObj = curso; // inyecta el objeto curso entero en el alumno

    if (curso) {
      if (curso.nivel?.toLowerCase().includes('básico') || curso.nivel?.toLowerCase().includes('basico')) {
        alumnosBasica.push(alumno); // si es básico, lo envía al grupo de básica
      } else if (curso.nivel?.toLowerCase().includes('medio')) {
        alumnosMedia.push(alumno); // si es medio, lo envía al grupo de media
      } else {
        alumnosOtros.push(alumno); // cualquier otra cosa, a otros
      }
    } else {
      alumnosOtros.push(alumno); // si no tiene curso, a otros
    }
  });

  return (
    <DetailWrapper component={Paper}>
      <HeaderBox>
        <Typography variant="h6">Distribución de Alumnos Matriculados</Typography>
      </HeaderBox>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <HeaderCell>Nombre del Alumno</HeaderCell>
            <HeaderCell>RUT</HeaderCell>
            <HeaderCell>Curso Asignado</HeaderCell>
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {/* SECCIÓN BÁSICA */}
          <GrupoFilasAlumnos 
            titulo="Educación Básica" 
            alumnos={alumnosBasica} 
            isAbierto={seccionesAbiertas.basica} 
            onToggle={() => toggleSeccion('basica')} 
          />

          {/* SECCIÓN MEDIA */}
          <GrupoFilasAlumnos 
            titulo="Educación Media" 
            alumnos={alumnosMedia} 
            isAbierto={seccionesAbiertas.media} 
            onToggle={() => toggleSeccion('media')} 
          />

          {/* SECCIÓN OTROS / SIN ASIGNAR */}
          <GrupoFilasAlumnos 
            titulo="Otros Niveles / Sin Asignar" 
            alumnos={alumnosOtros} 
            isAbierto={seccionesAbiertas.otros} 
            onToggle={() => toggleSeccion('otros')} 
          />
        </TableBody>
      </Table>
    </DetailWrapper>
  );
};
