import { useState, useEffect } from 'react';
import { alumnoCursoRepository, cursoRepository } from '../../infrastructure/repositories/HttpCursosRepository';

// define el hook custom para manejar la lógica de alumnos por curso
export const useAlumnosCurso = (cursoId) => {
  const [curso, setCurso] = useState(null); // almacena la información del curso actual
  const [asignaciones, setAsignaciones] = useState([]); // almacena los alumnos matriculados en este curso
  const [loading, setLoading] = useState(true); // indica el estado de carga

  // carga los datos del curso y sus asignaciones desde el backend
  const cargarDatos = async () => {
    setLoading(true);
    try {
      const cursos = await cursoRepository.getAll();
      const current = cursos.find(c => c.id === parseInt(cursoId));
      setCurso(current);

      const lista = await alumnoCursoRepository.getByCurso(cursoId);
      setAsignaciones(Array.isArray(lista) ? lista : []);
    } catch (err) {
      console.error("Error al cargar datos del curso:", err);
    } finally {
      setLoading(false);
    }
  };

  // ejecuta la carga de datos cada vez que cambia el cursoId
  useEffect(() => {
    if (cursoId) {
      cargarDatos();
    }
  }, [cursoId]);

  // asigna un alumno específico al curso actual
  const asignarAlumno = async (alumnoId) => {
    await alumnoCursoRepository.asignar({
      alumno: { id: alumnoId },
      curso: { id: parseInt(cursoId) }
    });
    await cargarDatos(); // recarga los datos después de asignar
  };

  // elimina la vinculación de un alumno con el curso
  const desvincularAlumno = async (id) => {
    if (window.confirm("¿Deseas quitar al alumno de este curso?")) {
      await alumnoCursoRepository.desvincular(id);
      await cargarDatos(); // recarga los datos después de desvincular
    }
  };

  return { 
    curso, 
    asignaciones, 
    loading, 
    asignarAlumno, 
    desvincularAlumno 
  };
};
