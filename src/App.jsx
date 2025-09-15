import { useState } from 'react'
import './App.css'
import Card from './components/Card'
import Search from './components/Search'

function App() {
  
  const [city,setCity]=useState('');
  function handleSearch(submittedcity){
    setCity(submittedcity)
    console.log(city);
  }

  return (
    <div>
    
    <Search onSearch={handleSearch}/>
    <Card city={city}/>
    </div>
  )
}

export default App
