import logo from './logo.svg';
import StationOne from "./components/station1/station1"

// import Station2 from './components/station2/station2';
import './App.css';
import { useState } from 'react';
import Loader from './components/loader/loader';

function App() {


  return (
    <div className="App">
      {/* <Loader></Loader> */}
      <StationOne />
      {/* <Station2/> */}
    </div>
  );
}

export default App;
