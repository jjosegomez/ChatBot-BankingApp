import React from 'react';
import {Typography, Box, Container} from '@mui/material';

const Welcome = () => {
  return (
    <>
    <Box sx={{m:5, display: "flex", flexFlow: "row wrap", justifyContent:"space-around", alignItems:"center"}}>
        <Box sx={{display:"flex", flexFlow: 'column',maxWidth:"500px"}}>
            <Typography sx={{ m:2, mb:1, p:0, textAlign:"left"}} color="textPrimary" variant="h3">
                Find Your Perfect Life Coach Today!
            </Typography>
            <Typography sx={{mb:2, mt:4, ml:2,mr:2}}>
                Welcome to MindfulCoach, where you can find your perfect life coach. We help match you with a coach who understands your personality and goals, so you can achieve your full potential. Our easy-to-use platform lets you search for coaches based on your preferences and connect with them directly to schedule sessions. Let us help you find the support and guidance you need to succeed.
            </Typography>
        </Box>
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", overflow:"hidden"}}>
            <Box sx={{maxWidth:"500px", borderRadius:"5px", overflow:'hidden'}}>
                <img src='https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA'></img>
            </Box>
        </Box>
    </Box>
    </>
  );
};

export default Welcome;

