import './App.css';
import {useState} from 'react';

const https = require('https');
var Discogs = require('disconnect').Client;
function Database() {
    //const [id, setId] = useState('')

    var db = new Discogs().database();
    db.getRelease(176126, function(err, data){
	  console.log(data);
});
    
    
  return (
    <div >
      
    </div>
  );
}

export default Database;
