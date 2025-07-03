import dayjs from 'dayjs'

export const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY')
}

export const formatDateTime = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export const formatAge = (birthDate) => {
  return dayjs().diff(dayjs(birthDate), 'year')
}

export const formatPhone = (phone) => {
  if (!phone) return ''
  return phone.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3')
}

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}