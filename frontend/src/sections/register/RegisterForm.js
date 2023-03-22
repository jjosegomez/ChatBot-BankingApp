import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={3} style={{ display: 'flex', justifyContent: 'center' }} sx={{ width: '75%' }}>
        <TextField required name="first-name" label="First Name" />
        <TextField required name="last-name" label="Last Name" />
        <TextField required name="email" label="Email address" />

        <TextField
          required
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

      <FormControl>
        <FormLabel id="account type">Select the type of account you would like to register for:</FormLabel>
        <RadioGroup name="use-radio-group" defaultValue="Client Account">
          <FormControlLabel value="Client Account" label="Client Account" control={<Radio />} />
          <FormControlLabel value="Coach Account" label="Coach Account" control={<Radio />} />
        </RadioGroup>

      </FormControl>
      

      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}/>
        

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{ width: '75%' }}>
        Register
      </LoadingButton>
    </>
  );
}