import React, { useState } from 'react'
import ProductForm from '../../components/admin/ProductForm'
import { productService } from '../../services/productServices';
import useProduct from '../../hooks/useProduct';
import Button from '../../components/Button';

export default function AddNewProduct() {

  const [{ loading, response, error, categories}, dispatch ] = useProduct();

  function addOrRemoveCheckbox(id, name) {

      const newCategories = [...response.newcategories];
      const index = newCategories.map(cat => cat.categoryId).indexOf(id)

      if (index === -1) {
          newCategories.push({categoryId: id, categoryName: name});
      } else {
          newCategories.splice(index, 1);
      }
      
      dispatch({ type: 'UPDATE', response: {...response, newcategories: newCategories} });
}

  function createProduct() {
    const productData = new FormData();
    Object.entries(response).forEach(([key, value]) => {
      if(key=="newcategories") value.forEach(cat => productData.append('categories[]', JSON.stringify(cat)))
      else productData.append(key, value);
    });

    productService
      .createProduct(productData)
      .catch(err => alert(err.statusText))    
  }

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if(type == "file") {
      dispatch({ type: 'UPDATE', response: {...response, [name]: files[0]}})
    } else {
      dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
    }

  }

  return (
    <>
      <ProductForm 
        inputData={response} 
        handleChange={handleChange} 
        categories={categories} 
        addOrRemoveCheckbox={addOrRemoveCheckbox}
      />
      <Button $primary handleClick={createProduct}>TERMÉK LÉTREHOZÁSA</Button>
    </>
  )
}
