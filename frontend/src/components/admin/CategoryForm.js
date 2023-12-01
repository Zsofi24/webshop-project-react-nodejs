import React from 'react'

export default function CategoryForm({inputData, handleChange}) {

  return (
    <form>  
      <div className='grid-input'>
        <label>id</label>
        <input 
          type='text' 
          name='categoryId'
          value={inputData.categoryId || ""}
          onChange={(e) => handleChange(e)}
        />
      </div> 
      <div className='grid-input'>
        <label>name</label>
        <input 
          type='text' 
          name='categoryName'
          value={inputData.categoryName || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>     
    </form>
  )
}
