import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('🔄 Initializing auth...')
        dispatch({ type: 'SET_LOADING', payload: true })
        
        const token = authService.getToken()
        const user = authService.getCurrentUser()

        console.log('📊 Auth data from storage:', { 
          hasToken: !!token, 
          hasUser: !!user,
          username: user?.username 
        })

        if (token && user) {
          try {
            console.log('🔍 Verifying token...')
            // Verificar que el token sigue siendo válido
            await authService.verifyToken()
            console.log('✅ Token verified successfully')
            
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user, token }
            })
          } catch (error) {
            console.error('❌ Token verification failed:', error)
            // Token inválido, limpiar storage
            authService.clearAuth()
            dispatch({ type: 'LOGOUT' })
          }
        } else if (token && !user) {
          console.log('⚠️ Token exists but no user data - attempting to fetch user profile')
          try {
            // Intentar obtener el perfil del usuario con el token existente
            const profileResponse = await authService.getProfile()
            const userData = profileResponse.data
            
            console.log('✅ User profile fetched successfully:', userData.username)
            
            // Guardar el usuario en localStorage
            localStorage.setItem('user', JSON.stringify(userData))
            
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: userData, token }
            })
          } catch (error) {
            console.error('❌ Failed to fetch user profile:', error)
            // Token probablemente inválido, limpiar todo
            authService.clearAuth()
            dispatch({ type: 'LOGOUT' })
          }
        } else {
          console.log('⚠️ No auth data found, user not authenticated')
          // No hay token o usuario, asegurar que el storage esté limpio
          authService.clearAuth()
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('💥 Auth initialization error:', error)
        authService.clearAuth()
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Error al inicializar la autenticación' 
        })
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })
      
      const response = await authService.login(credentials)
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data
      })
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión'
      dispatch({ 
        type: 'SET_ERROR', 
        payload: errorMessage 
      })
      throw error
    }
  }

  const logout = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Aunque falle el logout en el servidor, limpiar localmente
    } finally {
      authService.clearAuth()
      dispatch({ type: 'LOGOUT' })
    }
  }

  const updateUser = (userData) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}