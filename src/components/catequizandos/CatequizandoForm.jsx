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
  FormHelperText
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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(catequizandoSchema),
    defaultValues: initialData ? {
      ...initialData,
      fechaNacimiento: initialData.fechaNacimiento ? dayjs(initialData.fechaNacimiento) : null
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
        relacion: 'padre'
      }
    }
  })

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      fechaNacimiento: data.fechaNacimiento ? data.fechaNacimiento.toISOString() : null
    }
    onSubmit(formattedData)
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {initialData ? 'Editar Catequizando' : 'Nuevo Catequizando'}
        </Typography>

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
                label="Nombres"
                fullWidth
                error={!!errors.nombres}
                helperText={errors.nombres?.message}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('apellidos')}
                label="Apellidos"
                fullWidth
                error={!!errors.apellidos}
                helperText={errors.apellidos?.message}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="fechaNacimiento"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha de Nacimiento"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={loading}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.fechaNacimiento,
                        helperText: errors.fechaNacimiento?.message
                      }
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.genero}>
                <InputLabel>Género</InputLabel>
                <Controller
                  name="genero"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Género"
                      disabled={loading}
                    >
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
                label="Número de Documento"
                fullWidth
                error={!!errors.documentoIdentidad}
                helperText={errors.documentoIdentidad?.message}
                disabled={loading}
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
                label="Dirección"
                fullWidth
                multiline
                rows={2}
                error={!!errors.contacto?.direccion}
                helperText={errors.contacto?.direccion?.message}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('contacto.telefono')}
                label="Teléfono"
                fullWidth
                error={!!errors.contacto?.telefono}
                helperText={errors.contacto?.telefono?.message}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('contacto.ciudad')}
                label="Ciudad"
                fullWidth
                error={!!errors.contacto?.ciudad}
                helperText={errors.contacto?.ciudad?.message}
                disabled={loading}
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
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('responsable.apellidos')}
                label="Apellidos del Responsable"
                fullWidth
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                {...register('responsable.telefono')}
                label="Teléfono del Responsable"
                fullWidth
                disabled={loading}
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
                      <MenuItem value="padre">Padre</MenuItem>
                      <MenuItem value="madre">Madre</MenuItem>
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
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  disabled={loading}
                  startIcon={<Cancel />}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<Save />}
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