import { useState, useEffect } from 'react';
import { asistenciaRepository } from '../../infrastructure/repositories/HttpAsistenciaRepository';

export const useAsistencias = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarAsistencias = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await asistenciaRepository.getAll();
      setAsistencias(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fallo al obtener asistencias:", err);
      setError('No se pudo conectar con el servicio de asistencia.');
      setAsistencias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAsistencias();
  }, []);

  const crear = async (asistencia) => {
    await asistenciaRepository.create(asistencia);
    await cargarAsistencias();
  };

  const actualizar = async (id, asistencia) => {
    await asistenciaRepository.update(id, asistencia);
    await cargarAsistencias();
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta asistencia?")) {
      await asistenciaRepository.delete(id);
      await cargarAsistencias();
    }
  };

  return { asistencias, loading, error, crear, actualizar, eliminar, cargarAsistencias };
};