export const API_BASE_URL = 'http://localhost:3000/api'

export const ROLES = {
  ADMIN: 'admin',
  PARROCO: 'parroco',
  SECRETARIA: 'secretaria',
  CATEQUISTA: 'catequista'
}

export const GENEROS = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' }
]

export const ESTADOS_CIVILES = [
  { value: 'soltero', label: 'Soltero/a' },
  { value: 'casado', label: 'Casado/a' },
  { value: 'union_libre', label: 'Unión Libre' },
  { value: 'divorciado', label: 'Divorciado/a' },
  { value: 'viudo', label: 'Viudo/a' }
]

export const TIPOS_DOCUMENTO = [
  { value: 'cedula', label: 'Cédula' },
  { value: 'pasaporte', label: 'Pasaporte' },
  { value: 'tarjeta_identidad', label: 'Tarjeta de Identidad' }
]