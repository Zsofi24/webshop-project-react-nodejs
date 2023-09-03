import React, { useEffect, useState } from 'react'
import useProducts from '../../hooks/useProducts';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ProductListTable from '../../components/admin/ProductListTable';
import Button from '../../components/Button';
import { productService } from '../../services/productServices';

export default function AdminProductList() {

  const [{loading, response, error, totalPages, currentPage} , dispatch] = useProducts();
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  function onPageChange(pagenum) {
    searchParams.set("currentPage", pagenum)
    setSearchParams(searchParams)
    dispatch({ type: 'PAGECHANGE', currentPage: pagenum})
  }

  function productDelete(id) {
    productService.deleteProduct(id)
      .then(id => console.log(id))
  }

  function productVisible(product, id) {
    const modifyProduct = {...product, visible: !product.visible }
    productService.updateProduct(modifyProduct, id)
      .then(resp => {
        dispatch({ type: 'UPDATE', response: response?.map(product => { 
          if(product.id == resp.id) return resp 
          else return product
        })
      })
    })    
  }

  return (
    <>
    <section>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { 
      <>
        <Link to='/admin/termekek/termek-felvitel'><Button>ÚJ TERMÉK</Button></Link>
        <ProductListTable 
          products={response}
          productDelete={productDelete}
          productVisible={productVisible}
        >          
        </ProductListTable>
      </>
      }
    </section>
    <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
    </>
  )
}
