import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Breadcrumbs, Link, Alert } from '@mui/material'
import { useCatequizandos } from '../../hooks/useCatequizandos'
import { catequizandoService } from '../../services/catequizandoService'
import CatequizandoForm from '../../components/catequizandos/CatequizandoForm'

const CatequizandoCreatePage = () => {
  const navigate = useNavigate()
  const { createCatequizando } = useCatequizandos()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (data) => {
    try {
      console.log('➕ Creating new catequizando with data:', data)
      setLoading(true)
      setError(null)
      
      // Validar datos antes de enviar
      const validation = catequizandoService.validateCatequizandoData(data)
      if (!validation.isValid) {
        setError(`Errores de validación: ${validation.errors.join(', ')}`)
        return
      }
      
      // Limpiar datos
      const cleanData = catequizandoService.cleanCatequizandoData(data)
      console.log('🧹 Clean data:', cleanData)
      
      const result = await createCatequizando(cleanData)
      console.log('✅ Creation successful:', result)
      
      navigate('/catequizandos')
    } catch (error) {
      console.error('❌ Error creating catequizando:', error)
      setError(error.response?.data?.message || error.message || 'Error al crear catequizando')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/catequizandos')
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
        <Typography color="text.primary">Nuevo</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom>
        Crear Nuevo Catequizando
      </Typography>

      {/* Mostrar error si existe */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <CatequizandoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Box>
  )
}

export default CatequizandoCreatePage