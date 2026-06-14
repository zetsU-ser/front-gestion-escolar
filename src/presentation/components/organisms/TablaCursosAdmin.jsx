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
} from './TablaCursosAdmin.styles';
import { GrupoFilasCursos } from '../molecules/GrupoFilasCursos';

// define el componente TablaCursosAdmin para mostrar los cursos agrupados
export const TablaCursosAdmin = ({ cursos = [], asignaciones = [] }) => {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({ // guarda el estado de los bloques desplegables
    basica: true,
    media: true,
    otros: false
  });

  const toggleSeccion = (seccion) => { // función para abrir o cerrar un bloque
    setSeccionesAbiertas(prev => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  const cursosBasica = cursos.filter(c => c.nivel?.toLowerCase().includes('básico') || c.nivel?.toLowerCase().includes('basico')); // filtra cursos básicos
  const cursosMedia = cursos.filter(c => c.nivel?.toLowerCase().includes('medio')); // filtra cursos medios
  const cursosOtros = cursos.filter(c => !c.nivel?.toLowerCase().includes('básico') && !c.nivel?.toLowerCase().includes('basico') && !c.nivel?.toLowerCase().includes('medio')); // agrupa el resto de cursos

  const countAlumnos = (cursoId) => asignaciones.filter(asig => asig.curso && asig.curso.id === cursoId).length; // cuenta alumnos por curso

  return (
    <DetailWrapper component={Paper}>
      <HeaderBox>
        <Typography variant="h6">Desglose de Cursos Registrados</Typography>
      </HeaderBox>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <HeaderCell>Nombre del Curso</HeaderCell>
            <HeaderCell align="right">Estudiantes Matriculados</HeaderCell>
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          {/* SECCIÓN BÁSICA */}
          <GrupoFilasCursos 
            titulo="Educación Básica" 
            cursos={cursosBasica} 
            countAlumnos={countAlumnos} 
            isAbierto={seccionesAbiertas.basica} 
            onToggle={() => toggleSeccion('basica')} 
          />

          {/* SECCIÓN MEDIA */}
          <GrupoFilasCursos 
            titulo="Educación Media" 
            cursos={cursosMedia} 
            countAlumnos={countAlumnos} 
            isAbierto={seccionesAbiertas.media} 
            onToggle={() => toggleSeccion('media')} 
          />

          {/* SECCIÓN OTROS */}
          <GrupoFilasCursos 
            titulo="Otros Niveles" 
            cursos={cursosOtros} 
            countAlumnos={countAlumnos} 
            isAbierto={seccionesAbiertas.otros} 
            onToggle={() => toggleSeccion('otros')} 
          />
        </TableBody>
      </Table>
    </DetailWrapper>
  );
};
