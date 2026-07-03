import { HeaderModulo } from '../../components/HeaderModulo';
import { SelectorCurso } from '../../shared/components/SelectorCurso';
import { FormularioBloque } from './components/FormularioBloque';
import { TablaHorario } from './components/TablaHorario';
import { useCargaAcademicaViewModel } from './hooks/useCargaAcademicaViewModel';

import { MainContainer, StyledDivider, EmptyStatePaper, EmptyStateText } from './CargaAcademicaView.styles';

// VIEW PATTERN
// renderiza la vista de cargaacademicaview
export const CargaAcademicaView = () => {
  const {
    currentUser, loadingCargas, loadingCursos, loadingDocentes,
    nivel, setNivel, cursoId, setCursoId, form, handleChangeForm,
    cursosOpciones, asignaturasOpciones, docentesFiltrados, cargasCurso,
    getDisplayData, handleEliminar, handleAsignarBloque
  } = useCargaAcademicaViewModel();

  return (
    <MainContainer>
      <HeaderModulo titulo="Carga Académica y Horarios" correo={currentUser?.email} />
      <StyledDivider />

      <SelectorCurso 
        nivelFiltro={nivel} setNivelFiltro={setNivel}
        cursoFiltro={cursoId} setCursoFiltro={setCursoId}
        cursosOpciones={cursosOpciones} loadingCursos={loadingCursos}
        titulo="Selección de Curso"
      />

      {cursoId ? (
        <>
          <FormularioBloque 
            form={form} handleChangeForm={handleChangeForm} handleAsignarBloque={handleAsignarBloque}
            asignaturasOpciones={asignaturasOpciones} docentesFiltrados={docentesFiltrados}
            loadingDocentes={loadingDocentes} loadingCargas={loadingCargas}
          />
          <TablaHorario 
            cargasCurso={cargasCurso} getDisplayData={getDisplayData} handleEliminar={handleEliminar}
          />
        </>
      ) : (
        <EmptyStatePaper>
          <EmptyStateText>Seleccione un nivel educativo y luego un curso para construir su horario.</EmptyStateText>
        </EmptyStatePaper>
      )}
    </MainContainer>
  );
};
