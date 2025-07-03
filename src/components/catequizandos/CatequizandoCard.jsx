import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  MoreVert,
  Edit,
  Visibility,
  Delete,
  Person,
  Cake,
  Phone,
  LocationOn
} from '@mui/icons-material'
import { useState } from 'react'
import { formatDate, formatAge } from '../../utils/formatters'

const CatequizandoCard = ({ 
  catequizando, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAction = (action) => {
    handleMenuClose()
    action(catequizando._id)
  }

  const getStatusColor = () => {
    if (!catequizando.estado?.activo) return 'error'
    return 'success'
  }

  const getStatusText = () => {
    if (!catequizando.estado?.activo) return 'Inactivo'
    return 'Activo'
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              {`${catequizando.nombres} ${catequizando.apellidos}`}
            </Typography>
            <Chip
              label={getStatusText()}
              color={getStatusColor()}
              size="small"
              sx={{ mb: 1 }}
            />
          </Box>
          
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-label="more options"
          >
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person fontSize="small" color="action" />
            <Typography variant="body2" color="textSecondary">
              {catequizando.documentoIdentidad}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Cake fontSize="small" color="action" />
            <Typography variant="body2" color="textSecondary">
              {formatDate(catequizando.fechaNacimiento)} ({formatAge(catequizando.fechaNacimiento)} años)
            </Typography>
          </Box>

          {catequizando.contacto?.telefono && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Phone fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">
                {catequizando.contacto.telefono}
              </Typography>
            </Box>
          )}

          {catequizando.contacto?.ciudad && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2" color="textSecondary">
                {catequizando.contacto.ciudad}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAction(onView)}>
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ver Detalles</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => handleAction(onEdit)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={() => handleAction(onDelete)}>
          <ListItemIcon>
            <Delete fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Eliminar</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  )
}

export default CatequizandoCard