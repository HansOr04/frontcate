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
  ListItemText,
  Avatar,
  Divider,
  Button,
  useTheme,
  alpha
} from '@mui/material'
import {
  MoreVert,
  Edit,
  Visibility,
  Delete,
  Person,
  Cake,
  Phone,
  LocationOn,
  Badge
} from '@mui/icons-material'
import { useState } from 'react'
import { formatDate, formatAge } from '../../utils/formatters'

const CatequizandoCard = ({ 
  catequizando, 
  onView, 
  onEdit, 
  onDelete 
}) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleAction = (action) => {
    handleMenuClose()
    action(catequizando._id)
  }

  const handleCardClick = (event) => {
    // Evitar click si se hizo click en el menú
    if (event.target.closest('.menu-button')) {
      return
    }
    console.log('🖱️ Card clicked, calling onView for:', catequizando._id)
    onView(catequizando._id)
  }

  const getStatusColor = () => {
    if (!catequizando.estado?.activo) return 'error'
    return 'success'
  }

  const getStatusText = () => {
    if (!catequizando.estado?.activo) return 'Inactivo'
    return 'Activo'
  }

  const getInitials = () => {
    const nombres = catequizando.nombres?.split(' ')[0] || ''
    const apellidos = catequizando.apellidos?.split(' ')[0] || ''
    return `${nombres.charAt(0)}${apellidos.charAt(0)}`.toUpperCase()
  }

  const getAvatarColor = () => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main
    ]
    const index = catequizando._id?.length % colors.length || 0
    return colors[index]
  }

  const getGenderColor = () => {
    if (catequizando.genero === 'masculino') return theme.palette.info.main
    if (catequizando.genero === 'femenino') return theme.palette.secondary.main
    return theme.palette.grey[500]
  }

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.palette.divider}`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
          borderColor: theme.palette.primary.main,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${getAvatarColor()}, ${alpha(getAvatarColor(), 0.6)})`,
        }
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header con avatar y menú */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start', 
          mb: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Avatar
              sx={{
                backgroundColor: getAvatarColor(),
                width: 48,
                height: 48,
                fontWeight: 'bold',
                boxShadow: theme.shadows[3]
              }}
            >
              {getInitials()}
            </Avatar>
            
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1rem',
                  lineHeight: 1.2,
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {`${catequizando.nombres} ${catequizando.apellidos}`}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={getStatusText()}
                  color={getStatusColor()}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
                {catequizando.genero && (
                  <Chip
                    label={catequizando.genero === 'masculino' ? 'M' : 'F'}
                    size="small"
                    sx={{
                      backgroundColor: alpha(getGenderColor(), 0.1),
                      color: getGenderColor(),
                      fontWeight: 'bold',
                      minWidth: 24,
                      '& .MuiChip-label': {
                        px: 0.5
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
          
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-label="more options"
            className="menu-button"
            sx={{
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            <MoreVert />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Información del catequizando */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Badge fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
              {catequizando.documentoIdentidad}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Cake fontSize="small" sx={{ color: theme.palette.text.secondary }} />
            <Box>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                {formatAge(catequizando.fechaNacimiento)} años
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {formatDate(catequizando.fechaNacimiento)}
              </Typography>
            </Box>
          </Box>

          {catequizando.contacto?.telefono && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Phone fontSize="small" sx={{ color: theme.palette.text.secondary }} />
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                {catequizando.contacto.telefono}
              </Typography>
            </Box>
          )}

          {catequizando.contacto?.ciudad && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <LocationOn fontSize="small" sx={{ color: theme.palette.text.secondary }} />
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ 
                  fontSize: '0.875rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {catequizando.contacto.ciudad}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Información adicional */}
        <Box sx={{ 
          mt: 2, 
          pt: 2, 
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.5)}`
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="caption" color="textSecondary" display="block">
                Estado Civil: {catequizando.estadoCivil || 'No especificado'}
              </Typography>
              {catequizando.responsable?.nombres && (
                <Typography variant="caption" color="textSecondary" display="block">
                  Responsable: {catequizando.responsable.nombres}
                </Typography>
              )}
            </Box>
            <Button
              size="small"
              color="primary"
              onClick={(e) => {
                e.stopPropagation()
                console.log('🔍 Ver más clicked for:', catequizando._id)
                onView(catequizando._id)
              }}
              sx={{ 
                fontSize: '0.75rem',
                minWidth: 'auto',
                px: 1
              }}
            >
              Ver más →
            </Button>
          </Box>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 8,
          sx: {
            minWidth: 160,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
        
        <Divider />
        
        <MenuItem onClick={() => handleAction(onDelete)} sx={{ color: 'error.main' }}>
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