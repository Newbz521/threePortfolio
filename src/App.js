import logo from './logo.svg';
import StationOne from "./components/station1/station1"

// import Station2 from './components/station2/station2';
import './App.css';
import { useState } from 'react';

function App() {
  const [fontColor, setFontColor] = useState({ "color": "grey"})


  return (
    <div className="App">
      <div className='title-block' style={fontColor}>
        <h1>LAWRENCE YEE</h1>
      
        <h4 >Software Engineer</h4>
        <h4>Architecture Designer</h4>
      </div>
      <StationOne setColor={setFontColor} />
      {/* <Station2/> */}
    </div>
  );
}

export default App;
