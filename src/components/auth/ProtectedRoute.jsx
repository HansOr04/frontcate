import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import LoadingSpinner from '../common/LoadingSpinner'

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  console.log('ProtectedRoute - Auth State:', { 
    isAuthenticated, 
    isLoading, 
    user: user?.username,
    currentPath: location.pathname 
  })

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return <LoadingSpinner message="Verificando acceso..." />
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login')
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Verificar roles si se requieren
  if (requiredRoles.length > 0 && (!user?.tipoPerfil || !requiredRoles.includes(user.tipoPerfil))) {
    console.log('Insufficient permissions, redirecting to dashboard')
    return <Navigate to="/dashboard" replace />
  }

  console.log('Access granted, rendering children')
  return children
}

export default ProtectedRoute