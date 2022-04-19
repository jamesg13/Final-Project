import './App.css';
import {useState} from 'react';



function Search({onSearch}) {
    const [id, setId] = useState('')
    
    
    
    const onSubmit = (e) =>{
        e.preventDefault()
        onSearch({id})
        setId('')
    }
  return (
    <div >
      <form onSubmit={onSubmit}>
        <label>
          <input type="text" name="id" value = {id} onChange={(e) => setId(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;
