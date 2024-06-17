import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ userId }) => {
    const [dataWeather, setDataWeather ] = useState({
        location: '',
        departure: '',
        okay_to_bike: [],
    });

    useEffect(() => {
        const fetchWeather = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:3001/api/weather/${userId}`);
                    setDataWeather(response.data);
                } catch (error) {
                    console.error('Fout bij ophalen weer data: ', error);
                }
            }
        };

        fetchWeather();
    }, [userId]);



    return (
        <div>
            <h2>Weer voospelling</h2>
            <p>Locatie: {dataWeather.location}</p>
            <p>VertrekTijd: {dataWeather.departure}</p>
            {dataWeather.okay_to_bike.map((data, index) => (
                <div key={index}>
                    <p>Datum: {data.date}</p>
                    <p>
                        Fietsweer: 
                        {data.bike_okay ? (
                            <img src="/happyBike.png" alt="sun on bike" style={{ width: '30px', height: '30px'}} />
                        ) : (
                            <img src="/bikeinside.png" alt="bike in house" style={{ width: '30px', height: '30px'}} />
                        )}
                    </p>
                </div>
            ))}
        </div>

    );
};

export default Weather;