
import { FormularioMensajeriaGlobal } from '../../components/organisms/FormularioMensajeriaGlobal';
import { MainContainer } from '../MensajeriaModule/MensajeriaView.styles';
import { StyledDivider } from './ProfesorDashboard.styles';
import { HeaderModulo } from '../../components/molecules/HeaderModulo';
import { useContext } from 'react';
import { AuthContext } from '../../../application/context/AuthContext';
import { useMensajeriaProfesor } from './hooks/useMensajeriaProfesor';

export const MensajeriaProfesorView = () => {
  const { currentUser } = useContext(AuthContext);
  
  // extrae la lógica de negocio desde el hook personalizado (Patrón Custom Hook / Presenter)
  const {
    loading,
    misCursos,
    misAlumnos,
    alcancesOpciones,
    loadingCursos,
    loadingAlumnos,
    handleSubmit
  } = useMensajeriaProfesor(currentUser);

  return (
    <MainContainer>
      <HeaderModulo 
        titulo="Mensajería Docente" 
        correo={currentUser?.email}
      />

      <StyledDivider />

      <FormularioMensajeriaGlobal
        onSubmit={handleSubmit}
        loading={loading}
        cursosRaw={misCursos}
        alumnosRaw={misAlumnos}
        alcancesOpciones={alcancesOpciones}
        loadingCursos={loadingCursos}
        loadingAlumnos={loadingAlumnos}
      />
    </MainContainer>
  );
};
