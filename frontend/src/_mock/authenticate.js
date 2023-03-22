import axios from 'axios';
import Cookies from "js-cookie";

export default function isAuthenticated() {
    console.log(Cookies.get('Authorization'))
    
    const token = Cookies.get("Authorization");
    //debugger;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    };
  
    if (token === undefined) {
      return false;
    }
  
    try {
      const response = axios.get("http://127.0.0.1:8000/api/users/", {
        headers: headers,
      });
      console.log(response.data);
      const data = response.json();
      return response.status === 200 && data.authenticated;
    } catch (error) {
      console.error(error);
    }
  };