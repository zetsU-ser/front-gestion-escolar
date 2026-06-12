import { useState } from 'react';
import { Paper } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { SeleccionDocenteAsignatura } from '../molecules/SeleccionDocenteAsignatura';
import { SeleccionDiaBloque } from '../molecules/SeleccionDiaBloque';
import { BotonAccion } from '../atoms/BotonAccion';

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
}));

/**
 * Organismo: FormularioAsignacionHorario
 * Formulario para asignar un bloque horario a un curso específico.
 * Compone dos moléculas separadas por responsabilidad.
 */
export const FormularioAsignacionHorario = ({
  cursoId,
  docentesOpciones,
  asignaturasOpciones,
  loadingDocentes,
  loadingCargas,
  onAsignar
}) => {
  const [form, setForm] = useState({
    docenteId: '',
    asignaturaId: '',
    diaSemana: 'LUNES',
    bloqueHorario: 1
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAsignar({ ...form, cursoId });
      alert('Bloque asignado exitosamente');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <FormPaper elevation={2}>
      <form onSubmit={handleSubmit}>
        <SeleccionDocenteAsignatura
          form={form}
          onFieldChange={handleChange}
          docentesOpciones={docentesOpciones}
          asignaturasOpciones={asignaturasOpciones}
          loadingDocentes={loadingDocentes}
        />
        <SeleccionDiaBloque
          form={form}
          onFieldChange={handleChange}
        />
        <BotonAccion
          type="submit"
          loading={loadingCargas}
          startIcon={<SaveIcon />}
          sx={{ mt: 3 }}
        >
          Asignar al Horario
        </BotonAccion>
      </form>
    </FormPaper>
  );
};
