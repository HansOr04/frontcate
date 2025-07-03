import api from './api'

export const catequizandoService = {
  getAll: async (params = {}) => {
    const response = await api.get('/catequizandos', { params })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/catequizandos/${id}`)
    return response.data
  },

  create: async (data) => {
    const response = await api.post('/catequizandos', data)
    return response.data
  },

  update: async (id, data) => {
    const response = await api.put(`/catequizandos/${id}`, data)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/catequizandos/${id}`)
    return response.data
  },

  search: async (query) => {
    const response = await api.get('/catequizandos/search', { 
      params: { q: query } 
    })
    return response.data
  },

  getByDocument: async (documento) => {
    const response = await api.get(`/catequizandos/documento/${documento}`)
    return response.data
  },

  getStats: async () => {
    const response = await api.get('/catequizandos/stats')
    return response.data
  },

  getCumpleanos: async () => {
    const response = await api.get('/catequizandos/cumpleanos')
    return response.data
  },

  getInscripciones: async (id) => {
    const response = await api.get(`/catequizandos/${id}/inscripciones`)
    return response.data
  },

  marcarEgresado: async (id, data) => {
    const response = await api.put(`/catequizandos/${id}/egresar`, data)
    return response.data
  },

  reactivar: async (id) => {
    const response = await api.put(`/catequizandos/${id}/reactivar`)
    return response.data
  }
}