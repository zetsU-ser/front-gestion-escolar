import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

import theme from './infrastructure/theme/theme';
import { AuthProvider, useAuth } from './application/context/AuthContext';
import { SnackbarProvider } from './application/context/SnackbarContext';
import { ProtectedRoute } from './presentation/routes/ProtectedRoute';
import { Unauthorized } from './presentation/routes/Unauthorized';
import { LoginForm } from './presentation/modules/LoginModule/LoginForm';
import { AdminDashboard } from './presentation/modules/AdminModule/AdminDashboard';
import { CoordinadorDashboard } from './presentation/modules/TeacherModule/CoordinadorDashboard';
import { ProfesorDashboard } from './presentation/modules/TeacherModule/ProfesorDashboard';
import { UsuariosTable } from './presentation/modules/UsuariosModule/UsuariosTable';
import { AlumnosTable } from './presentation/modules/AlumnosModule/AlumnosTable';
import { CursosTable } from './presentation/modules/CursosModule/CursosTable';
import { AlumnosCursoView } from './presentation/modules/AlumnosCursoModule/AlumnosCursoView';
import { CargaAcademicaView } from './presentation/modules/CargaAcademicaModule/CargaAcademicaView';
import { Navbar } from './presentation/components/Navbar';
import { MensajeriaView } from './presentation/modules/MensajeriaModule/MensajeriaView';
import { AsistenciaView } from './presentation/modules/TeacherModule/AsistenciaView';
import { EvaluacionesView } from './presentation/modules/TeacherModule/EvaluacionesView';
import { MensajeriaProfesorView } from './presentation/modules/TeacherModule/MensajeriaProfesorView';

import { HomeView } from './presentation/modules/HomeModule/HomeView';

const AuthRedirect = () => {
  const { currentUser, isAdmin, isCoordinador } = useAuth();

  if (!currentUser) return <Navigate to="/home" replace />;

  // Redireccion por roles
  if (isAdmin()) return <Navigate to="/admin" replace />;
  if (isCoordinador()) return <Navigate to="/coordinador" replace />;

  return <Navigate to="/profesor" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <BrowserRouter>
          <Navbar>
            <Routes>
              <Route path="/" element={<AuthRedirect />} />
              <Route path="/home" element={<HomeView />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/personal" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <UsuariosTable titulo="Control de Usuarios Institucionales" />
                </ProtectedRoute>
              } />
              <Route path="/admin/alumnos" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AlumnosTable />
                </ProtectedRoute>
              } />
              <Route path="/admin/mensajeria" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <MensajeriaView />
                </ProtectedRoute>
              } />

              <Route path="/coordinador" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <CoordinadorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/alumnos" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <AlumnosTable />
                </ProtectedRoute>
              } />
              <Route path="/cursos" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <CursosTable />
                </ProtectedRoute>
              } />
              <Route path="/alumnos-curso/:cursoId" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <AlumnosCursoView />
                </ProtectedRoute>
              } />
              <Route path="/coordinador/carga-academica" element={
                <ProtectedRoute allowedRoles={['COORDINADOR', 'ADMIN']}>
                  <CargaAcademicaView />
                </ProtectedRoute>
              } />
              <Route path="/coordinador/mensajeria" element={
                <ProtectedRoute allowedRoles={['COORDINADOR']}>
                  <MensajeriaView />
                </ProtectedRoute>
              } />

              <Route path="/profesor" element={
                <ProtectedRoute allowedRoles={['DOCENTE']}>
                  <ProfesorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/profesor/asistencia" element={
                <ProtectedRoute allowedRoles={['DOCENTE', 'ADMIN']}>
                  <AsistenciaView />
                </ProtectedRoute>
              } />
              <Route path="/profesor/asistencia/:cursoId" element={
                <ProtectedRoute allowedRoles={['DOCENTE', 'ADMIN']}>
                  <AsistenciaView />
                </ProtectedRoute>
              } />
              <Route path="/profesor/evaluaciones" element={
                <ProtectedRoute allowedRoles={['DOCENTE', 'ADMIN']}>
                  <EvaluacionesView />
                </ProtectedRoute>
              } />
              <Route path="/profesor/evaluaciones/:cursoId" element={
                <ProtectedRoute allowedRoles={['DOCENTE', 'ADMIN']}>
                  <EvaluacionesView />
                </ProtectedRoute>
              } />
              <Route path="/profesor/mensajeria" element={
                <ProtectedRoute allowedRoles={['DOCENTE']}>
                  <MensajeriaProfesorView />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Navbar>
        </BrowserRouter>
      </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
