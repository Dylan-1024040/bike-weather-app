import React, { useState } from 'react';
import Weather from './components/weather';
import Settings from './components/settings';
import './App.css';



const App = () => {
  const [settingsVis, setSettingsVis] = useState(false);

  return (
    <div>
      <header>
        <h1>Fietsweer Voorspelling</h1>
        <button onClick={() => setSettingsVis(!setSettingsVis)}>
          {settingsVis ? 'Terug': 'instellingen'}
        </button>
      </header>
      <main>
        {settingsVis ? (
          <Settings setSettingsVis={setSettingsVis} />
        ) : (
          <Weather />
        )}
      </main>
    </div>
  );
};
// function App() {
//   const [color, setColor] = useState("blue");

//   return (
//     <div className='background-container'>

//       <div className='button-container'>
//         <h1>My fav color is {color}</h1>

//         <button id="red-button" onClick={() => setColor("red")}>Red</button>
//         <button id="green-button" onClick={() => setColor("green")}>Green</button>
//         <button id='blue-button' onClick={() => setColor("blue")}>Blue</button>
      
//       </div>
//     </div>
//   );

// }



export default App;
