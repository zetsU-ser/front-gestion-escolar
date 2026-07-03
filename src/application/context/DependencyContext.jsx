import React, { createContext, useContext } from 'react';
import { alumnoRepository } from '../../infrastructure/repositories/HttpAlumnoRepository';
import { asignaturaRepository } from '../../infrastructure/repositories/HttpAsignaturaRepository';
import { asistenciaRepository } from '../../infrastructure/repositories/HttpAsistenciaRepository';
import { authRepository } from '../../infrastructure/repositories/HttpAuthRepository';
import { calificacionRepository } from '../../infrastructure/repositories/HttpCalificacionRepository';
import { cargaAcademicaRepository } from '../../infrastructure/repositories/HttpCargaAcademicaRepository';
import { cursoRepository, alumnoCursoRepository } from '../../infrastructure/repositories/HttpCursosRepository';
import { mensajeRepository } from '../../infrastructure/repositories/HttpMensajeRepository';
import { usuarioRepository } from '../../infrastructure/repositories/HttpUsuarioRepository';

const DependencyContext = createContext();

export const DependencyProvider = ({ children }) => {
  const dependencies = {
    alumnoRepository,
    asignaturaRepository,
    asistenciaRepository,
    authRepository,
    calificacionRepository,
    cargaAcademicaRepository,
    cursoRepository,
    alumnoCursoRepository,
    mensajeRepository,
    usuarioRepository,
  };

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useDependencies = () => {
  const context = useContext(DependencyContext);
  if (!context) {
    throw new Error('useDependencies debe ser usado dentro de un DependencyProvider');
  }
  return context;
};
