
// import { useControls } from "leva";
import { ReactNode, useRef, useState, useEffect } from "react";
// import { Group } from "three";
import {useProgress} from "@react-three/drei"


function Loader(props) {
  // const { progress } = useProgress();

  return (
    <div className="loader-container">
     <div className="charMovement">
                                  <div className="largeContainer">
                                    <div className="boxer">
                                      <div className="character">
                                        <div className="head">
                                          <div className="face">
                                            <div className="eyes"></div>
                                            <div className="eyes2"></div>
                                          </div>
                                        </div>
                                        <div className="upperBody">
                                          <div className="leftArm"></div>
                                          <div className="torso">
                                            <div className="heart"></div>
                                          </div>
                                          <div className="rightArm"></div>
                                        </div>
                                        <div className="lowerBody">
                                          <div className="leftLeg"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
      </div>
      {/* <div className="loader-tag">{`${progress}%`}</div> */}
    </div>
  );
}


export default Loader;

