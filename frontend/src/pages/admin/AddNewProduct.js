import React, { useState } from 'react'
import ProductForm from '../../components/admin/ProductForm'
import { productService } from '../../services/productServices';
import useProduct from '../../hooks/useProduct';
import Button from '../../components/Button';

export default function AddNewProduct() {

  const [ loading, response, error, categories, dispatch ] = useProduct();

  const [formData, setFormData] = useState({
    id: "",
    price: "",
    desciption: "",
    title: "",
    stock: 0,
    visible: false,
    newcategories: []
  });

  function addOrRemoveCheckbox(id, name) {

    const index = formData.newcategories.map(cat => cat.id).indexOf(Number(id));
    console.log(index, "index");
    if (index === -1) {
      setFormData(prev => ({...prev, newcategories: [...prev.newcategories, {"categoryId": Number(id), "categoryName": name}]}))
    } else {
      setFormData(prev => ({...prev, newcategories: prev.newcategories.splice(index, 1)}))
    }
    dispatch({ type: 'UPDATE', response: {...response, categories: formData.newcategories} });
}

  function createProduct() {
    productService
      .createProduct(formData)
      .then(created => console.log(created))
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({...prev, [name]: type === "checkbox" ? checked : value}))
  }

  return (
    <>
      <ProductForm inputData={formData} handleChange={handleChange} categories={categories} addOrRemoveCheckbox={addOrRemoveCheckbox}/>
      <Button $primary handleClick={createProduct}>TERMÉK LÉTREHOZÁSA</Button>
    </>
  )
}