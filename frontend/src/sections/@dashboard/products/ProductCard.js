import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import account from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import { Button, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import Popover from '@mui/material/Popover';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { OpenWithTwoTone } from '@mui/icons-material';
import axios from 'axios';
import { defaultHeaders } from 'src/_mock/account';
import { Alert } from '@mui/material';
import { isAuthenticated } from 'src/_mock/account';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------


export default function CoachCard(props) {
  const [coachSelect, setCoachSelect] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [isFormControlDisabled, setIsFormControlDisabled] = React.useState(true);
  const [update, setUpdate] = React.useState(null);


  const handleClick = (event) => {
    setCoachSelect(event.currentTarget);
  };
  const handleClose = () => {
    setCoachSelect(null);
  };

  const open = Boolean(coachSelect);
  const id = open ? 'simple-popover' : undefined;


  let currCoach = {
    firstName: props.thisCoach.firstName,
    lastName: props.thisCoach.lastName,
    displayName: props.thisCoach.firstName + " " + props.thisCoach.lastName,
    education: props.thisCoach.education,
    appointments: props.thisCoach.appointments,
    bio: props.thisCoach.bio,
    image: `/assets/images/avatars/avatar_${(props.position % 24) + 1}.jpg`
  };

  let openDates = [];
  currCoach.appointments.forEach(appointment => {
    if (!openDates.includes(appointment.date)) {
      openDates.push(appointment.date)
    }
  });
  openDates = openDates.map(day => {
    return new Date(day)
  });
  // const { name, cover, price, colors, status, priceSale } = product;
  // Disable dates that are not in the allowed dates array
  const isWeekend = (date) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  var openTimes = []
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsFormControlDisabled(false);
    const dayChosen = date.toISOString().slice(0, 10)
    currCoach.appointments.forEach(appointment => {
      if (appointment.date === dayChosen) {
        let time = new Date(`${dayChosen} ${appointment.time}`)
        openTimes.push(time.toLocaleTimeString());
      }
    });


    console.log(openTimes)
    setItems(openTimes)
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmissionClick = (event) => {
    setCoachSelect(false);
    const dayChosen = selectedDate.toISOString().slice(0, 10)
    let url = ""
    // const date = new Date(`${dayChosen} ${selectedTime}`);
    // const time24 = date.toISOString().substr(11, 8);
    const time24 = convertTimeToMilitary(selectedTime);
    console.log(time24);
    currCoach.appointments.forEach(appointment => {
      if (appointment.date === dayChosen) {
        if (appointment.time === time24) {
          url = appointment.url
          console.log(url)
        }
      }
    });
    console.log(url)
    const token = Cookies.get("Authorization");
    const accessHeaders = {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    };

    

    let data;
    if (account.isCoach) {
      data = {
        "client": ""
      }
    } else {
      data = {
        "client": account.profile.url
      }
    }
    axios.patch(url, data, accessHeaders).then(response => {
      console.log(response)
      setUpdate("Appointment Confirmed!");
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
    
    <Card sx={{ maxWidth: 345, }}>
      {update && <Alert severity="success" style={{display: 'flex', justifyContent: 'center'}} >{update}</Alert>}
      <CardActionArea sx={{ pt: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Stack spacing={0} sx={{ p: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar
            alt={currCoach.firstName}
            src={currCoach.image}
            sx={{
              width: 175,
              height: 175,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

            }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" >
              {currCoach.displayName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Education:
            </Typography>
            <Typography variant="body2">
              {currCoach.education}
            </Typography>
          </CardContent>
          <Button size="large" onClick={handleClick}>
            Select Coach
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={coachSelect}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Card sx={{ maxWidth: 345 }}>
              <Stack spacing={2} sx={{ p: 3, justifyContent: 'center', alignItems: 'center' }}>

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    More About Me:
                  </Typography>
                  <Typography variant="body" color="text.secondary">
                    {currCoach.bio}
                  </Typography>
                  <Typography sx={{ marginTop: 2 }} variant="subtitle1">
                    Available Dates:
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={selectedDate}
                      minDate={dayjs(openDates[0])}
                      maxDate={dayjs(openDates.slice(-1))}
                      shouldDisableDate={isWeekend}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                  <Typography sx={{ marginTop: 2 }} variant="subtitle1">
                    Select a Time:
                  </Typography>
                  <FormControl fullWidth sx={{ marginTop: 1 }} disabled={isFormControlDisabled}>
                    <InputLabel id="demo-simple-select-label">Time</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      value={selectedTime}
                      disabled={isFormControlDisabled}
                      onChange={handleTimeChange}
                    >
                      {items.map((option1, index) => (
                        < MenuItem key={index} value={option1} >
                          {option1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button sx={{ marginTop: 2 }} size="large" color="primary" onClick={handleSubmissionClick}>
                    Book Appointment
                  </Button>
                </CardContent>

              </Stack>
            </Card>
          </Popover>
        </Stack>
      </CardActionArea>
    </Card >

  );
}

function convertTimeToMilitary(timeString) {
  const [hour, minute] = timeString.split(':');
  let militaryHour = parseInt(hour);
  const isPM = timeString.includes('PM');
  if (isPM && militaryHour !== 12) {
    militaryHour += 12;
  } else if (!isPM && militaryHour === 12) {
    militaryHour = 0;
  }
  return `${militaryHour.toString().padStart(2, '0')}:${minute}:00`;
}