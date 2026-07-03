import { useState, useMemo, useEffect } from 'react';

// CUSTOM HOOK
// maneja la lógica de cascadacursos
export const useCascadaCursos = (cursosRaw, onCursoSeleccionado) => {
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroGrado, setFiltroGrado] = useState('');
  const [filtroLetra, setFiltroLetra] = useState('');

  const cursosEnriquecidos = useMemo(() => {
    return cursosRaw.map(c => {
      const [grado, tipo] = (c.nivel || '').split(' ');
      return { ...c, grado, tipo: tipo === 'Básico' || tipo === 'Básica' ? 'Básica' : 'Media' };
    });
  }, [cursosRaw]);

  const tiposDisponibles = useMemo(() => {
    const tipos = [...new Set(cursosEnriquecidos.map(c => c.tipo))].filter(Boolean);
    return tipos.map(t => ({ value: t, label: t }));
  }, [cursosEnriquecidos]);

  const gradosDisponibles = useMemo(() => {
    if (!filtroTipo) return [];
    const grados = [...new Set(cursosEnriquecidos.filter(c => c.tipo === filtroTipo).map(c => c.grado))].filter(Boolean);
    return grados.sort().map(g => ({ value: g, label: g }));
  }, [cursosEnriquecidos, filtroTipo]);

  const letrasDisponibles = useMemo(() => {
    if (!filtroTipo || !filtroGrado) return [];
    const letras = cursosEnriquecidos
      .filter(c => c.tipo === filtroTipo && c.grado === filtroGrado)
      .map(c => c.letra)
      .filter(Boolean);
    return [...new Set(letras)].sort().map(l => ({ value: l, label: l }));
  }, [cursosEnriquecidos, filtroTipo, filtroGrado]);

  useEffect(() => {
    if (filtroTipo && filtroGrado && filtroLetra) {
      const cursoEncontrado = cursosEnriquecidos.find(
        c => c.tipo === filtroTipo && c.grado === filtroGrado && c.letra === filtroLetra
      );
      if (cursoEncontrado && onCursoSeleccionado) {
        onCursoSeleccionado(cursoEncontrado.id);
      }
    } else {
      if (onCursoSeleccionado) onCursoSeleccionado('');
    }
  }, [filtroTipo, filtroGrado, filtroLetra, cursosEnriquecidos]);

  const limpiarFiltros = () => {
    setFiltroTipo('');
    setFiltroGrado('');
    setFiltroLetra('');
  };

  return {
    filtroTipo,
    setFiltroTipo,
    filtroGrado,
    setFiltroGrado,
    filtroLetra,
    setFiltroLetra,
    tiposDisponibles,
    gradosDisponibles,
    letrasDisponibles,
    limpiarFiltros
  };
};
