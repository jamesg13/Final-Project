import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import React from 'react';

import VideoLoad from './VideoLoad';
import Search from './Search';
// import login from './login';
import Database from './Database';


function App() {
  const [video, setVideo] = useState('')
  const [user, setUser] = useState('')
  const searchVideo = (videoName) =>{
    setVideo(videoName.id)
  }
  const handleChange = e => {
    e.preventDefault()
    setUser(e.target.value)
    
    console.log(user)
  }
  // const makeAPICall = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:4500/testAPI/${video.replace(" ", "&")}`, {mode:'cors'});
  //     const data = await response.json();
  //     setVideo(data.id)
      
  //   }
  //   catch (e) {
  //     console.log(e) 
  //   }
  // }

  const getPlaylist = async () => {
    try {
      const options = {
        method: 'GET',
        mode:'cors'
      }
      const response = await fetch(`http://localhost:4500/testAPI/test${user}`, options);
      const data = await response.json();
      console.log(data);
      return data;
    }
    catch (e) {
      console.log(e) 
    }
  }
  
  const putPlaylist = async () => {
    try {
      const options = {
        method: 'PUT',
        mode:'cors'
      }
    const response = await fetch(`http://localhost:4500/testAPI/test${user}`, options);
    const data = await response.json();
      
    }
    catch (e) {
      console.log(e) 
    }
  }

  // React.useEffect(() => {
  //   makeAPICall();
  // }, [video])
  
  

  const data = getPlaylist();
  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handleChange}>
        <label>
          Name:
          <input type="text" value={user} onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form> 
        {/* <Search onSearch={searchVideo} />  
        <VideoLoad video = {video} /> */}
        
      </header>
    </div>
  );
}

export default App;
