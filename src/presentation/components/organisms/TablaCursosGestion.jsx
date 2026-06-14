import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Chip
} from '@mui/material';
import { Delete as DeleteIcon, Groups as GroupsIcon } from '@mui/icons-material';
import {
  DetailWrapper,
  HeaderBox,
  StyledTableHeadRow,
  HeaderCell
} from './TablaCursosAdmin.styles';
import { FilaSeparadora } from '../molecules/FilaSeparadora';

const GrupoFilasGestion = ({ titulo, cursos = [], countAlumnos, isAbierto, onToggle, onDelete, onNavigate }) => {
  if (cursos.length === 0) return null;

  return (
    <>
      <FilaSeparadora 
        titulo={titulo} 
        cantidad={cursos.length}
        colSpan={3} 
        isAbierto={isAbierto} 
        onClick={onToggle}
      />
      
      {isAbierto && cursos.map(c => (
        <TableRow key={c.id} hover>
          <TableCell>{c.nivel} {c.letra}</TableCell>
          <TableCell sx={{ color: 'text.secondary' }}>
            <Chip label={countAlumnos(c.id)} size="small" />
          </TableCell>
          <TableCell align="right">
            <Button
              startIcon={<GroupsIcon />}
              size="small"
              variant="outlined"
              onClick={() => onNavigate(`/alumnos-curso/${c.id}`)}
              sx={{ mr: 2 }}
            >
              Ver Alumnos
            </Button>
            <IconButton color="error" onClick={() => onDelete(c.id)} size="small">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export const TablaCursosGestion = ({ cursos = [], alumnos = [], onDelete, onNavigate }) => {
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({
    basica: true,
    media: true,
    otros: true
  });

  const toggleSeccion = (seccion) => {
    setSeccionesAbiertas(prev => ({ ...prev, [seccion]: !prev[seccion] }));
  };

  const sortCursos = (cursosArray) => {
    return [...cursosArray].sort((a, b) => {
      const numA = parseInt(a.nivel) || 0;
      const numB = parseInt(b.nivel) || 0;
      if (numA !== numB) {
        return numA - numB;
      }
      const letraA = a.letra || '';
      const letraB = b.letra || '';
      return letraA.localeCompare(letraB);
    });
  };

  const cursosBasica = sortCursos(cursos.filter(c => c.nivel?.toLowerCase().includes('básico') || c.nivel?.toLowerCase().includes('basico')));
  const cursosMedia = sortCursos(cursos.filter(c => c.nivel?.toLowerCase().includes('medio')));
  const cursosOtros = sortCursos(cursos.filter(c => !c.nivel?.toLowerCase().includes('básico') && !c.nivel?.toLowerCase().includes('basico') && !c.nivel?.toLowerCase().includes('medio')));

  const countAlumnos = (cursoId) => alumnos.filter(a => a.cursoId === cursoId).length;

  if (cursos.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', width: '100%' }}>
        <Typography color="textSecondary">No hay cursos creados todavía.</Typography>
      </Paper>
    );
  }

  return (
    <DetailWrapper component={Paper} sx={{ width: '100%' }}>
      <HeaderBox>
        <Typography variant="h6">Gestión de Cursos Registrados</Typography>
      </HeaderBox>
      <Table>
        <TableHead>
          <StyledTableHeadRow>
            <HeaderCell>Nombre del Curso</HeaderCell>
            <HeaderCell>Estudiantes Matriculados</HeaderCell>
            <HeaderCell align="right">Acciones</HeaderCell>
          </StyledTableHeadRow>
        </TableHead>
        <TableBody>
          <GrupoFilasGestion 
            titulo="Educación Básica" 
            cursos={cursosBasica} 
            countAlumnos={countAlumnos}
            isAbierto={seccionesAbiertas.basica} 
            onToggle={() => toggleSeccion('basica')}
            onDelete={onDelete}
            onNavigate={onNavigate}
          />
          <GrupoFilasGestion 
            titulo="Educación Media" 
            cursos={cursosMedia} 
            countAlumnos={countAlumnos}
            isAbierto={seccionesAbiertas.media} 
            onToggle={() => toggleSeccion('media')}
            onDelete={onDelete}
            onNavigate={onNavigate}
          />
          <GrupoFilasGestion 
            titulo="Otros Niveles" 
            cursos={cursosOtros} 
            countAlumnos={countAlumnos}
            isAbierto={seccionesAbiertas.otros} 
            onToggle={() => toggleSeccion('otros')}
            onDelete={onDelete}
            onNavigate={onNavigate}
          />
        </TableBody>
      </Table>
    </DetailWrapper>
  );
};
