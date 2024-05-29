import React from 'react';
// import bikeInside from '../images/bikeinside.png';
// import bikeOutside from '..imahes/happybike.png';

const displayWeather = ({ advice }) => {
    return (
        <div>
             {advice.map((day, index) => (
                <div key={index}>
                    <p>{day.date} - {day.time}</p>
                </div>
             ))}
        </div>
    )
}

export default displayWeather;