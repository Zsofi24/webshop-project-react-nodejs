import React, { useEffect, useState } from 'react'
import useProducts from '../../hooks/useProducts';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ProductListTable from '../../components/admin/ProductListTable';
import { Button } from '../../assets/css/Button';
import { productService } from '../../services/productServices';

export default function AdminProductList() {

  const [loading, response, error, total] = useProducts();

  
  const [currentTableData, setCurrentTableData] = useState(null)
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  function onPageChange(pagenum) {
    searchParams.set("currentPage", pagenum)
    setSearchParams(searchParams)
    setCurrentPage(pagenum)
  }

  useEffect(() => {
    setTotalPages(Math.ceil(total / pageSize))
  }, [response])

  useEffect(() => {
    let query = "";
    searchParams.forEach((key, value) => {
      query = query + `${value}=${key}&`;
    })
    console.log(query);
    fetch(`http://localhost:3031/api/products?${query}`)
      .then(resp => resp.json())
      .then(prod => setCurrentTableData(prod.products))
  }, [searchParams])

  function productDelete(id) {
    productService.deleteProduct(id)
      .then(id => console.log(id))
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
          products={currentTableData}
          productDelete={productDelete}
        >          
        </ProductListTable>
      </>
      }
    </section>
    <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
    </>

  )
}
