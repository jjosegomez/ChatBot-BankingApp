import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axios from 'axios';
import { apiBaseURL } from 'src/_mock/account';
import { defaultHeaders } from 'src/_mock/account';
import { Alert } from '@mui/material';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleClick = () => {
    const url = apiBaseURL + "login/"
    console.log(email)
    console.log(password)

    const user = {
      "username": email,
      "email": email,
      "password": password,
    }

    axios.post(url, user, { withCredentials: true }).then(response => {

      // Set token as a cookie
      let date = new Date(response.data.Expires)
      document.cookie = `Authorization=${response.data.Authorization}; expires=${date.toUTCString()}; SameSite=None; Secure`;
      navigate('/dashboard', { replace: true });
    })
      .catch(error => {
        console.error(error);
        console.log("There was an error");
        setError("Invalid Credentials. Please Try Again.")
      });
    
  };

  return (
    <>
      <Stack spacing={3} style={{ display: 'flex', justifyContent: 'center' }} sx={{ width: '75%' }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField required name="email" label="Email address" onChange={(event) => setEmail(event.target.value)} />

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
          onChange={(event) => setPassword(event.target.value)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{ width: '75%' }}>
        Login
      </LoadingButton>
    </>
  );
}
