import Navbar from './components/Navbar/Navbar/Navbar';
import Welcome from './components/Welcome/Welcome';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  // Axios connects to django backend
  console.log(axios.get("http://localhost:8000/api/users/"))

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users/")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
        <Navbar/>
        <Welcome/>
    </div>
  );
}

export default App;
