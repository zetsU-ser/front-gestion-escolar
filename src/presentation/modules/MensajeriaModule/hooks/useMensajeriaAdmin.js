import { useState, useEffect } from 'react';
import { useMensajeria } from '../../../../application/use-cases/useMensajeria';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useAlumnos } from '../../../../application/use-cases/useAlumnos';
import { alumnoCursoRepository } from '../../../../infrastructure/repositories/HttpCursosRepository';

// define el hook personalizado para separar la lógica de negocio de la vista de administración
export const useMensajeriaAdmin = () => {
  const { enviarMensaje, loading } = useMensajeria();
  const { showSnackbar } = useSnackbar();
  const { cursos, loading: loadingCursos } = useCursos();
  const { alumnos, loading: loadingAlumnos } = useAlumnos();

  const [alumnosRaw, setAlumnosRaw] = useState([]);
  const [loadingAsignaciones, setLoadingAsignaciones] = useState(true);

  // obtiene y mapea los alumnos con sus cursos asignados al montar el componente
  useEffect(() => {
    const fetchAsignaciones = async () => {
      setLoadingAsignaciones(true);
      try {
        const asignaciones = await alumnoCursoRepository.getAll();
        // mapea la lista completa enriqueciendo los alumnos con su cursoId
        const listaEnriquecida = asignaciones.map(a => ({
          ...a.alumno,
          cursoId: a.curso?.id
        })).filter(a => a && a.id);
        
        // quita duplicados si es necesario
        const unicos = Array.from(new Map(listaEnriquecida.map(a => [a.id, a])).values());
        setAlumnosRaw(unicos);
      } catch (err) {
        console.error("Fallo al obtener alumnos enriquecidos:", err);
      } finally {
        setLoadingAsignaciones(false);
      }
    };
    fetchAsignaciones();
  }, []);

  // maneja el envío, resuelve los correos de destino y despacha la petición
  const handleSubmit = async (form) => {
    try {
      let correosDestino = [];

      if (form.alcance === 'ALUMNO') {
        const alumno = alumnos.find(a => a.id === form.alumnoId);
        if (!alumno) throw new Error("No se encontró el alumno seleccionado.");
        if (!alumno.emailApoderado || alumno.emailApoderado.trim() === '') {
          throw new Error(`El alumno "${alumno.nombre} ${alumno.apellido}" no tiene un correo de apoderado registrado. Actualiza su ficha primero desde Matricular Alumno.`);
        }
        correosDestino.push({ correo: alumno.emailApoderado, alumnoId: alumno.id });
      }
      else if (form.alcance === 'INSTITUCION') {
        correosDestino = alumnos
          .filter(a => a.emailApoderado && a.emailApoderado.trim() !== '')
          .map(a => ({ correo: a.emailApoderado, alumnoId: a.id }));
      }
      else if (form.alcance === 'CURSO') {
        const asignaciones = await alumnoCursoRepository.getByCurso(form.cursoId);
        const alumnosDelCurso = asignaciones.map(a => a.alumno).filter(Boolean);
        const alumnosConCorreo = alumnosDelCurso.filter(a => a.emailApoderado && a.emailApoderado.trim() !== '');
        correosDestino = alumnosConCorreo.map(a => ({ correo: a.emailApoderado, alumnoId: a.id }));
      }

      if (correosDestino.length === 0) {
        throw new Error("No se encontraron destinatarios con correo de apoderado registrado. Verifica que los alumnos tengan el campo 'Email de Contacto' en su ficha.");
      }

      const payload = {
        destinatarios: correosDestino,
        asunto: form.asunto,
        cuerpo_mensaje: form.cuerpo
      };

      await enviarMensaje(payload);
      showSnackbar(`¡Éxito! Se enviaron ${correosDestino.length} correo(s) correctamente.`, "success");
      return true;
    } catch (error) {
      showSnackbar(error.message, "error");
      return false;
    }
  };

  return {
    cursos,
    alumnosRaw,
    loading,
    loadingCursos,
    loadingAlumnos,
    loadingAsignaciones,
    handleSubmit
  };
};
