import api from './api'

export const catequizandoService = {
  // Obtener todos los catequizandos con filtros y paginación
  
  // Actualizar el método getAll en catequizandoService.js con debug más detallado

getAll: async (params = {}) => {
  try {
    console.log('📡 API Call: getAll catequizandos with params:', params)
    
    const queryParams = {
      page: params.page || 1,
      limit: params.limit || 10,
      search: params.search || '',
      activos: params.activos || 'true',
      genero: params.genero || '',
      ciudad: params.ciudad || '',
      casos_especiales: params.casos_especiales || 'all',
      edad_min: params.edad_min || '',
      edad_max: params.edad_max || ''
    }
    
    console.log('📤 Sending params to backend:', queryParams)
    
    const response = await api.get('/catequizandos', { params: queryParams })
    console.log('✅ API Response raw:', response.data)
    
    // ✅ DEBUG: Inspeccionar la estructura completa
    console.log('🔍 Response data structure:', {
      hasSuccess: response.data.hasOwnProperty('success'),
      successValue: response.data.success,
      hasData: response.data.hasOwnProperty('data'),
      dataType: typeof response.data.data,
      dataKeys: response.data.data ? Object.keys(response.data.data) : 'N/A'
    })
    
    if (response.data.success && response.data.data) {
      console.log('🔍 Detailed data inspection:', {
        dataContent: response.data.data,
        hasCatequizandos: response.data.data.hasOwnProperty('catequizandos'),
        catequizandosType: typeof response.data.data.catequizandos,
        catequizandosIsArray: Array.isArray(response.data.data.catequizandos),
        catequizandosLength: response.data.data.catequizandos?.length,
        hasPagination: response.data.data.hasOwnProperty('pagination'),
        paginationType: typeof response.data.data.pagination
      })
      
      const { catequizandos, pagination } = response.data.data
      
      // ✅ DEBUG: Verificar cada catequizando
      console.log('📋 Catequizandos data:', catequizandos)
      if (Array.isArray(catequizandos)) {
        console.log('📋 First catequizando sample:', catequizandos[0])
        console.log('📋 Catequizandos IDs:', catequizandos.map(c => c._id))
      }
      
      // ✅ DEBUG: Verificar paginación
      console.log('📄 Pagination raw:', pagination)
      
      const transformedPagination = {
        page: pagination?.currentPage || 1,
        limit: pagination?.itemsPerPage || 10,
        total: pagination?.totalItems || 0,
        totalPages: pagination?.totalPages || 0
      }
      
      console.log('🔄 Transformed data:', {
        catequizandos: catequizandos?.length || 0,
        pagination: transformedPagination,
        originalCatequizandos: catequizandos
      })
      
      return {
        success: true,
        data: {
          catequizandos: catequizandos || [],
          pagination: transformedPagination
        },
        message: response.data.message
      }
    } else {
      console.warn('⚠️ Unexpected response structure:', {
        success: response.data.success,
        hasData: !!response.data.data,
        fullResponse: response.data
      })
      return {
        success: false,
        data: { 
          catequizandos: [], 
          pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } 
        },
        message: response.data.message || 'Estructura de respuesta inesperada'
      }
    }
  } catch (error) {
    console.error('❌ Error in getAll:', error)
    console.error('❌ Response data:', error.response?.data)
    console.error('❌ Response status:', error.response?.status)
    
    return {
      success: false,
      data: { 
        catequizandos: [], 
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } 
      },
      message: error.response?.data?.message || error.message || 'Error al obtener catequizandos'
    }
  }
},

  // Obtener catequizando por ID
  // Actualizar el método getById en catequizandoService.js

getById: async (id) => {
  try {
    console.log('📡 API Call: getById catequizando:', id)
    
    if (!id) {
      throw new Error('ID es requerido')
    }
    
    // Validar formato de ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Formato de ID inválido')
    }
    
    const response = await api.get(`/catequizandos/${id}`)
    console.log('✅ API Response getById raw:', response.data)
    
    // El backend devuelve: { success: true, message: '...', data: catequizandoObject }
    if (response.data.success && response.data.data) {
      console.log('🔍 Catequizando data structure:', {
        hasData: !!response.data.data,
        dataType: typeof response.data.data,
        dataKeys: Object.keys(response.data.data),
        sample: response.data.data
      })
      
      return {
        success: true,
        data: response.data.data, // El catequizando está directamente en data
        message: response.data.message
      }
    } else {
      console.warn('⚠️ Unexpected getById response structure:', response.data)
      throw new Error(response.data.message || 'Estructura de respuesta inesperada')
    }
  } catch (error) {
    console.error('❌ Error in getById:', error)
    console.error('❌ Error response:', error.response?.data)
    console.error('❌ Error status:', error.response?.status)
    
    // Mejorar el manejo de errores específicos
    let errorMessage = 'Error al obtener catequizando'
    
    if (error.response?.status === 404) {
      errorMessage = 'Catequizando no encontrado'
    } else if (error.response?.status === 403) {
      errorMessage = 'No tienes permisos para ver este catequizando'
    } else if (error.response?.status === 400) {
      errorMessage = 'ID de catequizando inválido'
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    
    throw {
      response: {
        data: {
          message: errorMessage
        }
      }
    }
  }
},

  // Crear nuevo catequizando
  create: async (data) => {
    try {
      console.log('📡 API Call: create catequizando with data:', data)
      
      // Validación básica
      if (!data.nombres || !data.apellidos || !data.documentoIdentidad) {
        throw new Error('Faltan campos requeridos: nombres, apellidos, documentoIdentidad')
      }
      
      // Limpiar y validar datos antes de enviar
      const cleanData = catequizandoService.cleanCatequizandoData(data)
      const validation = catequizandoService.validateCatequizandoData(cleanData)
      
      if (!validation.isValid) {
        throw new Error(`Errores de validación: ${validation.errors.join(', ')}`)
      }
      
      const response = await api.post('/catequizandos', cleanData)
      console.log('✅ API Response create:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Catequizando creado exitosamente'
      }
    } catch (error) {
      console.error('❌ Error in create:', error)
      console.error('Response data:', error.response?.data)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || error.message || 'Error al crear catequizando'
          }
        }
      }
    }
  },

  // Actualizar catequizando existente
  update: async (id, data) => {
    try {
      console.log('📡 API Call: update catequizando:', id, 'with data:', data)
      
      if (!id) {
        throw new Error('ID es requerido')
      }
      
      // Validar formato de ObjectId
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Formato de ID inválido')
      }
      
      // Limpiar datos antes de enviar
      const cleanData = catequizandoService.cleanCatequizandoData(data)
      
      const response = await api.put(`/catequizandos/${id}`, cleanData)
      console.log('✅ API Response update:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Catequizando actualizado exitosamente'
      }
    } catch (error) {
      console.error('❌ Error in update:', error)
      console.error('Response data:', error.response?.data)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al actualizar catequizando'
          }
        }
      }
    }
  },

  // Eliminar catequizando
  // Actualizar el método delete en catequizandoService.js

delete: async (id) => {
  try {
    console.log('📡 API Call: delete catequizando:', id)
    
    if (!id) {
      throw new Error('ID es requerido')
    }
    
    // Validar formato de ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Formato de ID inválido')
    }
    
    console.log('🗑️ Service: Sending delete request for ID:', id)
    
    const response = await api.delete(`/catequizandos/${id}`)
    console.log('✅ API Response delete:', response.data)
    
    // Verificar respuesta del backend
    if (response.data.success) {
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Catequizando eliminado exitosamente'
      }
    } else {
      console.warn('⚠️ Delete response indicates failure:', response.data)
      throw new Error(response.data.message || 'Error al eliminar catequizando')
    }
  } catch (error) {
    console.error('❌ Error in delete:', error)
    console.error('❌ Delete error response:', error.response?.data)
    console.error('❌ Delete error status:', error.response?.status)
    
    // Manejo específico de errores de eliminación
    let errorMessage = 'Error al eliminar catequizando'
    
    if (error.response?.status === 404) {
      errorMessage = 'El catequizando no existe o ya ha sido eliminado'
    } else if (error.response?.status === 403) {
      errorMessage = 'No tienes permisos para eliminar catequizandos. Solo los administradores pueden eliminar.'
    } else if (error.response?.status === 409) {
      errorMessage = error.response.data?.message || 'No se puede eliminar porque tiene datos relacionados'
    } else if (error.response?.status === 400) {
      errorMessage = 'ID de catequizando inválido'
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }
    
    throw {
      response: {
        data: {
          message: errorMessage
        }
      }
    }
  }
},

  // Buscar catequizandos por texto
  search: async (query) => {
    try {
      console.log('📡 API Call: search catequizandos with query:', query)
      
      if (!query || query.trim().length < 2) {
        throw new Error('El término de búsqueda debe tener al menos 2 caracteres')
      }
      
      const response = await api.get('/catequizandos/search', { 
        params: { q: query.trim() } 
      })
      console.log('✅ API Response search:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in search:', error)
      console.error('Response data:', error.response?.data)
      
      return {
        success: false,
        data: { catequizandos: [] },
        message: error.response?.data?.message || 'Error en la búsqueda'
      }
    }
  },

  // Buscar catequizando por documento
  getByDocument: async (documento) => {
    try {
      console.log('📡 API Call: getByDocument:', documento)
      
      if (!documento || documento.trim().length < 6) {
        throw new Error('Documento inválido')
      }
      
      const response = await api.get(`/catequizandos/documento/${documento.trim()}`)
      console.log('✅ API Response getByDocument:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in getByDocument:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al buscar por documento'
          }
        }
      }
    }
  },

  // Obtener estadísticas de catequizandos
  getStats: async () => {
    try {
      console.log('📡 API Call: getStats catequizandos')
      const response = await api.get('/catequizandos/stats')
      console.log('✅ API Response getStats:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in getStats:', error)
      
      return {
        success: false,
        data: {
          total: 0,
          masculinos: 0,
          femeninos: 0,
          porcentajeBautizados: 0
        },
        message: error.response?.data?.message || 'Error al obtener estadísticas'
      }
    }
  },

  // Obtener cumpleañeros del mes
  getCumpleanos: async (mes = null) => {
    try {
      console.log('📡 API Call: getCumpleanos for month:', mes)
      const params = mes ? { mes } : {}
      const response = await api.get('/catequizandos/cumpleanos', { params })
      console.log('✅ API Response getCumpleanos:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in getCumpleanos:', error)
      
      return {
        success: false,
        data: { catequizandos: [] },
        message: error.response?.data?.message || 'Error al obtener cumpleañeros'
      }
    }
  },

  // Obtener inscripciones de un catequizando
  getInscripciones: async (id) => {
    try {
      console.log('📡 API Call: getInscripciones for catequizando:', id)
      
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('ID inválido')
      }
      
      const response = await api.get(`/catequizandos/${id}/inscripciones`)
      console.log('✅ API Response getInscripciones:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in getInscripciones:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al obtener inscripciones'
          }
        }
      }
    }
  },

  // Obtener certificados de un catequizando
  getCertificados: async (id) => {
    try {
      console.log('📡 API Call: getCertificados for catequizando:', id)
      
      if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('ID inválido')
      }
      
      const response = await api.get(`/catequizandos/${id}/certificados`)
      console.log('✅ API Response getCertificados:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in getCertificados:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al obtener certificados'
          }
        }
      }
    }
  },

  // Validar elegibilidad para inscripción
  validarInscripcion: async (id, nivelId) => {
    try {
      console.log('📡 API Call: validarInscripcion:', id, 'nivel:', nivelId)
      
      const response = await api.post(`/catequizandos/${id}/validar-inscripcion`, {
        id_nivel: nivelId
      })
      console.log('✅ API Response validarInscripcion:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message
      }
    } catch (error) {
      console.error('❌ Error in validarInscripcion:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al validar inscripción'
          }
        }
      }
    }
  },

  // Marcar catequizando como egresado
  marcarEgresado: async (id, data) => {
    try {
      console.log('📡 API Call: marcarEgresado:', id, data)
      
      const response = await api.put(`/catequizandos/${id}/egresar`, data)
      console.log('✅ API Response marcarEgresado:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Catequizando marcado como egresado'
      }
    } catch (error) {
      console.error('❌ Error in marcarEgresado:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al marcar como egresado'
          }
        }
      }
    }
  },

  // Reactivar catequizando
  reactivar: async (id) => {
    try {
      console.log('📡 API Call: reactivar catequizando:', id)
      
      const response = await api.put(`/catequizandos/${id}/reactivar`)
      console.log('✅ API Response reactivar:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Catequizando reactivado exitosamente'
      }
    } catch (error) {
      console.error('❌ Error in reactivar:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al reactivar catequizando'
          }
        }
      }
    }
  },

  // Exportar datos (placeholder para futuro desarrollo)
  exportData: async (params = {}) => {
    try {
      console.log('📡 API Call: exportData with params:', params)
      
      const response = await api.get('/catequizandos/export', { 
        params,
        responseType: 'blob'
      })
      
      return {
        success: true,
        data: response.data,
        message: 'Datos exportados exitosamente'
      }
    } catch (error) {
      console.error('❌ Error in exportData:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al exportar datos'
          }
        }
      }
    }
  },

  // Importar datos (placeholder para futuro desarrollo)
  importData: async (file) => {
    try {
      console.log('📡 API Call: importData with file:', file.name)
      
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await api.post('/catequizandos/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Datos importados exitosamente'
      }
    } catch (error) {
      console.error('❌ Error in importData:', error)
      
      throw {
        response: {
          data: {
            message: error.response?.data?.message || 'Error al importar datos'
          }
        }
      }
    }
  },

  // ==========================================
  // MÉTODOS AUXILIARES PARA VALIDACIÓN Y LIMPIEZA
  // ==========================================

  // Validar datos del catequizando
  validateCatequizandoData: (data) => {
    const errors = []
    
    // Validar nombres
    if (!data.nombres || data.nombres.trim().length < 2) {
      errors.push('Los nombres son requeridos y deben tener al menos 2 caracteres')
    }
    
    // Validar apellidos
    if (!data.apellidos || data.apellidos.trim().length < 2) {
      errors.push('Los apellidos son requeridos y deben tener al menos 2 caracteres')
    }
    
    // Validar documento de identidad
    if (!data.documentoIdentidad || data.documentoIdentidad.trim().length < 6) {
      errors.push('El documento de identidad es requerido y debe tener al menos 6 caracteres')
    }
    
    // Validar género
    if (!data.genero || !['masculino', 'femenino'].includes(data.genero)) {
      errors.push('El género es requerido y debe ser masculino o femenino')
    }
    
    // Validar contacto
    if (!data.contacto) {
      errors.push('La información de contacto es requerida')
    } else {
      if (!data.contacto.direccion || data.contacto.direccion.trim().length < 5) {
        errors.push('La dirección es requerida y debe tener al menos 5 caracteres')
      }
      
      if (!data.contacto.telefono || data.contacto.telefono.trim().length < 7) {
        errors.push('El teléfono es requerido y debe tener al menos 7 caracteres')
      }
      
      if (!data.contacto.ciudad || data.contacto.ciudad.trim().length < 2) {
        errors.push('La ciudad es requerida')
      }
      
      // Validar email si se proporciona
      if (data.contacto.email && data.contacto.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data.contacto.email)) {
          errors.push('El formato del email es inválido')
        }
      }
    }
    
    // Validar fecha de nacimiento
    if (data.fechaNacimiento) {
      const fecha = new Date(data.fechaNacimiento)
      if (fecha > new Date()) {
        errors.push('La fecha de nacimiento no puede ser futura')
      }
      
      // Validar edad mínima (4 años)
      const edad = Math.floor((new Date() - fecha) / (365.25 * 24 * 60 * 60 * 1000))
      if (edad < 4) {
        errors.push('La edad mínima para registro es 4 años')
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Limpiar datos del catequizando
  // Actualizar el método cleanCatequizandoData en catequizandoService.js para manejar dayjs

cleanCatequizandoData: (data) => {
  const cleaned = { ...data }
  
  // Limpiar strings principales
  if (cleaned.nombres) {
    cleaned.nombres = cleaned.nombres.trim().replace(/\s+/g, ' ')
  }
  if (cleaned.apellidos) {
    cleaned.apellidos = cleaned.apellidos.trim().replace(/\s+/g, ' ')
  }
  if (cleaned.documentoIdentidad) {
    cleaned.documentoIdentidad = cleaned.documentoIdentidad.trim().replace(/\s+/g, '')
  }
  
  // ✅ CORREGIDO: Manejar fecha de nacimiento para dayjs
  if (cleaned.fechaNacimiento) {
    console.log('🔄 Processing fechaNacimiento:', cleaned.fechaNacimiento)
    console.log('🔄 Type:', typeof cleaned.fechaNacimiento)
    
    // Si es un objeto dayjs (tiene método format)
    if (cleaned.fechaNacimiento && typeof cleaned.fechaNacimiento.format === 'function') {
      cleaned.fechaNacimiento = cleaned.fechaNacimiento.format('YYYY-MM-DD')
      console.log('✅ Converted dayjs to:', cleaned.fechaNacimiento)
    }
    // Si es un objeto Moment.js (tiene $d property)
    else if (cleaned.fechaNacimiento && typeof cleaned.fechaNacimiento === 'object' && cleaned.fechaNacimiento.$d) {
      cleaned.fechaNacimiento = cleaned.fechaNacimiento.$d.toISOString().split('T')[0]
      console.log('✅ Converted moment to:', cleaned.fechaNacimiento)
    }
    // Si es un objeto Date
    else if (cleaned.fechaNacimiento instanceof Date) {
      cleaned.fechaNacimiento = cleaned.fechaNacimiento.toISOString().split('T')[0]
      console.log('✅ Converted Date to:', cleaned.fechaNacimiento)
    }
    // Si ya es string, validar formato
    else if (typeof cleaned.fechaNacimiento === 'string') {
      const date = new Date(cleaned.fechaNacimiento)
      if (!isNaN(date.getTime())) {
        cleaned.fechaNacimiento = date.toISOString().split('T')[0]
        console.log('✅ Converted string to:', cleaned.fechaNacimiento)
      }
    }
  }
  
  // Limpiar contacto
  if (cleaned.contacto) {
    if (cleaned.contacto.direccion) {
      cleaned.contacto.direccion = cleaned.contacto.direccion.trim()
    }
    if (cleaned.contacto.telefono) {
      cleaned.contacto.telefono = cleaned.contacto.telefono.trim().replace(/\s+/g, '')
    }
    if (cleaned.contacto.ciudad) {
      cleaned.contacto.ciudad = cleaned.contacto.ciudad.trim()
    }
    if (cleaned.contacto.email) {
      cleaned.contacto.email = cleaned.contacto.email.trim().toLowerCase()
    }
  }
  
  // Limpiar responsable
  if (cleaned.responsable) {
    if (cleaned.responsable.nombres) {
      cleaned.responsable.nombres = cleaned.responsable.nombres.trim()
    }
    if (cleaned.responsable.apellidos) {
      cleaned.responsable.apellidos = cleaned.responsable.apellidos.trim()
    }
    if (cleaned.responsable.telefono) {
      cleaned.responsable.telefono = cleaned.responsable.telefono.trim().replace(/\s+/g, '')
    }
  }
  
  console.log('🧹 Final cleaned data:', cleaned)
  return cleaned
},

  // Formatear datos para mostrar
  formatCatequizandoData: (catequizando) => {
    if (!catequizando) return null
    
    return {
      ...catequizando,
      nombreCompleto: `${catequizando.nombres} ${catequizando.apellidos}`.trim(),
      edadCalculada: catequizando.fechaNacimiento 
        ? Math.floor((new Date() - new Date(catequizando.fechaNacimiento)) / (365.25 * 24 * 60 * 60 * 1000))
        : null,
      telefonoFormateado: catequizando.contacto?.telefono
        ? catequizando.contacto.telefono.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
        : null,
      responsableCompleto: catequizando.responsable?.nombres && catequizando.responsable?.apellidos
        ? `${catequizando.responsable.nombres} ${catequizando.responsable.apellidos}`.trim()
        : catequizando.responsable?.nombres || null
    }
  },

  // Método de utilidad para verificar conexión con el backend
  healthCheck: async () => {
    try {
      console.log('📡 API Call: healthCheck')
      const response = await api.get('/catequizandos/health')
      console.log('✅ Health check response:', response.data)
      
      return {
        success: true,
        data: response.data.data || response.data,
        message: response.data.message || 'Backend funcionando correctamente'
      }
    } catch (error) {
      console.error('❌ Error in healthCheck:', error)
      
      return {
        success: false,
        data: { status: 'error' },
        message: 'Error de conexión con el backend'
      }
    }
  }
}