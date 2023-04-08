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

function account() {

  const account = {
    displayName: currentUser,
    email: 'jacksonsoftware@example.com',
    photoURL: '/assets/images/avatars/avatar_default.jpg',
  }
  //isAuthenticated();
  // axios.

  return account;
};



export default account();
export { defaultHeaders };
export { apiBaseURL };
export { currentUser };