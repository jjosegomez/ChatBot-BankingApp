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
  return account;
};



export default account();