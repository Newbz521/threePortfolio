import logo from './logo.svg';
import StationOne from "./components/station1/station1"
// import Station2 from './components/station2/station2';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='title-block' style={{ height: "fit-content", width: "fit-content", position: "absolute", zIndex: 5, display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection:"column" }}>
        <h1>Lawrence Yee</h1>
        {/* <h3>Software Engineer</h3>
        <h3>Architecture Designer</h3>
        <h3>Fabricator</h3> */}
      </div>
      <StationOne/>
      {/* <Station2/> */}
    </div>
  );
}

export default App;
