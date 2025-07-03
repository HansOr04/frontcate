import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Badge,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material'
import {
  Menu as MenuIcon,
  AccountCircle,
  Settings,
  Logout,
  Notifications,
  Brightness4,
  Brightness7
} from '@mui/icons-material'
import { useAuth } from '../../hooks/useAuth'

const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth()
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificationsAnchor, setNotificationsAnchor] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget)
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null)
  }

  const handleLogout = async () => {
    handleMenuClose()
    await logout()
  }

  const getUserInitials = () => {
    const name = user?.nombres || user?.username || 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getRoleColor = (role) => {
    const colors = {
      admin: '#f44336',
      parroco: '#2196f3',
      secretaria: '#9c27b0',
      catequista: '#4caf50'
    }
    return colors[role] || '#757575'
  }

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(10px)',
        backgroundColor: alpha(theme.palette.background.paper, 0.95)
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          sx={{ 
            mr: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1)
            }
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Sistema de Catequesis
          </Typography>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              display: { xs: 'block', sm: 'none' }
            }}
          >
            Catequesis
          </Typography>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Notifications */}
          <Tooltip title="Notificaciones">
            <IconButton
              size="large"
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Info */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            ml: 1
          }}>
            <Box sx={{ 
              display: { xs: 'none', sm: 'block' },
              textAlign: 'right'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {user?.nombres || user?.username}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: getRoleColor(user?.tipoPerfil),
                  fontWeight: 500,
                  textTransform: 'capitalize'
                }}
              >
                {user?.tipoPerfil}
              </Typography>
            </Box>
            
            <Tooltip title="Cuenta">
              <IconButton
                size="large"
                edge="end"
                aria-label="account"
                onClick={handleMenuOpen}
                sx={{
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    backgroundColor: getRoleColor(user?.tipoPerfil),
                    fontWeight: 'bold',
                    fontSize: '0.875rem'
                  }}
                >
                  {getUserInitials()}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1.5,
              minWidth: 200,
              '& .MuiMenuItem-root': {
                px: 2,
                py: 1.5
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <ListItemIcon>
              <AccountCircle fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Mi Perfil</Typography>
            </ListItemText>
          </MenuItem>
          
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Configuración</Typography>
            </ListItemText>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">Cerrar Sesión</Typography>
            </ListItemText>
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1.5,
              minWidth: 300,
              maxHeight: 400
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Typography variant="h6">Notificaciones</Typography>
          </Box>
          <MenuItem>
            <ListItemText
              primary="Nueva inscripción pendiente"
              secondary="Hace 2 horas"
            />
          </MenuItem>
          <MenuItem>
            <ListItemText
              primary="Recordatorio: Clase mañana"
              secondary="Hace 1 día"
            />
          </MenuItem>
          <MenuItem>
            <ListItemText
              primary="Pago pendiente"
              secondary="Hace 2 días"
            />
          </MenuItem>
          <Divider />
          <MenuItem sx={{ justifyContent: 'center' }}>
            <Typography variant="body2" color="primary">
              Ver todas las notificaciones
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header