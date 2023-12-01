import { Link, useSearchParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import useProducts from '../../hooks/useProducts';
import Pagination from '../../components/Pagination';
import ProductListTable from '../../components/admin/ProductListTable';
import Button from '../../components/button/Button';
import { productService } from '../../services/productServices';
import Searchbar from '../../components/Searchbar';

export default function AdminProductList() {

  const [{loading, response, error, totalPages, page} , dispatch] = useProducts();
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  function onPageChange(pagenum) {
    searchParams.set("page", pagenum)
    setSearchParams(searchParams)
    dispatch({ type: 'PAGECHANGE', page: pagenum})
  }

  function productDelete(id) {
    productService.deleteProduct(id)
      .then(id => dispatch({ type: 'DELETE', response: deleteproduct(response, id)}))
      .catch(err => alert(err.statusText))
  }

  function update(products, newproduct) {
    let updatedProducts = products.map(p => {
      if(p.id == newproduct.id) return newproduct
      else return p
    })
    return updatedProducts
  }

  function deleteproduct(products, deletedid) {
    return products.filter(p => p.id != deletedid.id)
  }

  function productVisible(product, id) {
    const modifyProduct = {...product, visible: !product.visible }
    productService.updateProduct(modifyProduct, id)
      .then(resp => {
        dispatch({ type: 'UPDATE', response: update(response, resp)})
    })    
  }

  return (
    <>
    <section className='padding-helper'>
      { error && <div>ERROR OH NO</div> }
      { 
      <>
        <Link to='/admin/termekek/termek-felvitel'><Button type='admin-create'>+ ÚJ TERMÉK</Button></Link>
        <Searchbar />          
        {searchParams.get('q') && <h3>A keresett termék: {searchParams.get('q')}</h3>}
        {
          response 
          &&
          <ProductListTable 
            products={response}
            productDelete={productDelete}
            productVisible={productVisible}
          />       
        }
        {
          loading && <div>
            <div><ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /></div> 
          </div>
          }
        {
          !loading
          &&
          response?.length <= 0
          ?
          <h3>Nincs a keresésnek megfelelő termék</h3>
          :
          <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={page}/>
        }
      </>
      }
    </section>
    </>
  )
}
