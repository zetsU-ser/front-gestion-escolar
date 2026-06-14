import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  MenuItem
} from '@mui/material';

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Crear Nuevo Curso</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              select
              label="Nivel"
              fullWidth
              required
              value={form.nivel}
              onChange={(e) => setForm({ nivel: e.target.value, letra: '' })}
            >
              {nivelesDisponibles.map((n) => (
                <MenuItem key={n} value={n}>{n}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Letra / Paralelo"
              fullWidth
              required
              disabled={!form.nivel}
              value={form.letra}
              onChange={(e) => setForm({ ...form, letra: e.target.value })}
            >
              {letrasDisponibles.map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Crear Curso</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
