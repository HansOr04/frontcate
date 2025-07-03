import {
  Box,
  Grid,
  Pagination,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  useTheme,
  alpha
} from '@mui/material'
import CatequizandoCard from './CatequizandoCard'
import CatequizandoRow from './CatequizandoRow'
import LoadingSpinner from '../common/LoadingSpinner'

const CatequizandosList = ({
  catequizandos,
  loading,
  error,
  pagination,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  viewMode = 'grid'
}) => {
  const theme = useTheme()

  // Loading skeletons
  const renderGridSkeleton = () => (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper sx={{ p: 2, height: 280 }}>
            <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  )

  const renderTableSkeleton = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
              <TableCell><Skeleton /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  // Loading state
  if (loading && catequizandos.length === 0) {
    return viewMode === 'grid' ? renderGridSkeleton() : renderTableSkeleton()
  }

  // Error state
  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mt: 2,
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <Typography variant="body1" gutterBottom>
          {error}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Verifica tu conexión e intenta nuevamente
        </Typography>
      </Alert>
    )
  }

  // Empty state
  if (catequizandos.length === 0) {
    return (
      <Box 
        textAlign="center" 
        py={8}
        sx={{
          backgroundColor: alpha(theme.palette.primary.main, 0.02),
          borderRadius: 2,
          border: `1px dashed ${theme.palette.divider}`
        }}
      >
        <Typography variant="h5" color="textSecondary" gutterBottom>
          No se encontraron catequizandos
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Intenta ajustar los filtros de búsqueda o crear un nuevo registro
        </Typography>
      </Box>
    )
  }

  // Grid view
  const renderGridView = () => (
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
  )

  // Table view
  const renderTableView = () => (
    <TableContainer 
      component={Paper} 
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Table>
        <TableHead>
          <TableRow 
            sx={{ 
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              '& .MuiTableCell-head': {
                fontWeight: 600,
                color: theme.palette.primary.main
              }
            }}
          >
            <TableCell>Nombre Completo</TableCell>
            <TableCell>Documento</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catequizandos.map((catequizando) => (
            <CatequizandoRow
              key={catequizando._id}
              catequizando={catequizando}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

  return (
    <Box>
      {/* Indicador de carga superpuesto */}
      {loading && catequizandos.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              zIndex: 1,
              borderRadius: 2
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2
            }}
          >
            <LoadingSpinner message="Actualizando..." />
          </Box>
        </Box>
      )}

      {/* Contador de resultados */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {pagination?.total ? (
            <>
              Mostrando {((pagination.page - 1) * pagination.limit) + 1} - {
                Math.min(pagination.page * pagination.limit, pagination.total)
              } de {pagination.total} catequizandos
            </>
          ) : (
            `${catequizandos.length} catequizandos encontrados`
          )}
        </Typography>
      </Box>

      {/* Lista principal */}
      {viewMode === 'grid' ? renderGridView() : renderTableView()}

      {/* Paginación */}
      {pagination && pagination.totalPages > 1 && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          '& .MuiPagination-root': {
            '& .MuiPaginationItem-root': {
              borderRadius: 2
            }
          }
        }}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={(event, page) => onPageChange(page)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  )
}

export default CatequizandosList