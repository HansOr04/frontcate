import {
  TableRow,
  TableCell,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme
} from '@mui/material'
import {
  MoreVert,
  Edit,
  Visibility,
  Delete
} from '@mui/icons-material'
import { useState } from 'react'
import { formatDate, formatAge } from '../../utils/formatters'

const CatequizandoRow = ({ 
  catequizando, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const theme = useTheme()
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
    <>
      <TableRow 
        hover
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '& .MuiTableCell-root': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          }
        }}
      >
        <TableCell>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {`${catequizando.nombres} ${catequizando.apellidos}`}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDate(catequizando.fechaNacimiento)}
            </Typography>
          </Box>
        </TableCell>
        
        <TableCell>
          <Typography variant="body2">
            {catequizando.documentoIdentidad}
          </Typography>
        </TableCell>
        
        <TableCell>
          <Typography variant="body2">
            {formatAge(catequizando.fechaNacimiento)} años
          </Typography>
        </TableCell>
        
        <TableCell>
          <Typography variant="body2">
            {catequizando.contacto?.telefono || '-'}
          </Typography>
        </TableCell>
        
        <TableCell>
          <Typography variant="body2">
            {catequizando.contacto?.ciudad || '-'}
          </Typography>
        </TableCell>
        
        <TableCell>
          <Chip
            label={getStatusText()}
            color={getStatusColor()}
            size="small"
            variant="outlined"
          />
        </TableCell>
        
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-label="more options"
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            minWidth: 150
          }
        }}
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
    </>
  )
}

export default CatequizandoRow