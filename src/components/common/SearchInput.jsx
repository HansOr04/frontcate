import { TextField, InputAdornment } from '@mui/material'
import { Search } from '@mui/icons-material'

const SearchInput = ({ value, onChange, placeholder = 'Buscar...', ...props }) => {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default SearchInput