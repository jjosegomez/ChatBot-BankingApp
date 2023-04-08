// ----------------------------------------------------------------------
import axios from 'axios';
import Cookies from "js-cookie";

function account() {

  const account = {
    displayName: 'Jackson Software',
    email: 'jacksonsoftware@example.com',
    photoURL: '/assets/images/avatars/avatar_default.jpg',
  }
  //isAuthenticated();
  // axios.

  return account;
};



export default account();

// Export additional values
let defaultHeaders = {
  "Content-Type": "application/json",
  "Authorization": "",
};
let apiBaseURL = "http://127.0.0.1:8000/api/";


export { defaultHeaders };
export { apiBaseURL };