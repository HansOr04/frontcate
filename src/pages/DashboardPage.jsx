import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip
} from '@mui/material'
import {
  People,
  Groups,
  Assignment,
  School
} from '@mui/icons-material'
import { useAuth } from '../hooks/useAuth'

const StatCard = ({ title, value, icon, color = 'primary' }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4">
            {value}
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: `${color}.main`, width: 56, height: 56 }}>
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
)

const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Bienvenido, {user?.nombres || user?.username}
        </Typography>
        <Chip 
          label={user?.tipoPerfil?.toUpperCase()} 
          color="primary" 
          variant="outlined" 
        />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Catequizandos"
            value="125"
            icon={<People />}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Grupos Activos"
            value="8"
            icon={<Groups />}
            color="secondary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Inscripciones"
            value="98"
            icon={<Assignment />}
            color="success"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Asistencias Hoy"
            value="45"
            icon={<School />}
            color="warning"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actividad Reciente
              </Typography>
              <Typography color="textSecondary">
                Próximamente: Registro de actividades del sistema
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recordatorios
              </Typography>
              <Typography color="textSecondary">
                Próximamente: Notificaciones y recordatorios
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage