import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Chip,
  Alert,
  Skeleton,
  useTheme,
  alpha,
  Paper,
  Stack
} from '@mui/material'
import {
  Add,
  Search,
  FilterList,
  ViewModule,
  ViewList,
  Download,
  Upload,
  Refresh
} from '@mui/icons-material'
import { useCatequizandos } from '../../hooks/useCatequizandos'
import CatequizandosList from '../../components/catequizandos/CatequizandosList'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { useAuth } from '../../hooks/useAuth'

const CatequizandosPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const theme = useTheme()
  const {
    catequizandos,
    loading,
    error,
    pagination,
    fetchCatequizandos,
    deleteCatequizando,
    searchCatequizandos,
    setPagination
  } = useCatequizandos()

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    estado: 'todos',
    genero: 'todos',
    grupo: 'todos'
  })
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    catequizandoId: null
  })

  const canCreateEdit = ['admin', 'parroco', 'secretaria'].includes(user?.tipoPerfil)

  useEffect(() => {
    if (searchTerm.trim()) {
      const timer = setTimeout(() => {
        searchCatequizandos(searchTerm)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      fetchCatequizandos(filters)
    }
  }, [searchTerm, filters])

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, page }))
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setFilters({ estado: 'todos', genero: 'todos', grupo: 'todos' })
    fetchCatequizandos()
  }

  const handleView = (id) => {
    console.log('👁️ View catequizando:', id)
    // Por ahora navegar a editar, luego puedes crear una vista de detalles
    navigate(`/catequizandos/editar/${id}`)
  }

  const handleEdit = (id) => {
    console.log('✏️ Edit catequizando:', id)
    if (canCreateEdit) {
      navigate(`/catequizandos/editar/${id}`)
    } else {
      toast.warning('No tienes permisos para editar catequizandos')
    }
  }

  const handleDeleteClick = (id) => {
    setDeleteDialog({
      open: true,
      catequizandoId: id
    })
  }

  const handleDeleteConfirm = async () => {
    if (deleteDialog.catequizandoId) {
      await deleteCatequizando(deleteDialog.catequizandoId)
      setDeleteDialog({ open: false, catequizandoId: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, catequizandoId: null })
  }

  const handleExport = () => {
    // Implementar exportación
    console.log('Exportar catequizandos')
  }

  const handleImport = () => {
    // Implementar importación
    console.log('Importar catequizandos')
  }

  const getStatsCards = () => {
    const total = catequizandos.length
    const activos = catequizandos.filter(c => c.estado?.activo).length
    const masculinos = catequizandos.filter(c => c.genero === 'masculino').length
    const femeninos = catequizandos.filter(c => c.genero === 'femenino').length

    return [
      { label: 'Total', value: total, color: 'primary' },
      { label: 'Activos', value: activos, color: 'success' },
      { label: 'Masculino', value: masculinos, color: 'info' },
      { label: 'Femenino', value: femeninos, color: 'secondary' }
    ]
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 1
            }}
          >
            Catequizandos
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Gestiona la información de los catequizandos
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            size="small"
          >
            Actualizar
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExport}
            size="small"
          >
            Exportar
          </Button>
          
          {canCreateEdit && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/catequizandos/crear')}
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                }
              }}
            >
              Nuevo
            </Button>
          )}
        </Stack>
      </Box>

      {/* Estadísticas rápidas */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {getStatsCards().map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                textAlign: 'center',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                background: alpha(theme.palette[stat.color].main, 0.05),
                borderLeft: `4px solid ${theme.palette[stat.color].main}`
              }}
            >
              <Typography variant="h4" color={stat.color} fontWeight="bold">
                {loading ? <Skeleton width={40} /> : stat.value}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Filtros y Búsqueda */}
      <Card sx={{ mb: 3, overflow: 'visible' }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Búsqueda */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar por nombre, apellido o documento..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'transparent',
                    }
                  }
                }}
              />
            </Grid>
            
            {/* Controles de vista */}
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <Button
                  variant={showFilters ? "contained" : "outlined"}
                  startIcon={<FilterList />}
                  onClick={() => setShowFilters(!showFilters)}
                  size="small"
                >
                  Filtros
                </Button>
                
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Button
                    variant={viewMode === 'grid' ? "contained" : "outlined"}
                    onClick={() => setViewMode('grid')}
                    size="small"
                    sx={{ minWidth: 'auto', px: 1.5 }}
                  >
                    <ViewModule />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "contained" : "outlined"}
                    onClick={() => setViewMode('list')}
                    size="small"
                    sx={{ minWidth: 'auto', px: 1.5 }}
                  >
                    <ViewList />
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            {/* Filtros expandibles */}
            {showFilters && (
              <>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={filters.estado}
                      label="Estado"
                      onChange={(e) => handleFilterChange('estado', e.target.value)}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="activo">Activos</MenuItem>
                      <MenuItem value="inactivo">Inactivos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Género</InputLabel>
                    <Select
                      value={filters.genero}
                      label="Género"
                      onChange={(e) => handleFilterChange('genero', e.target.value)}
                    >
                      <MenuItem value="todos">Todos</MenuItem>
                      <MenuItem value="masculino">Masculino</MenuItem>
                      <MenuItem value="femenino">Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Grupo</InputLabel>
                    <Select
                      value={filters.grupo}
                      label="Grupo"
                      onChange={(e) => handleFilterChange('grupo', e.target.value)}
                    >
                      <MenuItem value="todos">Todos los grupos</MenuItem>
                      <MenuItem value="infantil">Infantil</MenuItem>
                      <MenuItem value="juvenil">Juvenil</MenuItem>
                      <MenuItem value="adulto">Adultos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Filtros activos */}
      {(searchTerm || filters.estado !== 'todos' || filters.genero !== 'todos' || filters.grupo !== 'todos') && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Filtros activos:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {searchTerm && (
              <Chip
                label={`Búsqueda: "${searchTerm}"`}
                onDelete={() => setSearchTerm('')}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.estado !== 'todos' && (
              <Chip
                label={`Estado: ${filters.estado}`}
                onDelete={() => handleFilterChange('estado', 'todos')}
                color="secondary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.genero !== 'todos' && (
              <Chip
                label={`Género: ${filters.genero}`}
                onDelete={() => handleFilterChange('genero', 'todos')}
                color="info"
                variant="outlined"
                size="small"
              />
            )}
            {filters.grupo !== 'todos' && (
              <Chip
                label={`Grupo: ${filters.grupo}`}
                onDelete={() => handleFilterChange('grupo', 'todos')}
                color="success"
                variant="outlined"
                size="small"
              />
            )}
          </Stack>
        </Box>
      )}

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Lista de Catequizandos */}
      <CatequizandosList
        catequizandos={catequizandos}
        loading={loading}
        error={error}
        pagination={pagination}
        onPageChange={handlePageChange}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        viewMode={viewMode}
      />

      {/* FAB para móvil */}
      {canCreateEdit && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => navigate('/catequizandos/crear')}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            display: { xs: 'flex', sm: 'none' },
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          }}
        >
          <Add />
        </Fab>
      )}

      {/* Dialog de Confirmación */}
      <ConfirmDialog
        open={deleteDialog.open}
        title="Eliminar Catequizando"
        message="¿Estás seguro de que deseas eliminar este catequizando? Esta acción no se puede deshacer."
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Eliminar"
        severity="error"
      />
    </Box>
  )
}

export default CatequizandosPage