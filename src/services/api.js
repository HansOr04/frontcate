import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token')
      if (token && token !== 'undefined' && token !== 'null') {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Error getting token for request:', error)
    }
    return config
  },
  (error) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor para manejo de errores
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error)
    
    // Manejar diferentes tipos de errores
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status
      
      switch (status) {
        case 401:
          // Token expirado o inválido
          console.warn('Authentication failed, clearing storage')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          
          // Redirigir al login solo si no estamos ya ahí
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
          
        case 403:
          console.warn('Access forbidden')
          break
          
        case 404:
          console.warn('Resource not found')
          break
          
        case 500:
          console.error('Server error')
          break
          
        default:
          console.error(`HTTP Error ${status}:`, error.response.data)
      }
    } else if (error.request) {
      // Error de red
      console.error('Network error:', error.request)
    } else {
      // Error de configuración
      console.error('Request setup error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api