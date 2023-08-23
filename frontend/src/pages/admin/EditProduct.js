import React from 'react'
import useProduct from '../../hooks/useProduct';
import { productService } from '../../services/productServices';
import { useParams } from 'react-router-dom';
import { Button } from '../../assets/css/Button';
import ProductForm from '../../components/admin/ProductForm';

export default function EditProduct() {

    const [loading, response, error, dispatch] = useProduct();
    const { productid } = useParams();
    
    function updateProduct(e) {
        e.preventDefault();
        productService.updateProduct(response, productid)
            .then(updated => console.log(updated, "updqted"))
    }

    function handleChange(e) {
      const { name, value } = e.target;
      dispatch({ type: 'UPDATE', response: {...response, [name]: value}})
    }

    console.log(response, "resp");
    

  return (
    <section>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { response && (
        <>
            <ProductForm inputData={response} handleChange={handleChange}/>
            {/* <form>
                <label>title</label>
                <input 
                    type='text' 
                    name='title'
                    value={response.title}
                    onChange={(e) => dispatch({ type: 'UPDATE', response: {...response, title: e.target.value }})}
                />
                <label>price</label>
                <input 
                    type='text' 
                    name='price'
                    value={response.price}
                    onChange={(e) => dispatch({ type: 'UPDATE', response: {...response, price: e.target.value }})}
                />
                <label>descr</label>
                <input 
                    type='text' 
                    name='description'
                    value={response.description}
                    onChange={(e) => dispatch({ type: 'UPDATE', response: {...response, description: e.target.value }})}
                />
              </form> */}
              <Button $primary onClick={updateProduct}>szerkesztés</Button>
        </>
      )}
    </section>
  )
}
