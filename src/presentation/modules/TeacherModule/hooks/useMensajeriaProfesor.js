import { useState, useEffect, useMemo } from 'react';
import { useMensajeria } from '../../../../application/use-cases/useMensajeria';
import { useCargaAcademica } from '../../../../application/use-cases/useCargaAcademica';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { alumnoCursoRepository } from '../../../../infrastructure/repositories/HttpCursosRepository';
import { useSnackbar } from '../../../../application/context/SnackbarContext';

// CUSTOM HOOK
// define el hook personalizado para separar la lógica de negocio de la vista del profesor
export const useMensajeriaProfesor = (currentUser) => {
  const { enviarMensaje, loading } = useMensajeria();
  const { showSnackbar } = useSnackbar();
  const { cargas, loading: loadingCargas } = useCargaAcademica();
  const { cursos, loading: loadingCursos } = useCursos();
  
  const [misAlumnos, setMisAlumnos] = useState([]);
  const [loadingAlumnos, setLoadingAlumnos] = useState(true);

  // filtra cursos y alumnos correspondientes al profesor autenticado (MEMOIZADO)
  const misCursosIds = useMemo(() => {
    if (!cargas || !currentUser?.profile?.id) return [];
    const miHorario = cargas.filter(c => c.docenteId === currentUser.profile.id);
    return [...new Set(miHorario.map(c => c.cursoId))];
  }, [cargas, currentUser?.profile?.id]);

  const misCursos = useMemo(() => {
    if (!cursos || !misCursosIds) return [];
    return cursos.filter(c => misCursosIds.includes(c.id));
  }, [cursos, misCursosIds]);

  // obtiene y mapea los alumnos asignados a los cursos del profesor
  useEffect(() => {
// ejecuta la acción asíncrona de fetchAsignaciones
    const fetchAsignaciones = async () => {
      setLoadingAlumnos(true);
      try {
        const asignaciones = await alumnoCursoRepository.getAll();
        // filtra asignaciones que correspondan a los cursos del profesor
        const asignacionesProfesor = asignaciones.filter(asig => asig.curso && misCursosIds.includes(asig.curso.id));
        // mapea al objeto alumno y añadirle el cursoId para uso interno
        const listaAlumnos = asignacionesProfesor.map(asig => ({
          ...asig.alumno,
          cursoId: asig.curso.id
        })).filter(Boolean);
        
        // quita duplicados por si un alumno está en múltiples cursos (raro pero posible)
        const unicos = Array.from(new Map(listaAlumnos.map(a => [a.id, a])).values());
        setMisAlumnos(unicos);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAlumnos(false);
      }
    };
    if (!loadingCargas && misCursosIds.length > 0) {
      fetchAsignaciones();
    } else {
      setLoadingAlumnos(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCargas, misCursosIds]);

  // maneja el envío, resuelve los correos de destino y despacha la petición al hook
  const handleSubmit = async (form) => {
    try {
      let correosDestino = [];

      if (form.alcance === 'ALUMNO') {
        const alumno = misAlumnos.find(a => a.id === form.alumnoId);
        if (!alumno) throw new Error("No se encontró el alumno seleccionado.");
        if (!alumno.emailApoderado || alumno.emailApoderado.trim() === '') {
          throw new Error(`El alumno no tiene un correo de apoderado registrado.`);
        }
        correosDestino.push({ correo: alumno.emailApoderado, alumnoId: alumno.id });
      }
      else if (form.alcance === 'CURSO') {
        const alumnosCurso = misAlumnos.filter(a => a.cursoId === form.cursoId);
        const alumnosConCorreo = alumnosCurso.filter(a => a.emailApoderado && a.emailApoderado.trim() !== '');
        if (alumnosConCorreo.length === 0) {
          throw new Error("No hay apoderados con correo registrado en este curso.");
        }
        correosDestino = alumnosConCorreo.map(a => ({ correo: a.emailApoderado, alumnoId: a.id }));
      }
      else {
        throw new Error("Los docentes solo pueden enviar comunicados a Cursos o Alumnos específicos.");
      }

      const payload = {
        destinatarios: correosDestino,
        asunto: form.asunto,
        cuerpo_mensaje: form.cuerpo
      };

      await enviarMensaje(payload);
      showSnackbar(`¡Éxito! Se enviaron ${correosDestino.length} correo(s) correctamente.`, "success");
    } catch (error) {
      showSnackbar(error.message, "error");
    }
  };

  const alcancesOpciones = useMemo(() => [
    { value: 'CURSO', label: 'Un Curso Específico' },
    { value: 'ALUMNO', label: 'Un Alumno Específico' }
  ], []);

  return {
    loading,
    misCursos,
    misAlumnos,
    alcancesOpciones,
    loadingCursos: loadingCursos || loadingCargas,
    loadingAlumnos,
    handleSubmit
  };
};
