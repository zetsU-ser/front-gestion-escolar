import { useState, useEffect } from 'react';
import { cursoRepository } from '../../infrastructure/repositories/HttpCursosRepository';

export const useCursos = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarCursos = async () => {
    setLoading(true);
    try {
      const data = await cursoRepository.getAll();
      // Aseguramos formato array para renderizado
      setCursos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando cursos:", error);
      setCursos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const crear = async (curso) => {
    await cursoRepository.create(curso);
    await cargarCursos(); // Sincronizacion post-creacion
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este curso?")) {
      await cursoRepository.delete(id);
      await cargarCursos(); // Sincronizacion post-eliminacion
    }
  };

  return { cursos, loading, crear, eliminar, cargarCursos };
};
