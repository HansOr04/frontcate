import {
  Box,
  Grid,
  Pagination,
  Typography,
  Alert
} from '@mui/material'
import CatequizandoCard from './CatequizandoCard'
import LoadingSpinner from '../common/LoadingSpinner'

const CatequizandosList = ({
  catequizandos,
  loading,
  error,
  pagination,
  onPageChange,
  onView,
  onEdit,
  onDelete
}) => {
  if (loading && catequizandos.length === 0) {
    return <LoadingSpinner message="Cargando catequizandos..." />
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    )
  }

  if (catequizandos.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
          No se encontraron catequizandos
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Intenta ajustar los filtros de búsqueda
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {catequizandos.map((catequizando) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={catequizando._id}>
            <CatequizandoCard
              catequizando={catequizando}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Grid>
        ))}
      </Grid>

      {pagination && pagination.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={(event, page) => onPageChange(page)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  )
}

export default CatequizandosList