import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "./home.css";

function Home(props) {
  const [currentUser, setCurrentUser] = useState(null)
  const [navbar, setNavbar] = useState(true)
  const [initials, setInitials] = useState(null)
  const [nameArray, setNameArray] = useState([])


  // function getInitial() {
  //   if (currentUser) {
  //     // setInitials(nameArray[0][0])
  //   }
  // }


  useEffect(() => {
    // fetchHates();
    setCurrentUser(props.currentUser);
    // setNameArray(props.currentUser.full_name.split(" "))
    
  }, [props.currentUser]);

  
  return (
    <div className="home-container">

    <div className='screen home-box' >
      <h3 className='hello'> Hi, my name is </h3>
      <h1 style={props.slideH1}>
        Lawrence Yee  
      </h1>
        <h3 className='text-one' style={props.slideH3}>I am a Software Engineer/Architecture Designer</h3>
        {/* <h3 className='text-two' style={props.slideH3}>based in New York, NY</h3> */}
      <h3 className='text-three' style={props.slideH3}>Passion for turning designs into reality</h3>
    </div>
      

  </div>

  )
}

export default Home