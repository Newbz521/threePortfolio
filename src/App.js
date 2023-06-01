import logo from './logo.svg';
import StationOne from "./components/station1/station1"

// import Station2 from './components/station2/station2';
import './App.css';
import { useState, Suspense, useEffect } from 'react';
import {BrowserRouter, Routes, Route, useParam } from "react-router-dom";
import LoaderScreen from './components/loader/loader';
import Navbar from './components/navbar/navbar';
import Home from './components/home/home';
import Architecture from './components/architecture/architecture';

function App() {
  useEffect(()=>{
    console.log("hello");
    window.onload = function() {
      var lastCalledTime;
      var counter = 0;
      var fpsArray = [];
    
      function update(timestamp) {
        var fps;
      
        if (!lastCalledTime) {
          lastCalledTime = new Date().getTime();
          fps = 0;
        }
      
        var delta = (new Date().getTime() - lastCalledTime) / 1000;
        lastCalledTime = new Date().getTime();
        fps = Math.ceil((1/delta));
      
        if (counter >= 60) {
          var sum = fpsArray.reduce(function(a,b) { return a + b });
          var average = Math.ceil(sum / fpsArray.length);
          console.log(average);
          counter = 0;
        } else {
          if (fps !== Infinity) {
            fpsArray.push(fps);
          }
      
          counter++;
        }
      
        window.requestAnimationFrame(update);
      }
    
      window.requestAnimationFrame(update);
    };
  },[])
 
  return (
    <div className="App">
      <Navbar />
      <Routes>
            <Route path="/" element={<Home/>}></Route>

            <Route path="/architecture" element={<Architecture/>}></Route>
            <Route path="/software" element={<StationOne/>}></Route>
          </Routes>
    </div>
  );
}

export default App;
