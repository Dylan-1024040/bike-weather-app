import React, { useState, useEffect } from "react";
import axios from "axios"

const Settings = ({ setSettingsVis }) => {
    const [locationInput, setLocationInput ] = useState('');
    const [knockOutFactors, setKnockOutFactors] = useState({
        wind: 0.0,
        rain: 0,
        cold: 0,
        hot: 0,
        snow: 0,
    });
    const [timePreferred, setTimePreferred] = useState('08:00');

    useEffect(() => {
        axios.get('api/settings').then((response) => {
            const data = response.data;
            setLocationInput(data.locationInput);
            setKnockOutFactors(data.knockOutFactors);
            setTimePreferred(data.timePreferred);
        });
    }, []);

    const settingsSubmit = (e) => {
        e.preventDefault();
        const settings = {
            locationInput,
            knockOutFactors,
            timePreferred
        };
        axios.post('api/settings', settings).then((response) => {
            document.cookie = `user_id=${response.data.user_id}`;
            setSettingsVis(false);
        })
    };

    return (
        <form onsubmit={settingsSubmit}>
            <label>
                Locatie:
                <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
            </label>
             <label>
                Wind (km/h):
                <input type="number" value={knockOutFactors.wind} onChange={(e) => setKnockOutFactors({...knockOutFactors, wind: parseFloat(e.target.value) })} />
            </label>
             <label>
                Regen (% kans):
                <input type="number" value={knockOutFactors.rain} onChange={(e) => setKnockOutFactors({...knockOutFactors, rain: parseFloat(e.target.value) })} />
            </label>
             <label>
                Koud (°C):
                <input type="number" value={knockOutFactors.cold} onChange={(e) => setKnockOutFactors({...knockOutFactors, cold : parseFloat(e.target.value) })} />
            </label>
             <label>
                Warm (°C):
                <input type="number" value={knockOutFactors.hot} onChange={(e) => setKnockOutFactors({...knockOutFactors, hot: parseFloat(e.target.value) })} />
            </label>
             <label>
                Sneeuw (% kans):
                <input type="number" value={knockOutFactors.snow} onChange={(e) => setKnockOutFactors({...knockOutFactors, snow: parseFloat(e.target.value) })} />
            </label>
             <label>
                Tijd:
                <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
            </label>
            <label>
                Tijd:
                <input type="time" value={timePreferred} onChange={(e) => setLocationInput(e.target.value)} />
            </label>
            <button type="submit">Opslaan</button>
            <button type="button" onClick={() => setSettingsVis(false)}>Annuleren</button>
        </form>
    );
}
export default Settings;