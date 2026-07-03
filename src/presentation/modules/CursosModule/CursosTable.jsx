import { CursoFormDialog } from './CursoFormDialog';
import { CursosGrid } from './components/CursosGrid';
import { useCursosTableViewModel } from './hooks/useCursosTableViewModel';
import { GenericTableModule } from '../../../shared/components/GenericTableModule';

// VIEW PATTERN
// renderiza la vista de cursostable
export const CursosTable = () => {
  const {
    currentUser, loading, loadingAsignaciones, open, setOpen, navigate, cursos,
    cursosBasica, cursosMedia, cursosOtros, countAlumnos, handleDelete, handleGuardarCurso
  } = useCursosTableViewModel();

  return (
    <GenericTableModule
      titulo="Gestión de Cursos"
      correo={currentUser?.email}
      loading={loading || loadingAsignaciones}
      puedeGestionar={true}
      onAgregar={() => setOpen(true)}
      textoBotonAgregar="Nuevo Curso"
      alineacionBoton="flex-start"
      loadingText="Cargando cursos..."
      gridComponent={
        <CursosGrid 
          cursos={cursos} cursosBasica={cursosBasica} cursosMedia={cursosMedia} 
          cursosOtros={cursosOtros} countAlumnos={countAlumnos} 
          handleDelete={handleDelete} navigate={navigate} 
        />
      }
      dialogComponent={
        <CursoFormDialog
          open={open} cursosExistentes={cursos}
          onClose={() => setOpen(false)} onGuardar={handleGuardarCurso}
        />
      }
    />
  );
};

