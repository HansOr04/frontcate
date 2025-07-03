// Configuración de la API
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://catequesisbackmongo.onrender.com/api'
  : 'http://localhost:3000/api'

// Variables de entorno específicas
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: import.meta.env.PROD ? 30000 : 10000, // 30s en prod, 10s en dev
  ENVIRONMENT: import.meta.env.MODE,
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV
}

// Roles de usuario
export const ROLES = {
  ADMIN: 'admin',
  PARROCO: 'parroco',
  SECRETARIA: 'secretaria',
  CATEQUISTA: 'catequista',
  CONSULTA: 'consulta'
}

// Etiquetas de roles para UI
export const ROLES_LABELS = {
  [ROLES.ADMIN]: 'Administrador',
  [ROLES.PARROCO]: 'Párroco',
  [ROLES.SECRETARIA]: 'Secretaria',
  [ROLES.CATEQUISTA]: 'Catequista',
  [ROLES.CONSULTA]: 'Consulta'
}

// Géneros
export const GENEROS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' }
]

// Estados civiles
export const ESTADOS_CIVILES = [
  { value: 'soltero', label: 'Soltero/a' },
  { value: 'casado', label: 'Casado/a' },
  { value: 'union_libre', label: 'Unión Libre' },
  { value: 'divorciado', label: 'Divorciado/a' },
  { value: 'viudo', label: 'Viudo/a' }
]

// Tipos de documento
export const TIPOS_DOCUMENTO = [
  { value: 'cedula', label: 'Cédula' },
  { value: 'pasaporte', label: 'Pasaporte' },
  { value: 'tarjeta_identidad', label: 'Tarjeta de Identidad' }
]

// Estados de inscripción
export const ESTADOS_INSCRIPCION = [
  { value: 'pendiente', label: 'Pendiente', color: 'warning' },
  { value: 'activa', label: 'Activa', color: 'success' },
  { value: 'suspendida', label: 'Suspendida', color: 'error' },
  { value: 'completada', label: 'Completada', color: 'info' },
  { value: 'retirada', label: 'Retirada', color: 'default' }
]

// Estados de grupo
export const ESTADOS_GRUPO = [
  { value: 'planificacion', label: 'Planificación', color: 'info' },
  { value: 'activo', label: 'Activo', color: 'success' },
  { value: 'suspendido', label: 'Suspendido', color: 'warning' },
  { value: 'finalizado', label: 'Finalizado', color: 'default' }
]

// Días de la semana
export const DIAS_SEMANA = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miércoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sábado' },
  { value: 'domingo', label: 'Domingo' }
]

// Tipos de clase
export const TIPOS_CLASE = [
  { value: 'regular', label: 'Regular' },
  { value: 'extraordinaria', label: 'Extraordinaria' },
  { value: 'examen', label: 'Examen' },
  { value: 'retiro', label: 'Retiro' },
  { value: 'celebracion', label: 'Celebración' },
  { value: 'evento', label: 'Evento' }
]

// Motivos de ausencia
export const MOTIVOS_AUSENCIA = [
  { value: 'enfermedad', label: 'Enfermedad' },
  { value: 'viaje', label: 'Viaje' },
  { value: 'compromiso_familiar', label: 'Compromiso Familiar' },
  { value: 'clima', label: 'Clima' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'otro', label: 'Otro' },
  { value: 'no_justificada', label: 'No Justificada' }
]

// Métodos de pago
export const METODOS_PAGO = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'transferencia', label: 'Transferencia' },
  { value: 'cheque', label: 'Cheque' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'otro', label: 'Otro' }
]

// Sacramentos
export const SACRAMENTOS = [
  { value: 'bautismo', label: 'Bautismo' },
  { value: 'primera_comunion', label: 'Primera Comunión' },
  { value: 'confirmacion', label: 'Confirmación' },
  { value: 'matrimonio', label: 'Matrimonio' }
]

// Relaciones familiares
export const RELACIONES_FAMILIARES = [
  { value: 'padre', label: 'Padre' },
  { value: 'madre', label: 'Madre' },
  { value: 'tutor', label: 'Tutor/a' },
  { value: 'abuelo', label: 'Abuelo/a' },
  { value: 'tio', label: 'Tío/a' },
  { value: 'hermano', label: 'Hermano/a' },
  { value: 'otro', label: 'Otro' }
]

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 15, 25, 50],
  MAX_PAGE_SIZE: 100
}

// Configuración de fechas
export const DATE_CONFIG = {
  FORMAT: 'DD/MM/YYYY',
  FORMAT_WITH_TIME: 'DD/MM/YYYY HH:mm',
  TIME_FORMAT: 'HH:mm',
  MIN_AGE: 4,
  MAX_AGE: 99
}

// Configuración de validaciones
export const VALIDATION_CONFIG = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_DOCUMENT_LENGTH: 6,
  MAX_DOCUMENT_LENGTH: 20,
  MIN_PHONE_LENGTH: 7,
  MAX_PHONE_LENGTH: 20
}

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  AUTO_HIDE_DURATION: 6000, // 6 segundos
  MAX_SNACKBARS: 3,
  DEFAULT_VARIANT: 'info'
}

// URLs y endpoints específicos
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  USERS: '/usuarios',
  PARISHES: '/parroquias',
  LEVELS: '/niveles',
  CATECHISTS: '/catequizandos',
  GROUPS: '/grupos',
  REGISTRATIONS: '/inscripciones',
  ATTENDANCE: '/asistencias',
  HEALTH: '/health',
  STATS: '/stats'
}

// Configuración de colores para estados
export const STATUS_COLORS = {
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  default: '#9e9e9e'
}

// Configuración de navegación
export const NAVIGATION_CONFIG = {
  DRAWER_WIDTH: 240,
  MINI_DRAWER_WIDTH: 60,
  HEADER_HEIGHT: 64
}

// Configuración para desarrollo/debug
export const DEBUG_CONFIG = {
  ENABLE_LOGS: import.meta.env.DEV,
  ENABLE_API_LOGS: import.meta.env.DEV,
  ENABLE_PERFORMANCE_LOGS: import.meta.env.DEV
}

// Información de la aplicación
export const APP_INFO = {
  NAME: 'Sistema de Catequesis',
  VERSION: '1.0.0',
  DESCRIPTION: 'Sistema de gestión para catequesis parroquial',
  AUTHOR: 'Sistema de Catequesis',
  YEAR: new Date().getFullYear()
}

// Configuración de almacenamiento local
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences'
}