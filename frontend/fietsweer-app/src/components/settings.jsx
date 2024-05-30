import React, { useState } from "react";

const Settings = ({ location, knockOutFactors, timePreferred, settingsSave, setSettingsVis}) => {
    const [locationInput, setLocationInput] = useState(location);
    const [knockOutFactorsInput, setKnockOutFactorsInput] = useState(knockOutFactors);
    const [timePreferredInput, setTimePreferredInput] = useState(timePreferred);

    const submitSettings = (e) => {
        e.preventDefault();
        settingsSave(locationInput, knockOutFactorsInput, timePreferredInput)
    };

    return (
        <form onsubmit={submitSettings}>
            <label>
                Locatie:
                <input type="text" value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
            </label>
            <label>
                Wind (km/h):
                <input type="text" value={knockOutFactorsInput.wind} onChange={(e) => setKnockOutFactorsInput({...knockOutFactorsInput, wind: e.target.value})} />
            </label>
            <label>
                Regen (% kans):
                <input type="text" value={knockOutFactorsInput.rain} onChange={(e) => setKnockOutFactorsInput({...knockOutFactorsInput, rain: e.target.value})} />
            </label>
             <label>
                Koud (°C):
                <input type="text" value={knockOutFactorsInput.cold} onChange={(e) => setKnockOutFactorsInput({...knockOutFactorsInput, cold: e.target.value})} />
            </label>
             <label>
                Warm: (°C):
                <input type="text" value={knockOutFactorsInput.hot} onChange={(e) => setKnockOutFactorsInput({...knockOutFactorsInput, hot: e.target.value})} />
            </label>
             <label>
                Sneeuw (% kans):
                <input type="text" value={knockOutFactorsInput.snow} onChange={(e) => setKnockOutFactorsInput({...knockOutFactorsInput, snow: e.target.value})} />
            </label>
            <label>
                Tijd:
                <input type="time" value={timePreferredInput} onChange={(e) => setTimePreferredInput(e.target.value)} />
            </label>
            <button type="submit">Opslaan</button>
            <button type="button" onClick={() => setSettingsVis(false)}>Annuleren</button>
        </form>
    );
};

export default Settings;