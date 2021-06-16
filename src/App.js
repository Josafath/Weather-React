import { useState } from 'react';
import './App.css';
import Weather from './Weather'
function App() {
  const [clicked,setClicked] = useState(false)
  const [location,setLocation] = useState("")
  const [input,setInput] = useState("")

  
  const handleClicked = (e) =>{
    if(e.key === 'Enter'){
      setInput("")
      setClicked(true);
      setLocation(input)
    }
  }
  const handleChange = (e) => {
    setClicked(false)
    setInput(e.target.value)
  }
  return (
    <div  className="container">
      <input id="my_input" onKeyPress={handleClicked} onChange={handleChange} type="text" placeholder="Insert location" value={input}/>
      {clicked ? <Weather loc = {location}/>: null}
    </div>
  );
  }

export default App;
