import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import LoginForm from '../../components/auth/LoginForm'

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirigir si ya está autenticado
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleLogin = async (credentials) => {
    try {
      setLoading(true)
      setError('')
      await login(credentials)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default'
      }}
    >
      <Container maxWidth="sm">
        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />
      </Container>
    </Box>
  )
}

export default LoginPage