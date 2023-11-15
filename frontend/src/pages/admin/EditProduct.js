import { useParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import { productService } from '../../services/productServices';
import ProductForm from '../../components/admin/ProductForm';
import Button from '../../components/button/Button';

export default function EditProduct() {

    let [{ loading, response, error, categories}, dispatch ] = useProduct();
    const { productid } = useParams();
    console.log(response, "resp");
    
    function updateProduct(e) {
        e.preventDefault();
        const productData = new FormData();
        Object.entries(response).forEach(([key, value]) => {
          if(key=="categories") value.forEach(cat => productData.append('categories[]', JSON.stringify(cat)))
          else productData.append(key, value)
        })
        productService.updateProduct(productData, productid)
            .then(updated => console.log(updated, "updqted"))
            .catch(err => alert("err"))
  
    }

    function handleChange(e) {
      const { name, value, type, checked, files } = e.target;
      if(type == "file") {
        console.log(files[0], "files0");
        dispatch({ type: 'UPDATE', response: {...response, [name]: files[0]}})
      } else {
        dispatch({ type: 'UPDATE', response: {...response, [name]: type === "checkbox" ? checked : value}})
      }    }

    function addOrRemoveCheckbox(id, name) {

      const newCategories = [...response.categories];
      const index = newCategories.map(cat => cat.categoryId).indexOf(id);
      
      if (index === -1) {
          newCategories.push({categoryId: id, categoryName: name});
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
