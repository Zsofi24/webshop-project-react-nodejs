import { Link, useSearchParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import Pagination from '../../components/Pagination';
import ProductListTable from '../../components/admin/ProductListTable';
import Button from '../../components/button/Button';
import { productService } from '../../services/productServices';

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
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { 
      <>
        <Link to='/admin/termekek/termek-felvitel'><Button type='admin-create'>+ ÚJ TERMÉK</Button></Link>
        <ProductListTable 
          products={response}
          productDelete={productDelete}
          productVisible={productVisible}
        >          
        </ProductListTable>
      </>
      }
    </section>
    <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={page}/>
    </>
  )
}
