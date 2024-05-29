import React, { useState } from "react";

const Settings = ({ location, knockOutFactors, timePreferred, settingsSave, setSettingsVis}) => {
    const [locationInput, setLocationInput] = useState(location);
    const [knockOutFactorsInput, setKnockOutFactors] = useState(knockOutFactors);
    const [timePreferredInput, setTimePreferred] = useState(timePreferred);

}

export default Settings;