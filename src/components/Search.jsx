import React, { useState } from 'react'

function Search({onSearch}) {

    const [input,setInput]=useState('');
    function setCityHandler(e){
      e.preventDefault();
      onSearch(input);
      setInput('')
    }

  return (
    <div className="flex items-center justify-center  bg-gray-100">
  <form
    className="flex flex-row w-1/2  gap-2 bg-white rounded-xl shadow-md px-4 py-2 mb-10"
    onSubmit={setCityHandler}
  >
    <input
      type="text"
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      placeholder="Enter city name..."
      className="flex-1 outline-none p-2 text-gray-700"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      
    >
      Search
    </button>
  </form>
</div>

  )
}

export default Search