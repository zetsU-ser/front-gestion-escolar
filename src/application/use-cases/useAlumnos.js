import { useState, useEffect } from 'react';
import { alumnoRepository } from '../../infrastructure/repositories/HttpAlumnoRepository';

/**
 * HOOK: useAlumnos
 * Gestiona el estado y las operaciones de los estudiantes.
 * Interactúa directamente con el Microservicio de Gestión Académica.
 */
export const useAlumnos = () => {
  // --- ESTADOS ---
  
  // Lista de estudiantes registrados en el sistema
  const [alumnos, setAlumnos] = useState([]);
  
  // Control de estado de carga para feedback visual en la tabla
  const [loading, setLoading] = useState(true);
  
  // Captura de errores de comunicación con el backend
  const [error, setError] = useState(null);

  /**
   * Recupera la lista de alumnos desde el servidor.
   */
  const cargarAlumnos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await alumnoRepository.getAll();
      // Garantizamos que 'alumnos' sea un array para prevenir errores de renderizado
      setAlumnos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fallo al obtener alumnos:", err);
      setError('No se pudo conectar con el servicio de gestión académica.');
      setAlumnos([]); 
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial automática
  useEffect(() => {
    cargarAlumnos();
  }, []);

  /**
   * Persiste un nuevo alumno.
   */
  const crear = async (alumno) => {
    await alumnoRepository.create(alumno);
    await cargarAlumnos(); // Refresco reactivo
  };

  /**
   * Actualiza los datos de un alumno existente.
   */
  const actualizar = async (id, alumno) => {
    await alumnoRepository.update(id, alumno);
    await cargarAlumnos();
  };

  /**
   * Elimina un registro de alumno.
   */
  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar la ficha de este alumno?")) {
      await alumnoRepository.delete(id);
      await cargarAlumnos();
    }
  };

  return { alumnos, loading, error, crear, actualizar, eliminar, cargarAlumnos };
};
