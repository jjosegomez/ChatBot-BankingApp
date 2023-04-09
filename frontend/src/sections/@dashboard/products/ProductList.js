// @mui
import { Grid } from '@mui/material';
import CoachCard from './ProductCard';

// ----------------------------------------------------------------------


export default function ProductList(props) {
  return (
    <Grid container spacing={3}>
      {props.appointmentsByCoach.map((coach, index) => (
        <Grid item xs={12} sm={6} md={3}>
          <CoachCard thisCoach={coach} position={index} />
        </Grid>
      ))}
    </Grid>
  );
}
