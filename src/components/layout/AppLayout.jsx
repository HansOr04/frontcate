import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, useTheme, useMediaQuery, Fab, Zoom } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import Header from './Header'
import Sidebar from './Sidebar'

const DRAWER_WIDTH = 260

const AppLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Controlar la visibilidad del botón de scroll to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar sidebar automáticamente en móvil al cambiar a desktop
  useEffect(() => {
    if (!isMobile && !sidebarOpen) {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default
    }}>
      {/* Header */}
      <Header onToggleSidebar={handleToggleSidebar} />
      
      {/* Contenido principal con sidebar */}
      <Box sx={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          onClose={handleCloseSidebar}
          variant={isMobile ? 'temporary' : 'persistent'}
        />
        
        {/* Área de contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            width: { 
              md: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' 
            },
            ml: { 
              md: sidebarOpen ? `${DRAWER_WIDTH}px` : 0 
            },
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            minHeight: 'calc(100vh - 64px)', // 64px es la altura del header
            position: 'relative'
          }}
        >
          {/* Contenedor con máximo ancho para mejor lectura */}
          <Box sx={{ 
            maxWidth: '1400px', 
            mx: 'auto',
            width: '100%'
          }}>
            <Outlet />
          </Box>
        </Box>
      </Box>

      {/* Botón flotante para scroll to top */}
      <Zoom in={showScrollTop}>
        <Fab
          onClick={handleScrollToTop}
          color="primary"
          size="small"
          aria-label="scroll back to top"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: theme.zIndex.fab
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Box>
  )
}

export default AppLayout