import { useNavigate } from 'react-router-dom'
import { Box, Typography, Breadcrumbs, Link } from '@mui/material'
import { useCatequizandos } from '../../hooks/useCatequizandos'
import CatequizandoForm from '../../components/catequizandos/CatequizandoForm'

const CatequizandoCreatePage = () => {
  const navigate = useNavigate()
  const { createCatequizando, loading } = useCatequizandos()

  const handleSubmit = async (data) => {
    try {
      await createCatequizando(data)
      navigate('/catequizandos')
    } catch (error) {
      console.error('Error al crear catequizando:', error)
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

      <CatequizandoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </Box>
  )
}

export default CatequizandoCreatePage