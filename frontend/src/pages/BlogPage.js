import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography, TextField, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

// components




// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function BlogPage() {
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
            <Button variant="contained">
              Update Profile
            </Button>
          </Stack>


          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <FormControl disabled variant="standard">
              <InputLabel htmlFor="component-disabled">Name</InputLabel>
              <Input id="component-disabled" defaultValue="Composed TextField" />
              <FormHelperText>Disabled</FormHelperText>
            </FormControl>
          </Grid>
          

          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={4}
              defaultValue="Default Value"
              helperText="Please tell us a little bit about yourself, fun facts or whatever else you'd like!"
              inputProps={{ maxLength: 10 }}
              sx={{ width: '50%' }}
            />
          </Grid>

          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              id="outlined-multiline-static"
              label="Location"
              rows={4}
              defaultValue="Tampa, FL"
              helperText="Please enter your location"
              inputProps={{ maxLength: 10 }}
              sx={{ width: '50%' }}
            />
          </Grid>

          <Grid paddingTop={3} style={{ display: 'flex', justifyContent: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Birth Date"
                defaultValue={dayjs('2022-04-17')} 
                helperText="Please enter your location"
              />
            </LocalizationProvider>
          </Grid>
          
        </Grid>
      </Container>
    </>
  );
}
