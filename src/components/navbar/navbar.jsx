import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import ReactScrollWheelHandler from "react-scroll-wheel-handler";
import "./navbar.css";

function Navbar(props) {
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

  // useEffect(() => {
  //   getInitial()
  // },[currentUser])



  // window.addEventListener('wheel', function(event)
  // {
  //  if (event.deltaY < 0)
  //  {
  //  setNavbar(true)
  //  }
  //  else if (event.deltaY > 0)
  //  {
  //   setNavbar(false)
  //  }
  // });
  return (<>
    
    
    <div className={navbar ? "navBarContainer active" : "navBarContainer"} >
      <div className="navStartContainer" >
        <div className="navTab">
          <Link className="individualTab" to="/">Lawrence Yee</Link>
        </div>
       </div>
      <div className="navMidContainer">
     
        <div className="navTab">
          <Link className="individualTab" to="/software">Software Engineer</Link>
        </div>
        <div className="navTab">
          <Link className="individualTab" to="/architecture">Architecture Designer</Link>
        </div>
      </div>
      {/* <div className="navEndContainer">
        {!currentUser ? (
          <>
          <div className="navTab">
            <Link className="individualTab" to="/">Login</Link>
          </div>
          <div className="navTab signUpTab">
              <Link className="individualTab signUpNavBox" to="/SignUp">Sign Up</Link>
            </div>
            </>
        ) : (
            <>
              <div className="navTab">
                <Link className="msgButton" to={`/msg/${props.currentUser.username}`}>💬</Link>
              </div>
              <div className="navTab">
                <Link className="myProfileButton" to={`/Profile/${props.currentUser.username}`}></Link>
              </div>
              <div className="navTab signUpTab">
              <Link className="individualTab signUpNavBox " to="/" onClick={()=>(props.setCurrentUser(""))}>Sign Out</Link>
            </div>
             </> 
              )
}
     
      </div> */}
    </div>
  </>)
}

export default Navbar