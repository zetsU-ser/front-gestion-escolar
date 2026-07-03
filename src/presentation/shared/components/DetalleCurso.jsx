import { DetallePaper, DetalleBox, TituloCurso, FechaTexto } from './DetalleCurso.styles';

// COMPONENT PATTERN
// renderiza la vista de detallecurso
export const DetalleCurso = ({ cursoActual }) => {
  if (!cursoActual) return null;

  return (
    <DetallePaper elevation={0}>
      <DetalleBox>
        <TituloCurso variant="h6">
          Curso: {cursoActual.nivel} {cursoActual.letra}
        </TituloCurso>
        <FechaTexto variant="body1">
          Fecha: {new Date().toLocaleDateString('es-CL')}
        </FechaTexto>
      </DetalleBox>
    </DetallePaper>
  );
};
