import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box
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

  const handleNavigation = (path) => {
    navigate(path)
    if (variant === 'temporary') {
      onClose()
    }
  }

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.tipoPerfil)
  )

  const drawerContent = (
    <Box sx={{ width: 250, height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          Catequesis
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.tipoPerfil?.toUpperCase()}
        </Typography>
      </Box>
      
      <Divider />
      
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
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
          width: 250,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export default Sidebar