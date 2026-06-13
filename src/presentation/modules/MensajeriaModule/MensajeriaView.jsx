import { Divider } from '@mui/material';
import { FormularioMensajeriaGlobal } from '../../components/organisms/FormularioMensajeriaGlobal';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { useAuth } from '../../../application/context/AuthContext';
import { MainContainer } from './MensajeriaView.styles';
import { useMensajeriaAdmin } from './hooks/useMensajeriaAdmin';

// define la página para enviar comunicados oficiales a los apoderados
// utiliza FormularioMensajeriaGlobal como organismo principal
export const MensajeriaView = () => {
  const { currentUser } = useAuth();
  
  // extrae toda la lógica y estado desde el hook personalizado (Patrón Custom Hook / Presenter)
  const {
    cursos,
    alumnosRaw,
    loading,
    loadingCursos,
    loadingAlumnos,
    loadingAsignaciones,
    handleSubmit
  } = useMensajeriaAdmin();

  return (
    <MainContainer>
      {/* muestra el encabezado del módulo */}
      <HeaderModulo
        titulo="Mensajería Oficial Institucional"
        correo={currentUser?.email}
      />


      <Divider sx={{ mb: 4 }} /> {/* separador visual idéntico al dashboard */}

      <FormularioMensajeriaGlobal
        onSubmit={handleSubmit}
        loading={loading}
        cursosRaw={cursos}
        alumnosRaw={alumnosRaw}
        loadingCursos={loadingCursos}
        loadingAlumnos={loadingAlumnos || loadingAsignaciones}
      />
    </MainContainer>
  );
};
