import { useState, useEffect } from 'react';

// Mock hook for Carga Academica (Horarios)
export const useCargaAcademica = () => {
  const [cargas, setCargas] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargarCargas = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const saved = localStorage.getItem('mockCargas');
      if (saved) {
        setCargas(JSON.parse(saved));
      } else {
        // Seed initial data if empty to allow testing
        // You can change docenteId: 1 to whatever your test teacher ID is
        const initial = [
          { id: 1, diaSemana: 'LUNES', bloqueHorario: 1, cursoId: 1, docenteId: 1, asignaturaId: 1 },
          { id: 2, diaSemana: 'MARTES', bloqueHorario: 2, cursoId: 2, docenteId: 1, asignaturaId: 2 },
        ];
        setCargas(initial);
        localStorage.setItem('mockCargas', JSON.stringify(initial));
      }
    } catch (error) {
      console.error("Error cargando la carga académica:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCargas();
  }, []);

  const asignarBloque = async (payload) => {
    try {
      await new Promise(r => setTimeout(r, 500));
      setCargas(prev => {
        const newCargas = [...prev, { id: Date.now(), ...payload }];
        localStorage.setItem('mockCargas', JSON.stringify(newCargas));
        return newCargas;
      });
      return true;
    } catch (error) {
      console.error("Error asignando bloque:", error);
      throw new Error("No se pudo asignar el bloque horario.");
    }
  };

  const eliminarBloque = async (id) => {
    try {
      await new Promise(r => setTimeout(r, 500));
      setCargas(prev => {
        const newCargas = prev.filter(c => c.id !== id);
        localStorage.setItem('mockCargas', JSON.stringify(newCargas));
        return newCargas;
      });
      return true;
    } catch (error) {
      console.error("Error eliminando bloque:", error);
      throw new Error("No se pudo eliminar el bloque horario.");
    }
  };

  return { cargas, loading, asignarBloque, eliminarBloque };
};
