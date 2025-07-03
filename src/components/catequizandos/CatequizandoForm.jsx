import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Save, Cancel } from '@mui/icons-material'
import dayjs from 'dayjs'
import { catequizandoSchema } from '../../utils/validations'
import { GENEROS, ESTADOS_CIVILES, TIPOS_DOCUMENTO } from '../../utils/constants'

const CatequizandoForm = ({ 
  initialData = null, 
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  // Preparar datos iniciales
  const defaultValues = initialData ? {
    nombres: initialData.nombres || '',
    apellidos: initialData.apellidos || '',
    fechaNacimiento: initialData.fechaNacimiento ? dayjs(initialData.fechaNacimiento) : null,
    documentoIdentidad: initialData.documentoIdentidad || '',
    tipoDocumento: initialData.tipoDocumento || 'cedula',
    genero: initialData.genero || '',
    estadoCivil: initialData.estadoCivil || 'soltero',
    contacto: {
      direccion: initialData.contacto?.direccion || '',
      telefono: initialData.contacto?.telefono || '',
      email: initialData.contacto?.email || '',
      ciudad: initialData.contacto?.ciudad || ''
    },
    responsable: {
      nombres: initialData.responsable?.nombres || '',
      apellidos: initialData.responsable?.apellidos || '',
      telefono: initialData.responsable?.telefono || '',
      relacion: initialData.responsable?.relacion || 'madre'
    }
  } : {
    nombres: '',
    apellidos: '',
    fechaNacimiento: null,
    documentoIdentidad: '',
    tipoDocumento: 'cedula',
    genero: '',
    estadoCivil: 'soltero',
    contacto: {
      direccion: '',
      telefono: '',
      email: '',
      ciudad: ''
    },
    responsable: {
      nombres: '',
      apellidos: '',
      telefono: '',
      relacion: 'madre'
    }
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(catequizandoSchema),
    defaultValues
  })

  console.log('📝 Form errors:', errors)
  console.log('📝 Form data:', watch())

  // Actualizar la función onFormSubmit en CatequizandoForm.jsx

const onFormSubmit = (data) => {
  try {
    console.log('📝 Form submitted with raw data:', data)
    console.log('📅 Raw fechaNacimiento:', data.fechaNacimiento)
    console.log('📅 Es dayjs object?:', data.fechaNacimiento?.$isDayjsObject)
    
    // ✅ Limpiar y validar datos antes de enviar
    const cleanedData = {
      ...data,
      // Convertir fecha dayjs a string
      fechaNacimiento: data.fechaNacimiento && data.fechaNacimiento.isValid() 
        ? data.fechaNacimiento.format('YYYY-MM-DD') 
        : null,
      
      // Limpiar strings
      nombres: data.nombres?.trim(),
      apellidos: data.apellidos?.trim(),
      documentoIdentidad: data.documentoIdentidad?.trim(),
      
      // Limpiar contacto
      contacto: {
        direccion: data.contacto?.direccion?.trim(),
        telefono: data.contacto?.telefono?.trim().replace(/\s+/g, ''),
        ciudad: data.contacto?.ciudad?.trim(),
        email: data.contacto?.email?.trim() || undefined
      },
      
      // Limpiar responsable (convertir strings vacíos a null)
      responsable: {
        nombres: data.responsable?.nombres?.trim() || null,
        apellidos: data.responsable?.apellidos?.trim() || null,
        telefono: data.responsable?.telefono?.trim() || null,
        relacion: data.responsable?.relacion || 'madre'
      }
    }
    
    console.log('🧹 Cleaned data for API:', cleanedData)
    console.log('📅 Final fechaNacimiento:', cleanedData.fechaNacimiento)
    
    // Validación adicional antes de enviar
    if (!cleanedData.nombres || !cleanedData.apellidos || !cleanedData.documentoIdentidad) {
      console.error('❌ Faltan campos requeridos')
      return
    }
    
    if (!cleanedData.fechaNacimiento) {
      console.error('❌ Fecha de nacimiento inválida')
      return
    }
    
    if (!cleanedData.contacto?.direccion || !cleanedData.contacto?.telefono || !cleanedData.contacto?.ciudad) {
      console.error('❌ Información de contacto incompleta')
      return
    }
    
    onSubmit(cleanedData)
  } catch (error) {
    console.error('❌ Error formatting form data:', error)
  }
}

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {initialData ? 'Editar Catequizando' : 'Nuevo Catequizando'}
        </Typography>

        {/* Mostrar errores generales si los hay */}
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Por favor corrige los errores en el formulario antes de continuar.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            {/* Información Personal */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom>
                Información Personal
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('nombres')}
                label="Nombres *"
                fullWidth
                error={!!errors.nombres}
                helperText={errors.nombres?.message}
                disabled={loading}
                placeholder="Ej: Juan Carlos"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('apellidos')}
                label="Apellidos *"
                fullWidth
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
                disabled={loading}
                placeholder="Ej: Pérez García"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="fechaNacimiento"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    label="Fecha de Nacimiento *"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.genero}>
                <InputLabel>Género *</InputLabel>
                <Controller
                  name="genero"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Género *"
                      disabled={loading}
                    >
                      <MenuItem value="">
                        <em>Seleccionar género</em>
                      </MenuItem>
                      {GENEROS.map((genero) => (
                        <MenuItem key={genero.value} value={genero.value}>
                          {genero.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.genero && (
                  <FormHelperText>{errors.genero.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Documento</InputLabel>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Tipo de Documento"
                      disabled={loading}
                    >
                      {TIPOS_DOCUMENTO.map((tipo) => (
                        <MenuItem key={tipo.value} value={tipo.value}>
                          {tipo.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('documentoIdentidad')}
                label="Número de Documento *"
                fullWidth
                error={!!errors.documentoIdentidad}
                helperText={errors.documentoIdentidad?.message}
                disabled={loading}
                placeholder="Ej: 1234567890"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Estado Civil</InputLabel>
                <Controller
                  name="estadoCivil"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Estado Civil"
                      disabled={loading}
                    >
                      {ESTADOS_CIVILES.map((estado) => (
                        <MenuItem key={estado.value} value={estado.value}>
                          {estado.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* Información de Contacto */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                Información de Contacto
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('contacto.direccion')}
                label="Dirección *"
                fullWidth
                multiline
                rows={2}
                error={!!errors.contacto?.direccion}
                helperText={errors.contacto?.direccion?.message}
                disabled={loading}
                placeholder="Ej: Av. Principal 123, Sector Norte"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('contacto.telefono')}
                label="Teléfono *"
                fullWidth
                error={!!errors.contacto?.telefono}
                helperText={errors.contacto?.telefono?.message}
                disabled={loading}
                placeholder="Ej: 0987654321"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('contacto.ciudad')}
                label="Ciudad *"
                fullWidth
                error={!!errors.contacto?.ciudad}
                helperText={errors.contacto?.ciudad?.message}
                disabled={loading}
                placeholder="Ej: Quito"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('contacto.email')}
                label="Email (Opcional)"
                type="email"
                fullWidth
                error={!!errors.contacto?.email}
                helperText={errors.contacto?.email?.message}
                disabled={loading}
                placeholder="Ej: correo@ejemplo.com"
              />
            </Grid>

            {/* Información del Responsable */}
            <Grid item xs={12}>
              <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 2 }}>
                Información del Responsable
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('responsable.nombres')}
                label="Nombres del Responsable"
                fullWidth
                disabled={loading}
                placeholder="Ej: María Elena"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('responsable.apellidos')}
                label="Apellidos del Responsable"
                fullWidth
                disabled={loading}
                placeholder="Ej: García López"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('responsable.telefono')}
                label="Teléfono del Responsable"
                fullWidth
                disabled={loading}
                placeholder="Ej: 0987654321"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Relación</InputLabel>
                <Controller
                  name="responsable.relacion"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Relación"
                      disabled={loading}
                    >
                      <MenuItem value="madre">Madre</MenuItem>
                      <MenuItem value="padre">Padre</MenuItem>
                      <MenuItem value="tutor">Tutor/a</MenuItem>
                      <MenuItem value="abuelo">Abuelo/a</MenuItem>
                      <MenuItem value="tio">Tío/a</MenuItem>
                      <MenuItem value="hermano">Hermano/a</MenuItem>
                      <MenuItem value="otro">Otro</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            {/* Botones */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'flex-end', 
                mt: 3,
                pt: 3,
                borderTop: `1px solid ${theme => theme.palette.divider}`
              }}>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={loading}
                  startIcon={<Cancel />}
                  size="large"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<Save />}
                  size="large"
                >
                  {loading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Crear')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CatequizandoForm