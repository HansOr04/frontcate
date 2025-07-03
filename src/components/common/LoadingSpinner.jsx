import { Box, CircularProgress, Typography, useTheme, alpha } from '@mui/material'

const LoadingSpinner = ({ 
  message = 'Cargando...', 
  size = 60, 
  fullHeight = true,
  overlay = false 
}) => {
  const theme = useTheme()

  const containerSx = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    ...(fullHeight && {
      minHeight: overlay ? '200px' : '50vh'
    }),
    ...(overlay && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: alpha(theme.palette.background.paper, 0.8),
      backdropFilter: 'blur(4px)',
      zIndex: theme.zIndex.modal
    })
  }

  return (
    <Box sx={containerSx}>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress 
          size={size} 
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            animationDuration: '1.5s'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: size * 0.3,
          }}
        >
          ⛪
        </Box>
      </Box>
      
      <Typography 
        variant="h6" 
        color="textSecondary"
        sx={{
          fontWeight: 500,
          textAlign: 'center',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.7 },
            '50%': { opacity: 1 }
          },
          animation: 'pulse 2s infinite'
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default LoadingSpinner