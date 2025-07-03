import api from './api'

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    const { token, user } = response.data.data
    
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    
    return response.data
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user')
      console.log('🔍 Getting user from localStorage:', user)
      
      if (!user || user === 'undefined' || user === 'null') {
        console.log('⚠️ No valid user in localStorage')
        return null
      }
      
      const parsedUser = JSON.parse(user)
      console.log('✅ User parsed successfully:', parsedUser.username)
      return parsedUser
    } catch (error) {
      console.error('❌ Error parsing user from localStorage:', error)
      localStorage.removeItem('user')
      return null
    }
  },

  getToken: () => {
    try {
      const token = localStorage.getItem('token')
      console.log('🔍 Getting token from localStorage:', token ? 'exists' : 'missing')
      
      if (!token || token === 'undefined' || token === 'null') {
        console.log('⚠️ No valid token in localStorage')
        return null
      }
      return token
    } catch (error) {
      console.error('❌ Error getting token from localStorage:', error)
      localStorage.removeItem('token')
      return null
    }
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },

  updateProfile: async (data) => {
    const response = await api.put('/auth/profile', data)
    const updatedUser = response.data.data
    
    // Actualizar usuario en localStorage
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    return response.data
  },

  changePassword: async (data) => {
    const response = await api.put('/auth/change-password', data)
    return response.data
  },

  refreshToken: async () => {
    const response = await api.post('/auth/refresh')
    const { token } = response.data.data
    localStorage.setItem('token', token)
    return response.data
  },

  verifyToken: async () => {
    try {
      console.log('🔍 Verifying token with server...')
      const response = await api.get('/auth/verify')
      console.log('✅ Token verification response:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Token verification failed:', error.response?.status, error.response?.data)
      throw error
    }
  },

  // Método para limpiar toda la autenticación
  clearAuth: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Método para verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = authService.getToken()
    const user = authService.getCurrentUser()
    return !!(token && user)
  }
}