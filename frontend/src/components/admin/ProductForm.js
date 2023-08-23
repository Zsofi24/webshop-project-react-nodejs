import React from 'react'

export default function ProductForm({ inputData, handleChange }) {
  return (
    <form>
      <label>id</label>
                <input 
                    type='text' 
                    name='id'
                    value={inputData?.id || ""}
                    onChange={(e) => handleChange(e)}
                />
        <label>title</label>
                <input 
                    type='text' 
                    name='title'
                    value={inputData?.title || ""}
                    onChange={(e) => handleChange(e)}
                />
                <label>price</label>
                <input 
                    type='number' 
                    name='price'
                    value={inputData?.price || ""}
                    onChange={(e) => handleChange(e)}
                />
                <label>descr</label>
                <input 
                    type='text' 
                    name='description'
                    value={inputData?.description || ""}
                    onChange={(e) => handleChange(e)}
                />
                <label>készlet</label>
                <input 
                    type='number' 
                    name='stock'
                    value={inputData?.stock || ""}
                    onChange={(e) => handleChange(e)}
                />
    </form>
  )
}

