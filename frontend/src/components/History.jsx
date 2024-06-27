import React, { useState, useEffect } from 'react';


const History = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        const settings = localStorage.getItem('settings');
        const parsedSettings = settings ? JSON.parse(settings) : null;

        const historyData = [];
        if (userId) {
            historyData.push({ name: 'userId', value: userId }); 
        }
        if (parsedSettings) {
            historyData.push({ name: 'settings', value: parsedSettings });
        }

        setHistory(historyData);
}, []);

return (
    <div>
        <h2>Cookie geschiedenis</h2>
        <ul>
            {history.length === 0 ? (
                <li>Geen geschiedenis</li>
            ) : (
                history.map((item, index) => (
                    <li key={index}>
                        <strong>{item.name}:</strong> {typeof item.value === 'object' ? <pre>{JSON.stringify(item.value, null, 2)}</pre> : item.value}
                    </li>
                ))
            
            )}
        </ul>
    </div>
);
};

export default History;