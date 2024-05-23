import { useState } from 'react';
import axios from 'axios'
import './App.css'



function App() {
  const [color, setColor] = useState("blue");

  return (
    <div className='background-container'>

      <div className='button-container'>
        <h1>My fav color is {color}</h1>

        <button id="red-button" onClick={() => setColor("red")}>Red</button>
        <button id="green-button" onClick={() => setColor("green")}>Green</button>
        <button id='blue-button' onClick={() => setColor("blue")}>Blue</button>
      
      </div>
    </div>
  );

}

export default App;
