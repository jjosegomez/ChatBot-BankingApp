// ----------------------------------------------------------------------
import axios from 'axios';
import Cookies from "js-cookie";


// Values to export
let defaultHeaders = {
  "Content-Type": "application/json",
  "Authorization": "Token ",
};
let apiBaseURL = "http://127.0.0.1:8000/api/";
let currentUser = ""


let account = {
  authenticated: false,
  displayName: "Guest",
  email: 'guest@example.com',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
  appointments: '',
  availableAppointments: '',
  first_name: 'Guest',
  isCoach: false,
  profile: '',
}

const isLocalStorageAvailable = typeof localStorage !== 'undefined';

// If local storage is available and 'myAccountInfor' exists in local storage, set the value of 'account' to the value in local storage
if (isLocalStorageAvailable && localStorage.getItem('myAccountInfo')) {
  account = JSON.parse(localStorage.getItem('myAccountInfo'));
}


function isAuthenticated() {
  let authenticated = false;
  console.log(Cookies.get('Authorization'))
  const userUrl = apiBaseURL + "users/"
  const availableAppointmentsUrl = apiBaseURL + "availableappointments/"
  const coachPofileUrl = apiBaseURL + "coachprofile/"
  const clientPofileUrl = apiBaseURL + "clientprofile/"
  const appointmentsUrl = apiBaseURL + "getappointments/"
  const token = Cookies.get("Authorization");

  const accessHeaders = {
    headers: { Authorization: `Token ${token}` }
  };

  if (token === undefined) {
    return false;
  }

  return axios.get(userUrl, accessHeaders)
    .then(response => {
      console.log(response);
      account.displayName = response.data[0].first_name + " " + response.data[0].last_name;
      account.first_name = response.data[0].first_name
      account.email = response.data[0].email;
      account.isCoach = response.data[0].is_staff;
      account.authenticated = true;
      return axios.get(availableAppointmentsUrl);
    })
    .then(response => {
      console.log(response);
      account.availableAppointments = response.data.AppointmentsByCoach
      if (account.isCoach) {
        return axios.get(coachPofileUrl, accessHeaders);
      } else {
        return axios.get(clientPofileUrl, accessHeaders);
      }
    })
    .then(response => {
      console.log(response);
      account.profile = response.data[0]
      console.log(account)
      return axios.get(appointmentsUrl, accessHeaders);
    })
    .then(response => {
      console.log("here")
      console.log(response);
      // account.availableAppointments = response.data.AppointmentsByCoach
      account.appointments = response.data.appointments[0]
      console.log(account.appointments)
      account.appointments.forEach(appointment => {
        appointment["CoachName"] = findCoachName(appointment);
      });
      localStorage.setItem('myAccountInfo', JSON.stringify(account))
      return true;
    })
    .catch(error => {
      // If the error is related to an expired token, remove the item from local storage and return false
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('myAccountInfo');
      }
      return false;
    });


};

function findCoachName(appointment) {
  for (let i = 0; i < account.availableAppointments.length; i++) {
    if (account.availableAppointments[i].appointments[0].coach === appointment.coach) {
      return (account.availableAppointments[i].firstName + " " + account.availableAppointments[i].lastName);
    }
  }
}

export default account;
export { defaultHeaders, apiBaseURL, currentUser, isAuthenticated };

