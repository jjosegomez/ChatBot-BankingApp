import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  // Axios connects to django backend
  console.log(axios.get("http://localhost:8000/api/Users/"))

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/Users/")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {data.map(item => (
            <div key={item.id}>
              <h2>{item.firstName} {item.lastName}</h2>
            </div>
          ))}
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.

        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
