import React from 'react'

export default function CategoryForm({inputData, handleChange}) {

  return (
    <form>        
        <label>id</label>
        <input 
        type='text' 
        name='id'
        value={inputData?.id || ""}
        onChange={(e) => handleChange(e)}
      />
      <label>name</label>
      <input 
        type='text' 
        name='name'
        value={inputData?.name || ""}
        onChange={(e) => handleChange(e)}
      />
    </form>
  )
}
