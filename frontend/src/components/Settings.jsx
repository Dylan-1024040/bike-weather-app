import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Settings = ({ initSettings, setUserId}) => {
    const [location, setLocation] = useState(initSettings.location);
    const [knockOutFactors, setKnockOutFactors] = useState(initSettings.knockOutFactors);
    const [timePreferred, setTimePreferred] = useState(initSettings.timePreferred);
    const navigate = useNavigate();

    


    const submitSettings = async (e) => {
        e.preventDefault();
        const settings = { location, knockOutFactors, timePreferred }
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/settings', settings);
            const { user_id } = response.data;
            setUserId(user_id);
            navigate('/');
        } catch (error) {
            console.error('Fout bij opslaan instellingen: ', error);
        }
    };


    return (
        <form onSubmit={submitSettings}>
            <label>
                Locatie:
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label>
                Wind (km/h):
                <input type="number" value={knockOutFactors.wind} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, wind: e.target.value })} />
            </label>
            <label>
                Regen (% kans):
                <input type="number" value={knockOutFactors.rain} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, rain: e.target.value })} />
            </label>
            <label>
                Koud (°C):
                <input type="number" value={knockOutFactors.cold} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, cold: e.target.value })}  />
            </label>
            <label>
                Warm (°C):
                <input type="number" value={knockOutFactors.hot} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, hot: e.target.value })}/>
            </label>
            <label>
                Sneeuw (% kans):
                <input type="number" value={knockOutFactors.snow} onChange={(e) => setKnockOutFactors({ ...knockOutFactors, snow: e.target.value })} />
            </label>
            <label>
                Tijd:
                <input type="time" value={timePreferred} onChange={(e) => setTimePreferred(e.target.value)} />
            </label>
            <button type="submit">Opslaan</button>
            <button type="button" onClick={() => navigate('/')}>Annuleren</button>

        </form>
    );
};

export default Settings;