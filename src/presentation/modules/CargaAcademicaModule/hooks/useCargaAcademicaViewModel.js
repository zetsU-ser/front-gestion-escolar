import { useState, useContext } from 'react';
import { AuthContext } from '../../../../application/context/AuthContext';
import { useSnackbar } from '../../../../application/context/SnackbarContext';
import { useCursos } from '../../../../application/use-cases/useCursos';
import { useUsuarios } from '../../../../application/use-cases/useUsuarios';
import { useCargaAcademica } from '../../../../application/use-cases/useCargaAcademica';
import { useAsignaturas } from '../../../../application/use-cases/useAsignaturas';

export const DIAS_SEMANA = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
export const BLOQUES = [
  { id: 1, label: 'Bloque 1 (08:00 - 09:30)' },
  { id: 2, label: 'Bloque 2 (09:45 - 11:15)' },
  { id: 3, label: 'Bloque 3 (11:30 - 13:00)' },
  { id: 4, label: 'Bloque 4 (14:00 - 15:30)' }
];

// CUSTOM HOOK
// maneja la lógica de cargaacademicaviewmodel
export const useCargaAcademicaViewModel = () => {
  const { currentUser } = useContext(AuthContext);
  const { showSnackbar } = useSnackbar();

  const { cursos, loading: loadingCursos } = useCursos();
  const { usuarios: docentes, loading: loadingDocentes } = useUsuarios('DOCENTE');
  const { cargas, loading: loadingCargas, asignarBloque, eliminarBloque } = useCargaAcademica();
  const { asignaturas, loading: loadingAsignaturas } = useAsignaturas();

  const [nivel, setNivel] = useState('');
  const [cursoId, setCursoId] = useState('');

  const [form, setForm] = useState({ docenteId: '', asignaturaId: '', diaSemana: '', bloqueHorario: '' });

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, [name]: value, ...(name === 'asignaturaId' && { docenteId: '' }) 
    }));
  };

  const cursosOpciones = cursos
    .filter(c => !nivel || c.nivel?.includes(nivel === 'BASICA' ? 'Básico' : 'Medio'))
    .map(c => ({ value: c.id, label: `${c.nivel} ${c.letra}` }));

  const docentesOpciones = docentes.map(d => ({
    value: d.id, label: `${d.nombre} ${d.apellido}`, asignaturaId: d.asignatura_id
  }));

  const asignaturasOpciones = asignaturas.map(a => ({ value: a.id, label: a.nombre }));
  const cargasCurso = cargas.filter(c => String(c.cursoId) === String(cursoId));

  const getDisplayData = (carga) => {
    const docente = docentes.find(d => String(d.id) === String(carga.docenteId));
    const asignatura = asignaturas.find(a => String(a.id) === String(carga.asignaturaId));
    return {
      docenteStr: docente ? `${docente.nombre} ${docente.apellido}` : 'N/A',
      asignaturaStr: asignatura ? asignatura.nombre : 'N/A'
    };
  };

  const docentesFiltrados = form.asignaturaId 
    ? docentesOpciones.filter(d => d.asignaturaId === form.asignaturaId) : [];

// ejecuta la acción asíncrona de handleEliminar
  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar esta asignación?')) {
      try { await eliminarBloque(id); showSnackbar('Bloque eliminado', 'success'); }
      catch (error) { showSnackbar(error.message, 'error'); }
    }
  };

// ejecuta la acción asíncrona de handleAsignarBloque
  const handleAsignarBloque = async (e) => {
    e.preventDefault();
    if (cargas.find(c => String(c.cursoId) === String(cursoId) && c.diaSemana === form.diaSemana && String(c.bloqueHorario) === String(form.bloqueHorario))) {
      return showSnackbar(`Curso ocupado el ${form.diaSemana} en el Bloque ${form.bloqueHorario}.`, 'error');
    }
    if (cargas.find(c => String(c.docenteId) === String(form.docenteId) && c.diaSemana === form.diaSemana && String(c.bloqueHorario) === String(form.bloqueHorario))) {
      return showSnackbar(`Docente ocupado el ${form.diaSemana} en el Bloque ${form.bloqueHorario}.`, 'error');
    }
    try {
      await asignarBloque({ ...form, cursoId });
      showSnackbar('Bloque asignado', 'success');
      setForm({ docenteId: '', asignaturaId: '', diaSemana: '', bloqueHorario: '' });
    } catch (error) { showSnackbar(error.message, 'error'); }
  };

  return {
    currentUser, loadingCargas, loadingCursos, loadingDocentes, loadingAsignaturas,
    nivel, setNivel, cursoId, setCursoId, form, handleChangeForm,
    cursosOpciones, asignaturasOpciones, docentesFiltrados, cargasCurso,
    getDisplayData, handleEliminar, handleAsignarBloque
  };
};
