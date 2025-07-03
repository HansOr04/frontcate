import * as yup from 'yup'

export const loginSchema = yup.object({
  username: yup
    .string()
    .required('El usuario es requerido')
    .min(3, 'El usuario debe tener al menos 3 caracteres'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
})

export const catequizandoSchema = yup.object({
  nombres: yup
    .string()
    .required('Los nombres son requeridos')
    .min(2, 'Los nombres deben tener al menos 2 caracteres')
    .max(50, 'Los nombres no pueden exceder 50 caracteres'),
  apellidos: yup
    .string()
    .required('Los apellidos son requeridos')
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(50, 'Los apellidos no pueden exceder 50 caracteres'),
  fechaNacimiento: yup
    .date()
    .required('La fecha de nacimiento es requerida')
    .max(new Date(), 'La fecha no puede ser futura'),
  documentoIdentidad: yup
    .string()
    .required('El documento de identidad es requerido')
    .min(6, 'El documento debe tener al menos 6 caracteres')
    .max(20, 'El documento no puede exceder 20 caracteres'),
  genero: yup
    .string()
    .required('El género es requerido')
    .oneOf(['masculino', 'femenino'], 'Género inválido'),
  'contacto.direccion': yup
    .string()
    .required('La dirección es requerida')
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  'contacto.telefono': yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[\d\-\s\+\(\)]+$/, 'Formato de teléfono inválido'),
  'contacto.ciudad': yup
    .string()
    .required('La ciudad es requerida')
})