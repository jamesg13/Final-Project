
import './App.css';
import React from 'react';

function VideoLoad({video}) {
 
  
  const videoURL = `https://www.youtube.com/embed/${video}?controls=0`
  return (
    <div >
      <iframe width="560" height="315" src={videoURL}
         title="YouTube video player" frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>
    </div>
  );
}

export default VideoLoad;
