import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Breadcrumbs, Link, Alert, CircularProgress, Button } from '@mui/material'
import { ArrowBack, Refresh } from '@mui/icons-material'
import { useCatequizandos } from '../../hooks/useCatequizandos'
import CatequizandoForm from '../../components/catequizandos/CatequizandoForm'

const CatequizandoEditPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateCatequizando, getCatequizandoById } = useCatequizandos()
  
  const [catequizando, setCatequizando] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updateLoading, setUpdateLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCatequizando = async () => {
    if (!id) {
      setError('ID de catequizando no proporcionado')
      setLoading(false)
      return
    }

    try {
      console.log('🔍 Fetching catequizando for edit:', id)
      setLoading(true)
      setError(null)
      
      const data = await getCatequizandoById(id)
      console.log('✅ Catequizando data loaded for edit:', data)
      
      // Verificar que los datos están completos
      if (!data) {
        throw new Error('No se recibieron datos del catequizando')
      }
      
      if (!data.nombres || !data.apellidos) {
        console.warn('⚠️ Incomplete catequizando data:', data)
      }
      
      setCatequizando(data)
    } catch (err) {
      console.error('❌ Error loading catequizando for edit:', err)
      console.error('❌ Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      })
      
      let errorMessage = 'Error al cargar catequizando'
      
      if (err.response?.status === 404) {
        errorMessage = 'El catequizando no existe o ha sido eliminado'
      } else if (err.response?.status === 403) {
        errorMessage = 'No tienes permisos para editar este catequizando'
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCatequizando()
  }, [id]) // Removemos getCatequizandoById de las dependencias para evitar loops

  const handleSubmit = async (data) => {
    try {
      console.log('💾 Submitting update for catequizando:', id)
      console.log('💾 Update data:', data)
      setUpdateLoading(true)
      setError(null)
      
      const result = await updateCatequizando(id, data)
      console.log('✅ Update successful:', result)
      
      navigate('/catequizandos')
    } catch (error) {
      console.error('❌ Error updating catequizando:', error)
      
      let errorMessage = 'Error al actualizar catequizando'
      
      if (error.response?.status === 404) {
        errorMessage = 'El catequizando no existe'
      } else if (error.response?.status === 409) {
        errorMessage = 'Ya existe otro catequizando con este documento de identidad'
      } else if (error.response?.status === 400) {
        errorMessage = 'Datos inválidos: ' + (error.response?.data?.message || 'Verifica los campos')
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/catequizandos')
  }

  const handleRetry = () => {
    setError(null)
    fetchCatequizando()
  }

  // Loading state
  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" color="textSecondary">
          Cargando datos del catequizando...
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ID: {id}
        </Typography>
      </Box>
    )
  }

  // Error state
  if (error && !catequizando) {
    return (
      <Box>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigate('/catequizandos')
            }}
          >
            Catequizandos
          </Link>
          <Typography color="text.primary">Editar</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" gutterBottom>
          Error al Cargar Catequizando
        </Typography>

        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {error}
          </Typography>
          <Typography variant="body2">
            ID del catequizando: {id}
          </Typography>
        </Alert>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/catequizandos')}
          >
            Volver a la Lista
          </Button>
          
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRetry}
          >
            Reintentar
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault()
            navigate('/catequizandos')
          }}
        >
          Catequizandos
        </Link>
        <Typography color="text.primary">Editar</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Editar Catequizando
      </Typography>

      {catequizando && (
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {catequizando.nombres} {catequizando.apellidos} • {catequizando.documentoIdentidad}
        </Typography>
      )}

      {/* Mostrar error de actualización si existe */}
      {error && catequizando && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {catequizando && (
        <CatequizandoForm
          initialData={catequizando}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={updateLoading}
        />
      )}
    </Box>
  )
}

export default CatequizandoEditPage