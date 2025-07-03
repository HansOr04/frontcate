// Actualizar useCatequizandos.js para prevenir llamadas dobles

import { useState, useEffect, useCallback, useRef } from 'react'
import { catequizandoService } from '../services/catequizandoService'
import { toast } from 'react-toastify'

export const useCatequizandos = () => {
  const [catequizandos, setCatequizandos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })

  // ✅ Ref para prevenir llamadas duplicadas
  const isLoadingRef = useRef(false)

  // Función para limpiar errores
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Función principal para obtener catequizandos
  const fetchCatequizandos = useCallback(async (params = {}) => {
    // ✅ Prevenir llamadas duplicadas
    if (isLoadingRef.current) {
      console.log('🚫 Skipping fetch - already loading')
      return
    }

    try {
      console.log('🚀 Starting fetchCatequizandos...')
      isLoadingRef.current = true
      setLoading(true)
      clearError()
      
      const queryParams = {
        page: params.page || pagination.page,
        limit: params.limit || pagination.limit,
        ...params
      }

      console.log('🔍 Fetching catequizandos with params:', queryParams)
      console.log('🔍 Current pagination state:', pagination)
      
      const response = await catequizandoService.getAll(queryParams)
      
      console.log('✅ Service response:', response)
      console.log('✅ Response success:', response.success)
      console.log('✅ Response data structure:', Object.keys(response.data || {}))
      
      if (response.success && response.data) {
        const { catequizandos: newCatequizandos, pagination: newPagination } = response.data
        
        console.log('📊 Raw catequizandos from service:', newCatequizandos)
        console.log('📊 Raw pagination from service:', newPagination)
        
        // ✅ Verificar que los datos sean arrays válidos
        if (Array.isArray(newCatequizandos)) {
          console.log('✅ Setting catequizandos in state. Count:', newCatequizandos.length)
          console.log('✅ Sample catequizando:', newCatequizandos[0])
          setCatequizandos(newCatequizandos)
        } else {
          console.warn('⚠️ Catequizandos is not an array:', typeof newCatequizandos, newCatequizandos)
          setCatequizandos([])
        }
        
        // ✅ Verificar que la paginación sea válida
        if (newPagination && typeof newPagination === 'object') {
          console.log('✅ Setting pagination in state:', newPagination)
          setPagination(newPagination)
        } else {
          console.warn('⚠️ Invalid pagination data:', newPagination)
          setPagination(prev => ({
            ...prev,
            total: 0,
            totalPages: 0
          }))
        }

        console.log('✅ State update completed')
      } else {
        console.error('❌ Response indicates failure:', response.message)
        throw new Error(response.message || 'Error al obtener catequizandos')
      }
    } catch (err) {
      console.error('❌ Error fetching catequizandos:', err)
      
      const message = err.response?.data?.message || err.message || 'Error al cargar catequizandos'
      setError(message)
      toast.error(message)
      setCatequizandos([])
      
      setPagination(prev => ({
        ...prev,
        total: 0,
        totalPages: 0
      }))
    } finally {
      setLoading(false)
      isLoadingRef.current = false
      console.log('✅ fetchCatequizandos completed')
    }
  }, [pagination.page, pagination.limit])

  // ✅ Effect optimizado para cargar datos iniciales
  useEffect(() => {
    console.log('🚀 useEffect triggered - Initial load')
    if (!isLoadingRef.current && catequizandos.length === 0) {
      fetchCatequizandos()
    }
  }, []) // Solo se ejecuta una vez al montar

  // ✅ Effect optimizado para cambios de página (sin dependencies recursivas)
  useEffect(() => {
    if (pagination.page > 1 && !isLoadingRef.current) {
      console.log('📄 Page changed, reloading data for page:', pagination.page)
      fetchCatequizandos({ page: pagination.page })
    }
  }, [pagination.page])

  // Obtener catequizando por ID
  // Actualizar solo la función getCatequizandoById en useCatequizandos.js

const getCatequizandoById = useCallback(async (id) => {
  try {
    console.log('🔍 Hook: Getting catequizando by ID:', id)
    
    if (!id) {
      throw new Error('ID es requerido')
    }
    
    // No usar setLoading aquí para evitar conflictos con la lista
    const response = await catequizandoService.getById(id)
    
    console.log('✅ Hook: getCatequizandoById response:', response)
    
    if (response.success && response.data) {
      console.log('✅ Hook: Returning catequizando data:', {
        id: response.data._id,
        nombres: response.data.nombres,
        apellidos: response.data.apellidos,
        hasContacto: !!response.data.contacto,
        hasResponsable: !!response.data.responsable
      })
      return response.data
    } else {
      console.error('❌ Hook: Invalid response structure:', response)
      throw new Error(response.message || 'Error al obtener catequizando')
    }
  } catch (err) {
    console.error('❌ Hook: Error getting catequizando by ID:', err)
    console.error('❌ Hook: Error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status
    })
    
    // No usar setError aquí porque puede interferir con el estado de la lista
    throw err
  }
}, [])

  // Crear catequizando
  const createCatequizando = useCallback(async (data) => {
    try {
      setLoading(true)
      clearError()
      
      console.log('➕ Creating catequizando:', data)
      
      const response = await catequizandoService.create(data)
      
      console.log('✅ Create response:', response)
      
      if (response.success) {
        toast.success('Catequizando creado exitosamente')
        // Refrescar la lista
        await fetchCatequizandos()
        return response.data
      } else {
        throw new Error(response.message || 'Error al crear catequizando')
      }
    } catch (err) {
      console.error('❌ Error creating catequizando:', err)
      const message = err.response?.data?.message || err.message || 'Error al crear catequizando'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchCatequizandos])

  // Actualizar catequizando
  const updateCatequizando = useCallback(async (id, data) => {
    try {
      setLoading(true)
      clearError()
      
      console.log('✏️ Updating catequizando:', id, data)
      
      const response = await catequizandoService.update(id, data)
      
      console.log('✅ Update response:', response)
      
      if (response.success) {
        toast.success('Catequizando actualizado exitosamente')
        // Refrescar la lista
        await fetchCatequizandos()
        return response.data
      } else {
        throw new Error(response.message || 'Error al actualizar catequizando')
      }
    } catch (err) {
      console.error('❌ Error updating catequizando:', err)
      const message = err.response?.data?.message || err.message || 'Error al actualizar catequizando'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetchCatequizandos])

  // Eliminar catequizando
  // Actualizar solo el método deleteCatequizando en useCatequizandos.js

const deleteCatequizando = useCallback(async (id) => {
  try {
    console.log('🗑️ Hook: Starting delete for catequizando:', id)
    setLoading(true)
    clearError()
    
    if (!id) {
      throw new Error('ID es requerido para eliminar')
    }
    
    // Confirmar eliminación (opcional - puedes quitar esto si ya tienes confirmación en el componente)
    const catequizandoToDelete = catequizandos.find(c => c._id === id)
    if (catequizandoToDelete) {
      console.log('🗑️ Hook: Deleting catequizando:', {
        id: catequizandoToDelete._id,
        name: `${catequizandoToDelete.nombres} ${catequizandoToDelete.apellidos}`
      })
    }
    
    const response = await catequizandoService.delete(id)
    
    console.log('✅ Hook: Delete response:', response)
    
    if (response.success) {
      // Mostrar mensaje de éxito
      toast.success(response.message || 'Catequizando eliminado exitosamente')
      
      // Actualizar estado local inmediatamente para mejor UX
      setCatequizandos(prev => prev.filter(cat => cat._id !== id))
      
      // También actualizar la paginación
      setPagination(prev => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
        totalPages: Math.ceil(Math.max(0, prev.total - 1) / prev.limit)
      }))
      
      // Refrescar la lista desde el servidor para estar seguros
      setTimeout(() => {
        fetchCatequizandos()
      }, 500)
      
      console.log('✅ Hook: Delete completed successfully')
    } else {
      throw new Error(response.message || 'Error al eliminar catequizando')
    }
  } catch (err) {
    console.error('❌ Hook: Error deleting catequizando:', err)
    console.error('❌ Hook: Delete error details:', {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status
    })
    
    let errorMessage = 'Error al eliminar catequizando'
    
    if (err.response?.status === 403) {
      errorMessage = 'No tienes permisos para eliminar catequizandos'
    } else if (err.response?.status === 409) {
      errorMessage = 'No se puede eliminar porque tiene inscripciones o certificados asociados'
    } else if (err.response?.status === 404) {
      errorMessage = 'El catequizando no existe o ya fue eliminado'
    } else if (err.response?.data?.message) {
      errorMessage = err.response.data.message
    } else if (err.message) {
      errorMessage = err.message
    }
    
    setError(errorMessage)
    toast.error(errorMessage)
  } finally {
    setLoading(false)
  }
}, [catequizandos, fetchCatequizandos])

  // Buscar catequizandos
  const searchCatequizandos = useCallback(async (query) => {
    try {
      setLoading(true)
      clearError()
      
      console.log('🔍 Searching catequizandos:', query)
      
      const response = await catequizandoService.search(query)
      
      console.log('✅ Search response:', response)
      
      if (response.success) {
        setCatequizandos(response.data.catequizandos || [])
        // Reset pagination for search results
        setPagination(prev => ({
          ...prev,
          page: 1,
          total: response.data.catequizandos?.length || 0,
          totalPages: 1
        }))
      } else {
        throw new Error(response.message || 'Error en la búsqueda')
      }
    } catch (err) {
      console.error('❌ Error searching catequizandos:', err)
      const message = err.response?.data?.message || err.message || 'Error en la búsqueda'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Refrescar datos
  const refresh = useCallback(() => {
    console.log('🔄 Manual refresh triggered')
    if (!isLoadingRef.current) {
      fetchCatequizandos()
    }
  }, [fetchCatequizandos])

  // Cambiar página
  const changePage = useCallback((newPage) => {
    console.log('📄 Changing page to:', newPage)
    setPagination(prev => ({
      ...prev,
      page: newPage
    }))
  }, [])

  // Cambiar límite por página
  const changeLimit = useCallback((newLimit) => {
    console.log('📄 Changing limit to:', newLimit)
    setPagination(prev => ({
      ...prev,
      limit: newLimit,
      page: 1
    }))
  }, [])

  return {
    // Estado
    catequizandos,
    loading,
    error,
    pagination,
    
    // Acciones principales
    fetchCatequizandos,
    getCatequizandoById,
    createCatequizando,
    updateCatequizando,
    deleteCatequizando,
    searchCatequizandos,
    refresh,
    clearError,
    
    // Paginación
    changePage,
    changeLimit,
    setPagination
  }
}