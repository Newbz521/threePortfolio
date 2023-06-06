import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "./architecture.css";

function Architecture(props) {
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

      <div className='screen home-box' style={{ fontSize: "40px"}}>
        <h5>Coming Soon..</h5>
        <div className="blur"></div>

    </div>
      

  </div>

  )
}

export default Architecture