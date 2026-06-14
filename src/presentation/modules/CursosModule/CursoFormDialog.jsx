import { useState } from 'react';
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  StyledButton,
  SaveButton,
  StyledTextField,
  StyledStack,
  StyledMenuItem
} from './CursoFormDialog.styles';

const NIVELES = [
  '1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico',
  '1° Medio', '2° Medio', '3° Medio', '4° Medio'
];

const LETRAS = ['A', 'B'];

export const CursoFormDialog = ({ open, onClose, onGuardar, cursosExistentes = [] }) => {
  const [form, setForm] = useState({ nivel: '', letra: '' });

  // Calcular niveles que aún tienen letras disponibles
  const nivelesDisponibles = NIVELES.filter(nivel => {
    const letrasOcupadas = cursosExistentes.filter(c => c.nivel === nivel).map(c => c.letra);
    return letrasOcupadas.length < LETRAS.length;
  });

  // Calcular letras disponibles para el nivel seleccionado
  const letrasOcupadasDelNivel = cursosExistentes
    .filter(c => c.nivel === form.nivel)
    .map(c => c.letra);
  const letrasDisponibles = LETRAS.filter(letra => !letrasOcupadasDelNivel.includes(letra));

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
    setForm({ nivel: '', letra: '' });
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <StyledDialogTitle>Crear Nuevo Curso</StyledDialogTitle>
      <form onSubmit={handleSubmit}>
        <StyledDialogContent dividers>
          <StyledStack spacing={2}>
            <StyledTextField
              select
              label="Nivel"
              fullWidth
              required
              value={form.nivel}
              onChange={(e) => setForm({ nivel: e.target.value, letra: '' })}
            >
              {nivelesDisponibles.map((n) => (
                <StyledMenuItem key={n} value={n}>{n}</StyledMenuItem>
              ))}
            </StyledTextField>
            <StyledTextField
              select
              label="Letra / Paralelo"
              fullWidth
              required
              disabled={!form.nivel}
              value={form.letra}
              onChange={(e) => setForm({ ...form, letra: e.target.value })}
            >
              {letrasDisponibles.map((l) => (
                <StyledMenuItem key={l} value={l}>{l}</StyledMenuItem>
              ))}
            </StyledTextField>
          </StyledStack>
        </StyledDialogContent>
        <StyledDialogActions>
          <StyledButton onClick={onClose}>Cancelar</StyledButton>
          <SaveButton type="submit" variant="contained">Crear Curso</SaveButton>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
};
