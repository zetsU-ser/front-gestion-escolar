import { useState, useEffect } from 'react';
import { alumnoCursoRepository } from '../../infrastructure/repositories/HttpCursosRepository';

export const useAsignacionesAlumnos = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarAsignaciones = async () => {
    setLoading(true);
    try {
      const data = await alumnoCursoRepository.getAll();
      setAsignaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando asignaciones:", error);
      setAsignaciones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAsignaciones();
  }, []);

  return { asignaciones, loading, cargarAsignaciones };
};
