import React, { Fragment, useEffect, useState } from 'react';
import previewImage from '../../utils/loadPreviewImage';

export default function ProductForm({ inputData, handleChange, categories, addOrRemoveCheckbox }) {

  const [previewImg, setPreviewImg] = useState("");

  return (
    <form>
      <div className='grid-input'>
        <label htmlFor='id'>id</label>
        <input 
          type='text' 
          name='id'
          id='id'
          value={inputData?.id || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='grid-input'>
        <label>title</label>
        <input 
          type='text' 
          name='title'
          value={inputData?.title || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='grid-input'>
        <label>price</label>
        <input 
          name='price'
          type='number' 
          value={inputData?.price || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className='grid-input'>
        <label>készlet</label>
        <input 
          type='number' 
          name='stock'
          value={inputData?.stock || ""}
          onChange={(e) => handleChange(e)}
        />
      </div>      
      <div>
        <label htmlFor='visible'>láthatóság</label>
        <input
          type='checkbox'
          name='visible'
          id="visible"
          checked={inputData?.visible}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <label htmlFor='limited'>limitált</label>
        <input
          type='checkbox'
          name='limited'
          id="limited"
          checked={inputData?.limited}
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <label>kategóriák</label>
        {categories?.map(category => (
          <Fragment key={category.categoryId}>
            <label htmlFor={category.categoryName}> {category.categoryName}</label>
            <input
                  type="checkbox"
                  value={category.categoryId}
                  id={category.categoryId}
                  onChange={e => addOrRemoveCheckbox(e.target.value, category.categoryName)}
                  checked={inputData?.categories?.some(cat => cat.categoryId == category.categoryId)} 
            />
          </Fragment>
        ))
        }
      </div>
      <div className='grid-input'>
        <label htmlFor='leiras'>leírás</label>
        <textarea 
          name='description' 
          value={inputData?.description || ""}
          onChange={(e) => handleChange(e)}
          id='leiras' 
        >
        </textarea>
      </div>
      <div className='grid-input'>
        <label>képfeltöltés</label>
        <input
          type="file"
          id="pic"
          name="pic"
          accept="image/png, image/jpeg"
          onChange={e => { 
            handleChange(e); 
            previewImage(e.target.files[0], setPreviewImg)
        }}
        />
        {inputData?.pic &&
          <img src={previewImg} alt="" style={{ width: "300px" }} />
        }
      </div>
      </form>
  )
}

