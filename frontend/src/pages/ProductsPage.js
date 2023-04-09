import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductList } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import account from 'src/_mock/account';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  return (
    <>
      <Helmet>
        <title> Book an Appointment </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Book an Appointment
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          
        </Stack>

        <ProductList appointmentsByCoach={account.availableAppointments} />
        
      </Container>
    </>
  );
}
