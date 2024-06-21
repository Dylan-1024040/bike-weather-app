import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import axios from 'axios';
import Settings from './components/Settings';
import Weather from './components/Weather';
import './App.css';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [initSettings, setInitSettings] = useState({
    location: '',
    knockOutFactors: {
      wind: 0,
      rain: 0,
      cold: 0,
      hot: 0,
      snow: 0,
    },
    timePreferred: '08:00',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/settings');
        const { user_id, ...settings } = response.data;
        setUserId(user_id);
        setInitSettings(settings);
      } catch (error) {
        console.error('Fout bij ophalen instellingen: ', error);
      }

    };
    fetchSettings();
  }, []);


  return (
    <Router>
      <div className="App">
        <h1>Weather App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/settings">Instellingen</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Weather userId={userId} />} />
          <Route path="/settings" element={<Settings initSettings={initSettings} setUserId={setUserId} />} /> 
        </Routes>
      </div>
   </Router>  
  )
}

export default App;
