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
        <Fragment key={category.categoryId}>
          <label htmlFor={category.categoryName}> {category.categoryName}</label>
          <input
                type="checkbox"
                value={category.categoryId}
                id={category.categoryId}
                onChange={e => addOrRemoveCheckbox(e.target.value, category.categoryName)}
                checked={inputData.categories?.some(cat => cat.categoryId == category.categoryId)} 
          />
        </Fragment>
      ))
      }
    </form>
  )
}

