import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper,
  useTheme,
  alpha
} from '@mui/material'
import {
  People,
  Groups,
  Assignment,
  School,
  TrendingUp,
  Event,
  Notifications,
  PersonAdd,
  CalendarToday,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'

const StatCard = ({ title, value, icon, color = 'primary', trend, subtitle }) => {
  const theme = useTheme()
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette[color].main, 0.1)}, ${alpha(theme.palette[color].main, 0.05)})`,
        border: `1px solid ${alpha(theme.palette[color].main, 0.2)}`,
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4]
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography color="textSecondary" variant="body2" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: `${color}.main`, mt: 1 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: `${color}.main`, 
              width: 64, 
              height: 64,
              boxShadow: theme.shadows[3]
            }}
          >
            {icon}
          </Avatar>
        </Box>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp 
              fontSize="small" 
              color={trend > 0 ? "success" : "error"} 
            />
            <Typography 
              variant="body2" 
              color={trend > 0 ? "success.main" : "error.main"}
              fontWeight={600}
            >
              {trend > 0 ? '+' : ''}{trend}% este mes
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

const ActivityItem = ({ icon, title, description, time, type = 'info' }) => {
  const theme = useTheme()
  const colors = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.main,
    error: theme.palette.error.main,
    info: theme.palette.info.main
  }

  return (
    <ListItem sx={{ px: 0, py: 1 }}>
      <ListItemIcon>
        <Avatar 
          sx={{ 
            bgcolor: alpha(colors[type], 0.1),
            color: colors[type],
            width: 40,
            height: 40
          }}
        >
          {icon}
        </Avatar>
      </ListItemIcon>
      <ListItemText
        primary={title}
        secondary={
          <>
            <Typography variant="body2" color="textSecondary" component="span">
              {description}
            </Typography>
            <br />
            <Typography variant="caption" color="textSecondary" component="span">
              {time}
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}

const ProgressCard = ({ title, current, total, color = 'primary' }) => {
  const percentage = Math.round((current / total) * 100)
  
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h4" color={`${color}.main`} fontWeight="bold">
          {current}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          de {total}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        color={color}
        sx={{ 
          height: 8, 
          borderRadius: 4,
          mb: 1
        }}
      />
      <Typography variant="body2" color="textSecondary">
        {percentage}% completado
      </Typography>
    </Paper>
  )
}

const DashboardPage = () => {
  const { user } = useAuth()
  const theme = useTheme()

  const quickActions = [
    { 
      title: 'Nuevo Catequizando', 
      path: '/catequizandos/crear',
      icon: <PersonAdd />,
      color: 'primary'
    },
    { 
      title: 'Ver Grupos', 
      path: '/grupos',
      icon: <Groups />,
      color: 'secondary'
    },
    { 
      title: 'Registrar Asistencia', 
      path: '/asistencias',
      icon: <School />,
      color: 'success'
    },
    { 
      title: 'Ver Reportes', 
      path: '/reportes',
      icon: <TrendingUp />,
      color: 'info'
    }
  ]

  const recentActivities = [
    {
      icon: <PersonAdd />,
      title: 'Nuevo catequizando registrado',
      description: 'María García fue registrada en el grupo Juvenil',
      time: 'Hace 2 horas',
      type: 'success'
    },
    {
      icon: <Assignment />,
      title: 'Inscripción pendiente',
      description: 'Juan Pérez necesita completar documentos',
      time: 'Hace 4 horas',
      type: 'warning'
    },
    {
      icon: <School />,
      title: 'Clase completada',
      description: 'Grupo Infantil - Lección sobre los sacramentos',
      time: 'Hace 1 día',
      type: 'info'
    },
    {
      icon: <Event />,
      title: 'Próximo evento',
      description: 'Primera Comunión programada para el domingo',
      time: 'En 3 días',
      type: 'info'
    }
  ]

  return (
    <Box>
      {/* Header de bienvenida */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}
        >
          ¡Bienvenido/a!
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h5" color="textSecondary">
            {user?.nombres || user?.username}
          </Typography>
          <Chip 
            label={user?.tipoPerfil?.toUpperCase()} 
            color="primary" 
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          />
          <Typography variant="body1" color="textSecondary">
            • {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>
      </Box>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Catequizandos"
            value="125"
            subtitle="8 nuevos este mes"
            icon={<People fontSize="large" />}
            color="primary"
            trend={12}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Grupos Activos"
            value="8"
            subtitle="3 niveles"
            icon={<Groups fontSize="large" />}
            color="secondary"
            trend={5}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inscripciones"
            value="98"
            subtitle="15 pendientes"
            icon={<Assignment fontSize="large" />}
            color="success"
            trend={8}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Asistencia Promedio"
            value="85%"
            subtitle="Esta semana"
            icon={<School fontSize="large" />}
            color="info"
            trend={3}
          />
        </Grid>
      </Grid>

      {/* Acciones rápidas */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Acciones Rápidas
          </Typography>
          <Grid container spacing={2}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  startIcon={action.icon}
                  sx={{ 
                    py: 2,
                    borderColor: `${action.color}.main`,
                    color: `${action.color}.main`,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette[action.color].main, 0.1),
                      borderColor: `${action.color}.dark`
                    }
                  }}
                >
                  {action.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Progreso semanal */}
        <Grid item xs={12} md={4}>
          <ProgressCard
            title="Asistencias Esta Semana"
            current={68}
            total={80}
            color="success"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ProgressCard
            title="Inscripciones Completadas"
            current={83}
            total={98}
            color="primary"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ProgressCard
            title="Evaluaciones Pendientes"
            current={12}
            total={25}
            color="warning"
          />
        </Grid>

        {/* Actividad reciente */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Actividad Reciente
                </Typography>
                <Button size="small" color="primary">
                  Ver todo
                </Button>
              </Box>
              
              <List>
                {recentActivities.map((activity, index) => (
                  <Box key={index}>
                    <ActivityItem {...activity} />
                    {index < recentActivities.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Próximos eventos */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximos Eventos
              </Typography>
              
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Primera Comunión"
                    secondary="Domingo 10 de Diciembre"
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Event color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Reunión de Catequistas"
                    secondary="Viernes 15 de Diciembre"
                  />
                </ListItem>
                
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Confirmación"
                    secondary="Sábado 23 de Diciembre"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage