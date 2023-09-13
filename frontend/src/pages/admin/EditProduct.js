import React from 'react'
import useProduct from '../../hooks/useProduct';
import { productService } from '../../services/productServices';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import ProductForm from '../../components/admin/ProductForm';

export default function EditProduct() {

    let [{ loading, response, error, categories}, dispatch ] = useProduct();
    const { productid } = useParams();
    
    function updateProduct(e) {
        e.preventDefault();
        productService.updateProduct(response, productid)
            .then(updated => console.log(updated, "updqted"))
    }

    function handleChange(e) {
      const { name, value, type, checked } = e.target;
      dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
    }

    function addOrRemoveCheckbox(id, name) {

      const newCategories = [...response.categories];
      console.log(newCategories, "new");
      const index = newCategories.map(cat => cat.categoryId).indexOf(Number(id));
      console.log(index, "index");
      if (index === -1) {
          newCategories.push({categoryId: Number(id), categoryName: name});
      } else {
          newCategories.splice(index, 1);
      }
      
      dispatch({ type: 'UPDATE', response: {...response, categories: newCategories} });
  
  }

  return (
    <section>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { response && (
        <>
            <ProductForm inputData={response} categories={categories} handleChange={handleChange} addOrRemoveCheckbox={addOrRemoveCheckbox}/>
            <Button $primary handleClick={updateProduct} text='szerkesztés'></Button>
        </>
      )}
    </section>
  )
}
