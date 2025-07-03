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
  const { isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        
        <Route path="catequizandos">
          <Route index element={<CatequizandosPage />} />
          <Route path="crear" element={<CatequizandoCreatePage />} />
          <Route path="editar/:id" element={<CatequizandoEditPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
