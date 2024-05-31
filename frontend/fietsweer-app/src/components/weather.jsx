import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bikeOutside from '../images/happyBike.png';
import bikeInside from '../images/bikeInside.png';

const Weather = () => {
    const [dataWeather, setDataWeather] = useState([]);
    const [loading, SetLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user_id = document.cookie.split('; ').find(row => row.startsWith('user_id')).split('=')[1];
        axios.get(`/api/weather/${user_id}`).then((response) => {
            setDataWeather(response.data);
            SetLoading(false);
        }).catch((err) => {
            setError(err.message);
            SetLoading(false);
        });

    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            <h2>Weer voorspelling</h2>
            {dataWeather.map((data, index) => (
                <div key={index}>
                    <p>Datum: {data.date}</p>
                    <p>Tijd: {data.time}</p>
                    <p>Temperatuur: {data.temperature}</p>
                    <p>Wind: {data.wind}</p>
                    <p>Sneeuw {data.snow}</p>
                    <p>
                        Fiets weer:
                        {data.bikeWeather ? (
                            <img src={bikeOutside} alt="Sun on a bike" style={{ width: '30px', height: '30px'}}/>
                        ) : (
                            <img src={bikeInside} alt="bike inside a house" style={{ width: '30px', height: '30px'}}/>
                        )}
                    </p>
                </div>
            ))}
        </div>
    )
}
export default Weather;