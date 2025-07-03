import * as yup from 'yup'

// ==========================================
// SCHEMA DE LOGIN
// ==========================================
export const loginSchema = yup.object({
  username: yup
    .string()
    .required('El nombre de usuario es requerido')
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50, 'El nombre de usuario no puede exceder 50 caracteres')
    .trim(),
  
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres')
})

// ==========================================
// SCHEMA DE CATEQUIZANDO
// ==========================================
export const catequizandoSchema = yup.object({
  nombres: yup
    .string()
    .required('Los nombres son requeridos')
    .min(2, 'Los nombres deben tener al menos 2 caracteres')
    .max(50, 'Los nombres no pueden exceder 50 caracteres')
    .trim(),
  
  apellidos: yup
    .string()
    .required('Los apellidos son requeridos')
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no pueden exceder 50 caracteres')
    .trim(),
  
  fechaNacimiento: yup
    .mixed()
    .required('La fecha de nacimiento es requerida')
    .test('is-valid-date', 'Fecha inválida', function(value) {
      if (!value) return false
      // Si es dayjs object
      if (value && typeof value.isValid === 'function') {
        return value.isValid()
      }
      // Si es Date object
      if (value instanceof Date) {
        return !isNaN(value.getTime())
      }
      return false
    }),
  
  documentoIdentidad: yup
    .string()
    .required('El documento de identidad es requerido')
    .min(6, 'El documento debe tener al menos 6 caracteres')
    .max(20, 'El documento no puede exceder 20 caracteres')
    .trim(),
  
  tipoDocumento: yup
    .string()
    .required('El tipo de documento es requerido')
    .oneOf(['cedula', 'pasaporte', 'licencia'], 'Tipo de documento inválido'),
  
  genero: yup
    .string()
    .required('El género es requerido')
    .oneOf(['masculino', 'femenino'], 'Género inválido'),
  
  estadoCivil: yup
    .string()
    .required('El estado civil es requerido')
    .oneOf(['soltero', 'casado', 'divorciado', 'viudo', 'union_libre'], 'Estado civil inválido'),
  
  // Validación anidada para contacto
  contacto: yup.object({
    direccion: yup
      .string()
      .required('La dirección es requerida')
      .min(5, 'La dirección debe tener al menos 5 caracteres')
      .max(255, 'La dirección no puede exceder 255 caracteres')
      .trim(),
    
    telefono: yup
      .string()
      .required('El teléfono es requerido')
      .min(7, 'El teléfono debe tener al menos 7 caracteres')
      .max(20, 'El teléfono no puede exceder 20 caracteres')
      .matches(/^[\d\-\s\+\(\)]+$/, 'Formato de teléfono inválido')
      .trim(),
    
    ciudad: yup
      .string()
      .required('La ciudad es requerida')
      .min(2, 'La ciudad debe tener al menos 2 caracteres')
      .max(50, 'La ciudad no puede exceder 50 caracteres')
      .trim(),
    
    email: yup
      .string()
      .email('Email inválido')
      .nullable()
      .transform((value) => value === '' ? null : value)
  }).required('La información de contacto es requerida'),
  
  // Validación anidada para responsable (opcional)
  responsable: yup.object({
    nombres: yup
      .string()
      .nullable()
      .transform((value) => value === '' ? null : value)
      .max(50, 'Los nombres no pueden exceder 50 caracteres'),
    
    apellidos: yup
      .string()
      .nullable()
      .transform((value) => value === '' ? null : value)
      .max(50, 'Los apellidos no pueden exceder 50 caracteres'),
    
    telefono: yup
      .string()
      .nullable()
      .transform((value) => value === '' ? null : value)
      .min(7, 'El teléfono debe tener al menos 7 caracteres')
      .max(20, 'El teléfono no puede exceder 20 caracteres')
      .matches(/^[\d\-\s\+\(\)]*$/, 'Formato de teléfono inválido'),
    
    relacion: yup
      .string()
      .nullable()
      .oneOf(['madre', 'padre', 'tutor', 'abuelo', 'tio', 'hermano', 'otro', null])
  }).nullable()
})

// ==========================================
// SCHEMA DE USUARIO
// ==========================================
export const usuarioSchema = yup.object({
  username: yup
    .string()
    .required('El nombre de usuario es requerido')
    .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
    .max(50, 'El nombre de usuario no puede exceder 50 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Solo se permiten letras, números y guiones bajos')
    .trim(),
  
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es requerido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
  
  nombres: yup
    .string()
    .required('Los nombres son requeridos')
    .min(2, 'Los nombres deben tener al menos 2 caracteres')
    .max(50, 'Los nombres no pueden exceder 50 caracteres')
    .trim(),
  
  apellidos: yup
    .string()
    .required('Los apellidos son requeridos')
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no pueden exceder 50 caracteres')
    .trim(),
  
  tipoPerfil: yup
    .string()
    .required('El tipo de perfil es requerido')
    .oneOf(['admin', 'parroco', 'secretaria', 'catequista'], 'Tipo de perfil inválido'),
  
  telefono: yup
    .string()
    .nullable()
    .transform((value) => value === '' ? null : value)
    .min(7, 'El teléfono debe tener al menos 7 caracteres')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .matches(/^[\d\-\s\+\(\)]*$/, 'Formato de teléfono inválido')
})

// ==========================================
// SCHEMA DE CAMBIO DE CONTRASEÑA
// ==========================================
export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .required('La contraseña actual es requerida'),
  
  newPassword: yup
    .string()
    .required('La nueva contraseña es requerida')
    .min(6, 'La nueva contraseña debe tener al menos 6 caracteres')
    .max(100, 'La nueva contraseña no puede exceder 100 caracteres'),
  
  confirmPassword: yup
    .string()
    .required('Confirma la nueva contraseña')
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden')
})

// ==========================================
// SCHEMA DE PARROQUIA
// ==========================================
export const parroquiaSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre de la parroquia es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  
  direccion: yup
    .string()
    .required('La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(255, 'La dirección no puede exceder 255 caracteres')
    .trim(),
  
  telefono: yup
    .string()
    .required('El teléfono es requerido')
    .min(7, 'El teléfono debe tener al menos 7 caracteres')
    .max(20, 'El teléfono no puede exceder 20 caracteres')
    .matches(/^[\d\-\s\+\(\)]+$/, 'Formato de teléfono inválido')
    .trim(),
  
  email: yup
    .string()
    .email('Email inválido')
    .nullable()
    .transform((value) => value === '' ? null : value)
})

// ==========================================
// SCHEMA DE GRUPO
// ==========================================
export const grupoSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre del grupo es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .trim(),
  
  descripcion: yup
    .string()
    .nullable()
    .transform((value) => value === '' ? null : value)
    .max(500, 'La descripción no puede exceder 500 caracteres'),
  
  capacidadMaxima: yup
    .number()
    .required('La capacidad máxima es requerida')
    .positive('La capacidad debe ser un número positivo')
    .integer('La capacidad debe ser un número entero')
    .min(5, 'La capacidad mínima es 5')
    .max(50, 'La capacidad máxima es 50'),
  
  horario: yup.object({
    dia: yup
      .string()
      .required('El día es requerido')
      .oneOf(['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'], 'Día inválido'),
    
    horaInicio: yup
      .string()
      .required('La hora de inicio es requerida')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)'),
    
    horaFin: yup
      .string()
      .required('La hora de fin es requerida')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)')
  }).required('El horario es requerido')
})

// ==========================================
// SCHEMA DE INSCRIPCIÓN
// ==========================================
export const inscripcionSchema = yup.object({
  catequizando: yup
    .string()
    .required('El catequizando es requerido')
    .matches(/^[0-9a-fA-F]{24}$/, 'ID de catequizando inválido'),
  
  grupo: yup
    .string()
    .required('El grupo es requerido')
    .matches(/^[0-9a-fA-F]{24}$/, 'ID de grupo inválido'),
  
  observaciones: yup
    .string()
    .nullable()
    .transform((value) => value === '' ? null : value)
    .max(500, 'Las observaciones no pueden exceder 500 caracteres'),
  
  pagoInicial: yup
    .number()
    .nullable()
    .transform((value) => isNaN(value) ? null : value)
    .min(0, 'El pago inicial no puede ser negativo')
})

// ==========================================
// SCHEMA DE NIVEL
// ==========================================
export const nivelSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre del nivel es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .trim(),
  
  descripcion: yup
    .string()
    .required('La descripción es requerida')
    .min(5, 'La descripción debe tener al menos 5 caracteres')
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .trim(),
  
  orden: yup
    .number()
    .required('El orden es requerido')
    .integer('El orden debe ser un número entero')
    .min(1, 'El orden mínimo es 1')
    .max(20, 'El orden máximo es 20'),
  
  edadMinima: yup
    .number()
    .nullable()
    .transform((value) => isNaN(value) ? null : value)
    .min(4, 'La edad mínima debe ser al menos 4 años')
    .max(99, 'La edad mínima no puede exceder 99 años'),
  
  edadMaxima: yup
    .number()
    .nullable()
    .transform((value) => isNaN(value) ? null : value)
    .min(4, 'La edad máxima debe ser al menos 4 años')
    .max(99, 'La edad máxima no puede exceder 99 años')
    .test('edad-maxima-valida', 'La edad máxima debe ser mayor o igual a la edad mínima', function(value) {
      const { edadMinima } = this.parent
      if (edadMinima && value) {
        return value >= edadMinima
      }
      return true
    })
})

// ==========================================
// FUNCIONES DE VALIDACIÓN AUXILIARES
// ==========================================

// Validar ObjectId de MongoDB
export const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id)
}

// Validar email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validar teléfono
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\-\s\+\(\)]+$/
  return phoneRegex.test(phone) && phone.length >= 7 && phone.length <= 20
}

// Validar fecha
export const isValidDate = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  return !isNaN(dateObj.getTime())
}

// Validar edad mínima
export const isValidAge = (birthDate, minAge = 4) => {
  if (!birthDate) return false
  const today = new Date()
  const birth = new Date(birthDate)
  const age = Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000))
  return age >= minAge
}

// ==========================================
// MENSAJES DE ERROR PERSONALIZADOS
// ==========================================
export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  EMAIL_INVALID: 'Email inválido',
  PHONE_INVALID: 'Formato de teléfono inválido',
  DATE_INVALID: 'Fecha inválida',
  OBJECTID_INVALID: 'ID inválido',
  PASSWORD_MIN: 'La contraseña debe tener al menos 6 caracteres',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  AGE_INVALID: 'La edad debe ser al menos 4 años',
  CAPACITY_INVALID: 'La capacidad debe estar entre 5 y 50'
}

// ==========================================
// CONFIGURACIÓN DE YUP EN ESPAÑOL
// ==========================================
yup.setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'Este campo es requerido'
  },
  string: {
    min: ({ min }) => `Debe tener al menos ${min} caracteres`,
    max: ({ max }) => `No puede exceder ${max} caracteres`,
    email: 'Email inválido'
  },
  number: {
    min: ({ min }) => `Debe ser al menos ${min}`,
    max: ({ max }) => `No puede exceder ${max}`,
    positive: 'Debe ser un número positivo',
    integer: 'Debe ser un número entero'
  }
})