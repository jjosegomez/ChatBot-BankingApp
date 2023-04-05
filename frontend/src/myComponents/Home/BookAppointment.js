import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography, Box, Container, Button, Link } from '@mui/material';
import { Block } from '@mui/icons-material';

const BookAppointment = () => {
  return (
    <Box sx={{display: "flex", flexFlow: "column", justifyContent:"center", justifyContent:"center", width:"70%",maxWidth:"1000px", margin: "auto", mb:5}}>
      <Typography sx={{mb:3}}>
        We offer personalized coaching services to help you achieve your goals and unlock your full potential. Our experienced coaches provide tailored support and guidance, whether you're looking to improve your career, relationships, health, or overall well-being. With a proven track record of delivering measurable results, we're confident we can help you achieve lasting success. If you're ready to take the next step, schedule a consultation with one of our expert coaches today.
      </Typography>
      <Button
      component={NavLink} to="/dashboard/bookappointment"
      variant="outlined" 
      sx={{margin:"auto", fontSize:"1.25rem", width:"200px", mb:2, mt:1}}>
      Book Now!</Button>
    </Box>
  );
};

export default BookAppointment;