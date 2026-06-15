import { useState } from 'react';
import { useSnackbar } from '../../../application/context/SnackbarContext';
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
  const { showSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    docenteId: '',
    asignaturaId: '',
    diaSemana: '',
    bloqueHorario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'asignaturaId' && { docenteId: '' }) 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAsignar({ ...form, cursoId });
      showSnackbar('Bloque asignado exitosamente', 'success');
    } catch (error) {
      showSnackbar(error.message, 'error');
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
