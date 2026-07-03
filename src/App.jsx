import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from './infrastructure/theme/theme';
import { ErrorBoundary } from './presentation/components/ErrorBoundary';
import { AuthProvider, useAuth } from './application/context/AuthContext';
import { SnackbarProvider } from './application/context/SnackbarContext';
import { DependencyProvider } from './application/context/DependencyContext';
import { ProtectedRoute } from './presentation/routes/ProtectedRoute';
import { Unauthorized } from './presentation/routes/Unauthorized';
import { Navbar } from './presentation/components/Navbar';
import { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';

// Implementación de Code Splitting mediante lazy loading
const LoginForm = lazy(() => import('./presentation/modules/LoginModule/LoginForm').then(m => ({ default: m.LoginForm })));
const AdminDashboard = lazy(() => import('./presentation/modules/AdminModule/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const CoordinadorDashboard = lazy(() => import('./presentation/modules/TeacherModule/CoordinadorDashboard').then(m => ({ default: m.CoordinadorDashboard })));
const ProfesorDashboard = lazy(() => import('./presentation/modules/TeacherModule/ProfesorDashboard').then(m => ({ default: m.ProfesorDashboard })));
const UsuariosTable = lazy(() => import('./presentation/modules/UsuariosModule/UsuariosTable').then(m => ({ default: m.UsuariosTable })));
const AlumnosTable = lazy(() => import('./presentation/modules/AlumnosModule/AlumnosTable').then(m => ({ default: m.AlumnosTable })));
const CursosTable = lazy(() => import('./presentation/modules/CursosModule/CursosTable').then(m => ({ default: m.CursosTable })));
const AlumnosCursoView = lazy(() => import('./presentation/modules/AlumnosCursoModule/AlumnosCursoView').then(m => ({ default: m.AlumnosCursoView })));
const CargaAcademicaView = lazy(() => import('./presentation/modules/CargaAcademicaModule/CargaAcademicaView').then(m => ({ default: m.CargaAcademicaView })));
const MensajeriaView = lazy(() => import('./presentation/modules/MensajeriaModule/MensajeriaView').then(m => ({ default: m.MensajeriaView })));
const AsistenciaView = lazy(() => import('./presentation/modules/TeacherModule/AsistenciaView').then(m => ({ default: m.AsistenciaView })));
const EvaluacionesView = lazy(() => import('./presentation/modules/TeacherModule/EvaluacionesView').then(m => ({ default: m.EvaluacionesView })));
const MensajeriaProfesorView = lazy(() => import('./presentation/modules/TeacherModule/MensajeriaProfesorView').then(m => ({ default: m.MensajeriaProfesorView })));
const HomeView = lazy(() => import('./presentation/modules/HomeModule/HomeView').then(m => ({ default: m.HomeView })));

const LoadingScreen = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', minHeight: '50vh' }}>
    <CircularProgress />
  </Box>
);

// crea una instancia global del cliente de caché de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // evita re-fetch innecesarios al cambiar de pestaña
      retry: 1, // reintentos automáticos en caso de fallo
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DependencyProvider>
          <SnackbarProvider>
            <AuthProvider>
              <BrowserRouter>
              <Navbar>
              <ErrorBoundary>
                <Suspense fallback={<LoadingScreen />}>
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
                      <ProtectedRoute allowedRoles={['COORDINADOR']}>
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
                      <ProtectedRoute allowedRoles={['DOCENTE']}>
                        <AsistenciaView />
                      </ProtectedRoute>
                    } />
                    <Route path="/profesor/asistencia/:cursoId" element={
                      <ProtectedRoute allowedRoles={['DOCENTE']}>
                        <AsistenciaView />
                      </ProtectedRoute>
                    } />
                    <Route path="/profesor/evaluaciones" element={
                      <ProtectedRoute allowedRoles={['DOCENTE']}>
                        <EvaluacionesView />
                      </ProtectedRoute>
                    } />
                    <Route path="/profesor/evaluaciones/:cursoId" element={
                      <ProtectedRoute allowedRoles={['DOCENTE']}>
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
                </Suspense>
              </ErrorBoundary>
              </Navbar>
            </BrowserRouter>
          </AuthProvider>
          </SnackbarProvider>
        </DependencyProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
