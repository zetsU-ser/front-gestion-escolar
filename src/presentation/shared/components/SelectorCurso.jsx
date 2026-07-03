import { MenuItem } from '@mui/material';
import { FilterPaper, SectionTitle, SelectorStack, StyledTextField } from './SelectorCurso.styles';

// COMPONENT PATTERN
// renderiza la vista de selectorcurso
export const SelectorCurso = ({
  nivelFiltro,
  setNivelFiltro,
  cursoFiltro,
  setCursoFiltro,
  cursosOpciones,
  loadingCursos,
  titulo = "Selecciona Nivel y Curso para operar",
  onCursoChange
}) => {
  return (
    <FilterPaper>
      <SectionTitle variant="h6">
        {titulo}
      </SectionTitle>
      <SelectorStack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <StyledTextField
          select
          label="Nivel Educativo"
          name="nivel"
          value={nivelFiltro}
          onChange={(e) => {
            setNivelFiltro(e.target.value);
            setCursoFiltro('');
          }}
          fullWidth
        >
          <MenuItem value="BASICA">Educación Básica</MenuItem>
          <MenuItem value="MEDIA">Educación Media</MenuItem>
        </StyledTextField>
        <StyledTextField
          select
          label="Curso"
          name="cursoId"
          value={cursoFiltro}
          onChange={(e) => {
            setCursoFiltro(e.target.value);
            if (onCursoChange) onCursoChange(e.target.value);
          }}
          disabled={!nivelFiltro || loadingCursos}
          fullWidth
        >
          {cursosOpciones.map(opcion => (
            <MenuItem key={opcion.value} value={opcion.value}>{opcion.label}</MenuItem>
          ))}
        </StyledTextField>
      </SelectorStack>
    </FilterPaper>
  );
};
