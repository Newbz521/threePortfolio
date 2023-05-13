export function StoreOne() {
  const ref = useRef()
  const bounceRef = useRef()
  const [active, setActive] = useState(false)
  const [git, setGit] = useState(false)
  const [deploy, setDeploy] = useState(false)
  const [world,setWorld] = useState(false)
  const [zoom, setZoom] = useState(false)
  useCursor(active)
  

  useFrame((state) => {
    // rise += risespeed
    // bounceRef.current.position.y = 1.5 * Math.sin(rise) 
  })
  return (
    <mesh ref={bounceRef}>
      <mesh ref={ref} position={[-20, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(1) } } >
      <boxGeometry args={[8, 8, .5]} />
      <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'}/>
      </mesh>
      {/* <Video /> */}
      <mesh ref={ref} scale={git ?[1.2,1.2,1]: [1,1,1] } position={[-23, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/FiberKitchen", "_blank"); }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={git ? 'lightpink' : 'lightblue'}/>
      </mesh>
      <mesh position={[-23, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        GIT
      </Text>
        </mesh>
      <mesh ref={ref}scale={deploy ?[1.2,1.2,1]: [1,1,1] } position={[-20, 14, -15]} receiveShadow castShadow onClick={() => {  window.open("https://kitchan.netlify.app/", "_blank"); }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={deploy ? 'pink' : 'lightblue'} />
      </mesh>
      <mesh position={[-20, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        APP
      </Text>
        </mesh>
      <mesh ref={ref} scale={world ?[1.2,1.2,1]: [1,1,1] } position={[-17, 14, -15]} receiveShadow castShadow onClick={() => { setPreset(0) }}>
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={world ? 'hotpink' : 'lightblue'} />
      </mesh>
      <mesh position={[-17, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        ZOOM
      </Text>
        </mesh>
    </mesh>
  )
}

export function StoreTwo() {
const ref = useRef()
const bounceRef = useRef()
const [active, setActive] = useState(false)
const [git, setGit] = useState(false)
const [deploy, setDeploy] = useState(false)
const [world,setWorld] = useState(false)
const [zoom, setZoom] = useState(false)
useCursor(active)
 
return (
  <mesh ref={bounceRef}>
    <mesh ref={ref} position={[0, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(2) }} >
    <boxGeometry args={[8, 8, .5]} />
    <meshStandardMaterial color={active ? 'hotpink' : 'lightblue'}  />
    </mesh>
    {/* <VideoTwo /> */}
    <mesh ref={ref} scale={git ?[1.2,1.2,1]: [1,1,1] }position={[-3, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/Beacon-Defender-", "_blank"); }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={git ? 'lightpink' : 'lightblue'} clearcoat={1}  />
      </mesh>
      <mesh position={[-3, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        GIT
      </Text>
        </mesh>
      <mesh ref={ref} scale={deploy ?[1.2,1.2,1]: [1,1,1] } position={[0, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://newbz521.github.io/Beacon-Defender-/", "_blank"); }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={deploy ? 'lightpink' : 'lightblue'} />
      </mesh>
      <mesh position={[0, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        APP
      </Text>
        </mesh>
      <mesh ref={ref} scale={world ?[1.2,1.2,1]: [1,1,1] } position={[3, 14, -15]} receiveShadow castShadow onClick={() => { setPreset(0) }}>
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={world ? 'lightpink' : 'lightblue'} />
      </mesh>
      <mesh position={[3, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        BACK
      </Text>
        </mesh>
  </mesh>
)
}

export function StoreThree() {
const ref = useRef()
const bounceRef = useRef()
const [active, setActive] = useState(false)
const [git, setGit] = useState(false)
const [deploy, setDeploy] = useState(false)
const [world,setWorld] = useState(false)
const [zoom, setZoom] = useState(false)
useCursor(active)
 

useFrame((state) => {
  // rise3 += risespeed3
  // bounceRef.current.position.y = 1.5 * Math.sin(rise3) 
})
return (
  <mesh ref={bounceRef}>
    <mesh ref={ref} position={[20, 8, -15]} receiveShadow castShadow onClick={() => { setPreset(3) }} >
    <boxGeometry args={[8, 8, .5]} />
    <meshStandardMaterial color={active ? 'lightpink' : 'lightblue'} />
    </mesh>
    {/* <VideoThree /> */}
    <mesh ref={ref} scale={git ?[1.2,1.2,1]: [1,1,1] } position={[17, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://github.com/Newbz521/virtufit-prototype", "_blank") }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial  color={git ? 'lightpink' : 'lightblue'} />
      </mesh>
      <mesh position={[17, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        GIT
      </Text>
        </mesh>
      <mesh ref={ref} scale={deploy ?[1.2,1.2,1]: [1,1,1] } position={[20, 14, -15]} receiveShadow castShadow onClick={() => { window.open("https://virtualfit.netlify.app/", "_blank") }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={deploy ? 'lightpink' : 'lightblue'} />
      </mesh>
      <mesh position={[20, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        APP
      </Text>
        </mesh>
      <mesh ref={ref} scale={world ?[1.2,1.2,1]: [1,1,1] } position={[23, 14, -15]} receiveShadow castShadow onClick={() => { setPreset(0) }} >
        <boxGeometry args={[2, 2, .5]} />
      <meshStandardMaterial color={world ? 'lightpink' : 'lightblue'} />
      </mesh>
      <mesh position={[23, 14, -14.7]} >
      <Text
    scale={[.5, .5, .5]}
    color="white" // default
    >
        BACK
      </Text>
        </mesh>
  </mesh>
)
}