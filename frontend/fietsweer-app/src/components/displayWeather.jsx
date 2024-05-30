import React from 'react';
import bikeOutside from '../images/happyBike.png';
import bikeInside from '../images/bikeInside.png';

const Weather = ({ adviceBike }) => {
    return (
        <div>
             {adviceBike.map((day, index) => (
                <div key={index}>
                    <p>{day.date} - {day.time}</p>
                    <p>Temperatuur: {day.temperature} °C</p>
                    <p>Wind: {day.wind} km/h</p>
                    <p>Regen: {day.rain} %</p>
                    <p>Sneeuw: {day.snow} %</p>
                    {day.bike ? (
                        <img src={bikeOutside} alt="Fiets buiten" />
                    ): (
                        <img src={bikeInside} alt="Fiets in een huis" />
                    )}
                    <p>{day.bike ? 'Goed weer om te fietsen' : 'Geen goed weer om te fietsen'}</p>
                </div>
             ))}
        </div>
    );
};

export default Weather;