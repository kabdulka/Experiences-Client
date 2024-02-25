import { Grid, InputAdornment, TextField } from "@mui/material"
import { Visibility } from "@mui/icons-material"
import { VisibilityOff } from "@mui/icons-material"
import IconButton from '@mui/material/IconButton';

interface InputProps {
    half?: boolean
    name: string
    label: string
    handleInputChange: (event) => void
    type: string
    autoFocus?: boolean
    handleShowPassword?: () => void
}

const Input: React.FC<InputProps> = ({ half, name, label, handleInputChange, type, autoFocus, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
            name={name}
            onChange={handleInputChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            // icon on right of input. show password
            InputProps = {
                name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}> 
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null
            }

        />
    </Grid>
  )
}

export default Input
