import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, Grid, IconButton, InputAdornment, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import axios from 'axios';
import { apiBaseURL } from 'src/_mock/account';
import { defaultHeaders } from 'src/_mock/account';
import { Alert } from '@mui/material';
import { currentUser } from 'src/_mock/account';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCoach, setCoach] = useState(false);


  const handleClick = () => {
    const url = apiBaseURL + "register/"
    console.log(email)
    console.log(password)

    let user = {
      "first_name": firstName,
      "last_name": lastName,
      "username": email,
      "email": email,
      "password": password,
      "is_staff": isCoach ? true : false,
    }

    axios.post(url, user, { withCredentials: true }).then(response => {
      console.log(response)
      // Set token as a cookie
      let date = new Date(response.data.Expires)
      document.cookie = `Authorization=${response.data.token}; expires=${date.toUTCString()}; SameSite=None; Secure`;
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
        <TextField required name="first-name" label="First Name" onChange={(event) => setFirstName(event.target.value)} />
        <TextField required name="last-name" label="Last Name" onChange={(event) => setLastName(event.target.value)} />
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

        <FormControl>
          <FormLabel id="account type">Select the type of account you would like to register for:</FormLabel>
          <RadioGroup name="use-radio-group" defaultValue="Client Account">
            <FormControlLabel value="Client Account" label="Client Account" control={<Radio />} />
            <FormControlLabel value="Coach Account" label="Coach Account" control={<Radio />} onChange={(event) => setCoach(true)} />
          </RadioGroup>

        </FormControl>


      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />


      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick} sx={{ width: '75%' }}>
        Register
      </LoadingButton>
    </>
  );
}