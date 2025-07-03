import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Chip,
  useTheme
} from '@mui/material'
import {
  Dashboard,
  People,
  Groups,
  School,
  Assignment,
  BarChart,
  Settings,
  Church
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const menuItems = [
  {
    text: 'Dashboard',
    icon: <Dashboard />,
    path: '/dashboard',
    roles: ['admin', 'parroco', 'secretaria', 'catequista']
  },
  {
    text: 'Catequizandos',
    icon: <People />,
    path: '/catequizandos',
    roles: ['admin', 'parroco', 'secretaria', 'catequista']
  },
  {
    text: 'Grupos',
    icon: <Groups />,
    path: '/grupos',
    roles: ['admin', 'parroco', 'secretaria', 'catequista']
  },
  {
    text: 'Inscripciones',
    icon: <Assignment />,
    path: '/inscripciones',
    roles: ['admin', 'parroco', 'secretaria']
  },
  {
    text: 'Asistencias',
    icon: <School />,
    path: '/asistencias',
    roles: ['admin', 'parroco', 'secretaria', 'catequista']
  },
  {
    text: 'Reportes',
    icon: <BarChart />,
    path: '/reportes',
    roles: ['admin', 'parroco', 'secretaria']
  },
  {
    text: 'Parroquias',
    icon: <Church />,
    path: '/parroquias',
    roles: ['admin', 'parroco']
  },
  {
    text: 'Usuarios',
    icon: <Settings />,
    path: '/usuarios',
    roles: ['admin', 'parroco']
  }
]

const Sidebar = ({ open, onClose, variant = 'temporary' }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const theme = useTheme()

  const handleNavigation = (path) => {
    navigate(path)
    if (variant === 'temporary') {
      onClose()
    }
  }

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.tipoPerfil)
  )

  const getRoleColor = (role) => {
    const colors = {
      admin: 'error',
      parroco: 'primary',
      secretaria: 'secondary',
      catequista: 'success'
    }
    return colors[role] || 'default'
  }

  const getRoleLabel = (role) => {
    const labels = {
      admin: 'Administrador',
      parroco: 'Párroco',
      secretaria: 'Secretaria',
      catequista: 'Catequista'
    }
    return labels[role] || role
  }

  const drawerContent = (
    <Box sx={{ 
      width: 260, 
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header del Sidebar */}
      <Box sx={{ 
        p: 3, 
        background: theme.palette.primary.main,
        color: 'white'
      }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ⛪ Catequesis
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
          {user?.nombres || user?.username}
        </Typography>
        <Chip 
          label={getRoleLabel(user?.tipoPerfil)}
          color={getRoleColor(user?.tipoPerfil)}
          size="small"
          sx={{ 
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </Box>
      
      <Divider />
      
      {/* Menú de navegación */}
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {filteredMenuItems.map((item) => {
          const isSelected = location.pathname === item.path || 
                           (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          
          return (
            <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    }
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40,
                  color: isSelected ? 'white' : theme.palette.text.secondary
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: isSelected ? 600 : 400
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Footer del Sidebar */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="caption" color="textSecondary" align="center" display="block">
          Sistema de Catequesis v1.0
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 260,
          border: 'none',
          boxShadow: variant === 'persistent' ? theme.shadows[3] : 'none'
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export default Sidebar