import { useState, useEffect } from 'react';
import { cursoRepository } from '../../infrastructure/repositories/HttpCursosRepository';

/**
 * HOOK: useCursos
 * Centraliza la lógica de interacción con el microservicio de gestión académica 
 * para la entidad "Curso".
 */
export const useCursos = () => {
  // --- ESTADOS ---
  
  // Lista de cursos obtenidos del servidor
  const [cursos, setCursos] = useState([]);
  
  // Estado de carga para controlar spinners o skeletons en la UI
  const [loading, setLoading] = useState(true);

  /**
   * Obtiene la lista actualizada de cursos.
   */
  const cargarCursos = async () => {
    setLoading(true);
    try {
      const data = await cursoRepository.getAll();
      // Aseguramos que 'cursos' siempre sea un array para evitar errores de .map()
      setCursos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando cursos:", error);
      setCursos([]);
    } finally {
      setLoading(false);
    }
  };

  // Carga automática al montar el componente que use este hook
  useEffect(() => {
    cargarCursos();
  }, []);

  /**
   * Crea un nuevo curso y refresca la lista local.
   */
  const crear = async (curso) => {
    await cursoRepository.create(curso);
    await cargarCursos(); // Sincronización post-creación
  };

  /**
   * Elimina un curso por su ID.
   */
  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      await cursoRepository.delete(id);
      await cargarCursos(); // Sincronización post-eliminación
    }
  };

  return { cursos, loading, crear, eliminar, cargarCursos };
};
