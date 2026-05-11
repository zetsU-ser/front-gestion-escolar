import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Infraestructura y Configuración
import theme from './infrastructure/theme/theme';
import { AuthProvider } from './application/context/AuthContext';
import { ProtectedRoute } from './presentation/routes/ProtectedRoute';
import { Unauthorized } from './presentation/routes/Unauthorized';

// Módulos de Usuario
import { LoginForm } from './presentation/modules/LoginModule/LoginForm';
import { AdminDashboard } from './presentation/modules/AdminModule/AdminDashboard';
import { CoordinadorDashboard } from './presentation/modules/TeacherModule/CoordinadorDashboard';
import { ProfesorDashboard } from './presentation/modules/TeacherModule/ProfesorDashboard';

// Módulos de Gestión Académica
import { UsuariosTable } from './presentation/modules/UsuariosModule/UsuariosTable';
import { AlumnosTable } from './presentation/modules/AlumnosModule/AlumnosTable';
import { CursosTable } from './presentation/modules/CursosModule/CursosTable';
import { AlumnosCursoView } from './presentation/modules/AlumnosCursoModule/AlumnosCursoView';

// Componentes Globales
import { Navbar } from './presentation/components/Navbar';
import { useAuth } from './application/context/AuthContext';

/**
 * COMPONENTE: AuthRedirect
 * Lógica de enrutamiento inicial basada en el estado de autenticación y el rol.
 */
const AuthRedirect = () => {
  const { currentUser, isAdmin, isCoordinador } = useAuth();
  
  if (!currentUser) return <LoginForm />;
  
  // Redirección según jerarquía de roles
  if (isAdmin()) return <Navigate to="/admin" replace />;
  if (isCoordinador()) return <Navigate to="/coordinador" replace />;
  
  return <Navigate to="/profesor" replace />;
};

/**
 * COMPONENTE PRINCIPAL: App
 * Define la estructura global, el sistema de rutas protegidas y los proveedores de contexto.
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Box sx={{ 
            minHeight: '100vh', 
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            pb: 4 // Espacio al final para evitar cortes
          }}>
            <Navbar />
            
            <Routes>
              {/* RUTA DE ENTRADA: Determina el destino según el login */}
              <Route path="/" element={<AuthRedirect />} />
              
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* RUTAS DE ADMINISTRACIÓN (Gestión de Personal) */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/usuarios" element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <UsuariosTable titulo="Control de Usuarios Institucionales" />
                </ProtectedRoute>
              } />

              {/* RUTAS DE COORDINACIÓN (Gestión Académica) */}
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

              {/* RUTAS DE DOCENCIA */}
              <Route path="/profesor" element={
                <ProtectedRoute allowedRoles={['DOCENTE']}>
                  <ProfesorDashboard />
                </ProtectedRoute>
              } />

              {/* FALLBACK: Redirige a inicio si la ruta no existe */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
