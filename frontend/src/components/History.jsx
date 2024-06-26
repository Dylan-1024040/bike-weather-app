import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const History = () => {
    const [cookies, setCookies] = useState([]);

    useEffect(() => {
        const allCookies = Cookies.get();
        setCookies(Object.entries(allCookies));
    }, []);

    return (
        <div>
            <h2>Cookie geschiedenis</h2>
            <ul>
                {cookies.map(([name, value]) => (
                    <li key={name}>
                        <strong>{name}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default History;