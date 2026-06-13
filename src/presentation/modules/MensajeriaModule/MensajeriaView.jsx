import { Typography } from '@mui/material';
import { useMensajeria } from '../../../application/use-cases/useMensajeria';
import { useCursos } from '../../../application/use-cases/useCursos';
import { useAlumnos } from '../../../application/use-cases/useAlumnos';
import { alumnoCursoRepository } from '../../../infrastructure/repositories/HttpCursosRepository';
import { FormularioMensajeriaGlobal } from '../../components/organisms/FormularioMensajeriaGlobal';
import { MainContainer, HeaderContainer, TitleText } from './MensajeriaView.styles';

/**
 * Página: PaginaMensajeria
 * Orquesta el envío de correos institucionales hacia apoderados.
 * Composición:
 *   Organismo → FormularioMensajeriaGlobal
 *     Átomo → SelectorDesplegable (Alcance, Curso, Alumno)
 *     Átomo → InputTexto (Asunto)
 *     Átomo → TextAreaMensaje (Cuerpo)
 *     Átomo → BotonAccion (Enviar)
 */
export const MensajeriaView = () => {
  const { enviarMensaje, loading } = useMensajeria();
  const { cursos, loading: loadingCursos } = useCursos();
  const { alumnos, loading: loadingAlumnos } = useAlumnos();

  // Transformar datos a formato { value, label } para SelectorDesplegable
  const cursosOpciones = cursos.map(c => ({
    value: c.id,
    label: `${c.grado} ${c.letra} (${c.nivel})`
  }));

  const alumnosOpciones = alumnos.map(a => ({
    value: a.id,
    label: `${a.nombre} ${a.apellido} (${a.rut})`
  }));

  /**
   * Orquestación de envío: Resuelve correos de apoderado según el alcance
   * seleccionado y despacha al hook useMensajeria → axiosClient → ms-asistencia
   */
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
      alert(`¡Éxito! Se enviaron ${correosDestino.length} correo(s) correctamente.`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <TitleText variant="h5">
          Mensajería Oficial Institucional
        </TitleText>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Envíe comunicados a los apoderados desde la cuenta institucional del colegio.
        </Typography>
      </HeaderContainer>

      {/* Organismo: FormularioMensajeriaGlobal → Átomos */}
      <FormularioMensajeriaGlobal
        onSubmit={handleSubmit}
        loading={loading}
        cursosOpciones={cursosOpciones}
        alumnosOpciones={alumnosOpciones}
        loadingCursos={loadingCursos}
        loadingAlumnos={loadingAlumnos}
      />
    </MainContainer>
  );
};
