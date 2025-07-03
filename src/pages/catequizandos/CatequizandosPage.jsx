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
  MenuItem
} from '@mui/material'
import {
  Add,
  Search,
  FilterList
} from '@mui/icons-material'
import { useCatequizandos } from '../../hooks/useCatequizandos'
import CatequizandosList from '../../components/catequizandos/CatequizandosList'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { useAuth } from '../../hooks/useAuth'

const CatequizandosPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
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
    genero: 'todos'
  })
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

  const handleView = (id) => {
    // Implementar vista de detalles cuando esté lista
    console.log('Ver catequizando:', id)
  }

  const handleEdit = (id) => {
    if (canCreateEdit) {
      navigate(`/catequizandos/editar/${id}`)
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Catequizandos
        </Typography>
        
        {canCreateEdit && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/catequizandos/crear')}
          >
            Nuevo Catequizando
          </Button>
        )}
      </Box>

      {/* Filtros y Búsqueda */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar por nombre, apellido o documento..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
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
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
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
          </Grid>
        </CardContent>
      </Card>

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
      />

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