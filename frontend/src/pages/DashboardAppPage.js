import { Helmet } from 'react-helmet-async';

// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
// components
// sections
import {

  AppWebsiteVisits,

} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

import Welcome from 'src/myComponents/Home/Welcome';
import BookAppointment from 'src/myComponents/Home/BookAppointment';

export default function DashboardAppPage() {
  

  return (
    <>
      <Helmet>
        <title> Home | MindfulCoach </title>
      </Helmet>
      <Container>
          <Typography variant="h4" sx={{ mb: 5 }}>
              Home
          </Typography>
      </Container>
      <Container sx={{
        displat: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(145, 158, 171, 0.16)",
        fontWeight: "700",
        border: "rgba(145, 158, 171, 0.16) solid 1px",
        borderRadius: "10px",
        margin: "auto",
        backgroundColor:"#fff",
      }}>
        <Welcome/>
        <BookAppointment/>
      </Container>


      {/*
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back to Mindful Coaching!
        </Typography>
        <Typography variant="h5" sx={{ mb: 5 }}>
          Here are your upcoming appointments:
        </Typography>
        <Grid container spacing={3}>


          <Grid item xs={12} md={6} lg={8}>

            <AppWebsiteVisits
              title="TO DO"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

        </Grid>
      </Container> */}
    </>
  );
}
