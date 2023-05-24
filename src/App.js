import logo from './logo.svg';
import StationOne from "./components/station1/station1"

// import Station2 from './components/station2/station2';
import './App.css';
import { useState, Suspense } from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import LoaderScreen from './components/loader/loader';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';

function App() {

  return (
    <div className="App">
      <Navbar/>
      <Routes>
            <Route path="/" element={<Home/>}></Route>

            <Route path="/architecture" element={<div >Architecture</div>}></Route>
            <Route path="/software" element={<StationOne/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
