import { HeaderModulo } from '../../components/HeaderModulo';
import { FormularioMensaje } from './components/FormularioMensaje';
import { useMensajeriaViewModel } from './hooks/useMensajeriaViewModel';
import { MainContainer, StyledDivider } from './MensajeriaView.styles';

// VIEW PATTERN
// renderiza la vista de mensajeriaview
export const MensajeriaView = () => {
  const viewModel = useMensajeriaViewModel();

  return (
    <MainContainer>
      <HeaderModulo
        titulo="Mensajería Oficial Institucional"
        correo={viewModel.currentUser?.email}
      />
      <StyledDivider />
      <FormularioMensaje viewModel={viewModel} />
    </MainContainer>
  );
};
