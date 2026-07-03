import { useState, useContext, useMemo } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useMensajeriaAdmin } from './useMensajeriaAdmin';
import { useCascadaCursos } from '../../../shared/hooks/useCascadaCursos';

export const ALCANCES = [
  { value: 'INSTITUCION', label: 'Toda la Institución' },
  { value: 'CURSO', label: 'Un Curso Específico' },
  { value: 'ALUMNO', label: 'Un Alumno Específico' }
];

// CUSTOM HOOK
// maneja la lógica de mensajeriaviewmodel
export const useMensajeriaViewModel = () => {
  const { currentUser } = useContext(AuthContext);
  
  const { cursos, alumnosRaw, loading, loadingCursos, loadingAlumnos, loadingAsignaciones, handleSubmit } = useMensajeriaAdmin();

  const [form, setForm] = useState({
    alcance: 'INSTITUCION', cursoId: '', alumnoId: '', asunto: '', cuerpo: ''
  });

  const {
    filtroTipo, setFiltroTipo, filtroGrado, setFiltroGrado, filtroLetra, setFiltroLetra,
    tiposDisponibles, gradosDisponibles, letrasDisponibles, limpiarFiltros
  } = useCascadaCursos(cursos, (cursoId) => setForm(prev => ({ ...prev, cursoId, alumnoId: '' })));

  // filtra los alumnos correspondientes al curso seleccionado
  const alumnosFiltrados = useMemo(() => {
    if (!form.cursoId) return [];
    return alumnosRaw
      .filter(a => a.cursoId === form.cursoId)
      .map(a => ({ value: a.id, label: `${a.nombre} ${a.apellido} (${a.rut})` }));
  }, [alumnosRaw, form.cursoId]);

  // actualiza dinámicamente el estado del formulario de envío
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value, ...(name === 'alcance' && { cursoId: '', alumnoId: '' }) }));
    if (name === 'alcance') limpiarFiltros();
  };

// ejecuta la acción asíncrona de onSubmitForm
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const success = await handleSubmit(form);
    if (success) {
      setForm({ alcance: 'INSTITUCION', cursoId: '', alumnoId: '', asunto: '', cuerpo: '' });
      limpiarFiltros();
    }
  };

  return {
    currentUser, form, loading, loadingCursos, loadingAlumnos, loadingAsignaciones,
    filtroTipo, setFiltroTipo, filtroGrado, setFiltroGrado, filtroLetra, setFiltroLetra,
    tiposDisponibles, gradosDisponibles, letrasDisponibles, alumnosFiltrados,
    handleChange, onSubmitForm
  };
};
