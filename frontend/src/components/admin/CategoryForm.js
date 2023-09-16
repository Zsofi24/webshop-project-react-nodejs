import React from 'react'

export default function CategoryForm({inputData, handleChange}) {

  return (
    <form>        
      <label>id</label>
      <input 
        type='text' 
        name='categoryId'
        value={inputData.categoryId || ""}
        onChange={(e) => handleChange(e)}
      />
      <label>name</label>
      <input 
        type='text' 
        name='categoryName'
        value={inputData.categoryName || ""}
        onChange={(e) => handleChange(e)}
      />
    </form>
  )
}
