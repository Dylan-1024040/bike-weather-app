import React, { useState, useEffect } from 'react';
import axios from 'axios';
import displayWeather from './components/displayWeather';
import Settings from './components/settings';
import Loading from './components/loading'
import './App.css';


const App = () => {
  const [location, setLocation] = useState('');
  const [knockOutFactors, stKnockoutFactors] = useState({
    wind: 0.0,
    rain: 0,
    cold: 0,
    hot: 0,
    snow: 0,
  });
  const [weatherData, setWeatherData] = useState([]);
  const [advice, setAdvice] = useState([]);
  const [settings, setSettings] = useState([false]);
  const [loading, setLoading] = useState(true);
}

// function App() {
//   const [color, setColor] = useState("blue");

//   return (
//     <div className='background-container'>

//       <div className='button-container'>
//         <h1>My fav color is {color}</h1>

//         <button id="red-button" onClick={() => setColor("red")}>Red</button>
//         <button id="green-button" onClick={() => setColor("green")}>Green</button>
//         <button id='blue-button' onClick={() => setColor("blue")}>Blue</button>
      
//       </div>
//     </div>
//   );

// }



export default App;
