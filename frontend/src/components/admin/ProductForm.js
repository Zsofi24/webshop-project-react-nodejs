import React, { Fragment } from 'react'

export default function ProductForm({ inputData, handleChange, categories, addOrRemoveCheckbox }) {

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
        name='price'
        type='number' 
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
      <label>kategóriák</label>
      {categories?.map(category => (
        <Fragment key={category.id}>
          <label htmlFor={category.name}> {category.name}</label>
          <input
                type="checkbox"
                value={category.id}
                id={category.id}
                onChange={e => addOrRemoveCheckbox(e.target.value, category.name)}
                checked={inputData.categories?.some(cat => cat.categoryId == category.id)} 
          />
        </Fragment>
      ))
      }
    </form>
  )
}

