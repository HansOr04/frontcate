import { useState, useEffect } from 'react'
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

  const fetchCatequizandos = async (params = {}) => {
    try {
      setLoading(true)
      setError(null)
      const response = await catequizandoService.getAll({
        page: pagination.page,
        limit: pagination.limit,
        ...params
      })
      
      setCatequizandos(response.data.catequizandos)
      setPagination(response.data.pagination)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar catequizandos')
      toast.error('Error al cargar catequizandos')
    } finally {
      setLoading(false)
    }
  }

  const createCatequizando = async (data) => {
    try {
      setLoading(true)
      const response = await catequizandoService.create(data)
      toast.success('Catequizando creado exitosamente')
      fetchCatequizandos()
      return response
    } catch (err) {
      const message = err.response?.data?.message || 'Error al crear catequizando'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCatequizando = async (id, data) => {
    try {
      setLoading(true)
      const response = await catequizandoService.update(id, data)
      toast.success('Catequizando actualizado exitosamente')
      fetchCatequizandos()
      return response
    } catch (err) {
      const message = err.response?.data?.message || 'Error al actualizar catequizando'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCatequizando = async (id) => {
    try {
      setLoading(true)
      await catequizandoService.delete(id)
      toast.success('Catequizando eliminado exitosamente')
      fetchCatequizandos()
    } catch (err) {
      const message = err.response?.data?.message || 'Error al eliminar catequizando'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const searchCatequizandos = async (query) => {
    try {
      setLoading(true)
      const response = await catequizandoService.search(query)
      setCatequizandos(response.data.catequizandos)
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la búsqueda')
      toast.error('Error en la búsqueda')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCatequizandos()
  }, [pagination.page, pagination.limit])

  return {
    catequizandos,
    loading,
    error,
    pagination,
    fetchCatequizandos,
    createCatequizando,
    updateCatequizando,
    deleteCatequizando,
    searchCatequizandos,
    setPagination
  }
}