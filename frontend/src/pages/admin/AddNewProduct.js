import React, { useState } from 'react'
import ProductForm from '../../components/admin/ProductForm'
import { Button } from '../../assets/css/Button';
import { productService } from '../../services/productServices';

export default function AddNewProduct() {

  const [formData, setFormData] = useState({
    id: "",
    price: "",
    desciption: "",
    title: "",
    stock: 0
  });

  function createProduct() {
    productService
      .createProduct(formData)
      .then(created => console.log(created))
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}))
  }

  return (
    <>
      <ProductForm inputData={formData} handleChange={handleChange}/>
      <Button $primary onClick={createProduct}>TERMÉK LÉTREHOZÁSA</Button>
    </>
  )
}
