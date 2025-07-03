import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Pages
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CatequizandosPage from './pages/catequizandos/CatequizandosPage'
import CatequizandoCreatePage from './pages/catequizandos/CatequizandoCreatePage'
import CatequizandoEditPage from './pages/catequizandos/CatequizandoEditPage'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <LoadingSpinner message="Iniciando aplicación..." />
  }

  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } 
      />
      
      {/* Rutas protegidas con layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard como página principal */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        {/* Rutas de catequizandos */}
        <Route path="catequizandos" element={<CatequizandosPage />} />
        <Route path="catequizandos/crear" element={<CatequizandoCreatePage />} />
        <Route path="catequizandos/editar/:id" element={<CatequizandoEditPage />} />
        
        {/* Páginas placeholder para otras funcionalidades */}
        <Route path="grupos" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Grupos</h2>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        } />
        
        <Route path="inscripciones" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Inscripciones</h2>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        } />
        
        <Route path="asistencias" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Asistencias</h2>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        } />
        
        <Route path="reportes" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Reportes</h2>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        } />
        
        <Route path="parroquias" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Parroquias</h2>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        } />
        
        <Route path="usuarios" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Usuarios</h2>
            <p>Esta funcionalidad estará disponible próximamente</p>
          </div>
        } />
      </Route>

      {/* Ruta catch-all para manejar rutas no encontradas */}
      <Route 
        path="*" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
      />
    </Routes>
  )
}

export default App