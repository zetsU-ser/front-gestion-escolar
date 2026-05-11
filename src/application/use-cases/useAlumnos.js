import { useState, useEffect } from 'react';
import { alumnoRepository } from '../../infrastructure/repositories/HttpAlumnoRepository';

export const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarAlumnos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await alumnoRepository.getAll();
      // Aseguramos formato array para renderizado
      setAlumnos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fallo al obtener alumnos:", err);
      setError('No se pudo conectar con el servicio de gestión académica.');
      setAlumnos([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAlumnos();
  }, []);

  const crear = async (alumno) => {
    await alumnoRepository.create(alumno);
    await cargarAlumnos(); // Actualizacion reactiva
  };

  const actualizar = async (id, alumno) => {
    await alumnoRepository.update(id, alumno);
    await cargarAlumnos();
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar la ficha de este alumno?")) {
      await alumnoRepository.delete(id);
      await cargarAlumnos();
    }
  };

  return { alumnos, loading, error, crear, actualizar, eliminar, cargarAlumnos };
};
