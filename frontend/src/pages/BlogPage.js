import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import account from 'src/_mock/account';
import { apiBaseURL } from 'src/_mock/account';
import { useState } from 'react';
import axios from 'axios';
import { defaultHeaders } from 'src/_mock/account';
import { Alert } from '@mui/material';
import { isAuthenticated } from 'src/_mock/account';
import Cookies from 'js-cookie';
// components




// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
  const [bio, setBio] = useState(account.profile.bio);
  const [location, setLocation] = useState(account.profile.location);
  const [birthdate, setDate] = useState(account.profile.birth_date);
  const [update, setUpdate] = useState(null);
  let ed;
  if (account.isCoach) {
    ed = account.profile.education;
  } else {
    ed = null
  }
  const [education, setEducation] = useState(ed);
  const handleClick = () => {

    const url = account.profile.url

    const token = Cookies.get("Authorization");
    const accessHeaders = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    };

    console.log(bio)
    console.log(location)
    console.log(education)
    console.log(dayjs(birthdate).toISOString().slice(0, 10))

    let data;
    if (account.isCoach) {
      data = {
        "bio": `${bio}`,
        "location": `${location}`,
        "birth_date": `${dayjs(birthdate).toISOString().slice(0, 10)}`,
        "education": `${education}`,
      }
    } else {
      data = {
        "bio": `${bio}`,
        "location": `${location}`,
        "birth_date": `${dayjs(birthdate).toISOString().slice(0, 10)}`,
      }
    }
    axios.patch(url, data, accessHeaders).then(response => {
      console.log(response)
      setUpdate("Your profile was successfully updated!");
      // Set token as a cookie
      // Wait for isAuthenticated() Promise to resolve
      isAuthenticated().then(authenticated => {
        if (authenticated) {
          console.log("authenticated was true")
        } else {
          console.log("authenticated was false")
          setUpdate("Invalid Credentials. Please Try Again.")
        }
      }).catch(error => {
        console.error(error);
        console.log("There was an error");
        setUpdate("Invalid Credentials. Please Try Again.")
      });
    })
      .catch(error => {
        console.error(error);
        console.log("There was an error");
        setUpdate("Invalid Credentials. Please Try Again.")
      });

  };
  return (
    <>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <Container alignItems="center">
        <Grid justifyContent="center" alignItems="center">
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              View or Edit Your User Profile
            </Typography>

          </Stack>

          {update && <Alert severity="success" style={{display: 'flex', justifyContent: 'center'}} >{update}</Alert>}
          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField disabled
              id="outlined-multiline-static"
              label="Name"
              defaultValue={account.displayName}
              sx={{ width: '50%' }}
            />
          </Grid>


          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={4}
              defaultValue={account.profile.bio}
              helperText="Please tell us a little bit about yourself, fun facts or whatever else you'd like!"
              inputProps={{ maxLength: 240 }}
              sx={{ width: '50%' }}
              onChange={(event) => setBio(event.target.value)}
            />
          </Grid>

          {account.isCoach ? <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="Education"
              multiline
              rows={2}
              defaultValue={account.profile.bio}
              helperText="Please include your educational background."
              inputProps={{ maxLength: 60 }}
              sx={{ width: '50%' }}
              onChange={(event) => setEducation(event.target.value)}
            />
          </Grid> : null}

          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="Location"
              defaultValue={account.profile.location}
              helperText="Please enter your location"
              inputProps={{ maxLength: 30 }}
              sx={{ width: '50%' }}
              onChange={(event) => setLocation(event.target.value)}
            />
          </Grid>

          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Birth Date"
                defaultValue={dayjs(account.profile.birth_date)}
                helperText="Please enter your location"
                onChange={(event) => setDate(event)}
              />
            </LocalizationProvider>
          </Grid>

          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" onClick={handleClick}>
              Update Profile
            </Button>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
