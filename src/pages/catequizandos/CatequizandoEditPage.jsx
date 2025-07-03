import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Typography, Breadcrumbs, Link, Alert } from '@mui/material'
import { useCatequizandos } from '../../hooks/useCatequizandos'
import { catequizandoService } from '../../services/catequizandoService'
import CatequizandoForm from '../../components/catequizandos/CatequizandoForm'
import LoadingSpinner from '../../components/common/LoadingSpinner'

const CatequizandoEditPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { updateCatequizando, loading: updateLoading } = useCatequizandos()
  
  const [catequizando, setCatequizando] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCatequizando = async () => {
      try {
        setLoading(true)
        const response = await catequizandoService.getById(id)
        setCatequizando(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar catequizando')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCatequizando()
    }
  }, [id])

  const handleSubmit = async (data) => {
    try {
      await updateCatequizando(id, data)
      navigate('/catequizandos')
    } catch (error) {
      console.error('Error al actualizar catequizando:', error)
    }
  }

  const handleCancel = () => {
    navigate('/catequizandos')
  }

  if (loading) {
    return <LoadingSpinner message="Cargando catequizando..." />
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/catequizandos')}
        >
          Volver a la lista
        </Link>
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