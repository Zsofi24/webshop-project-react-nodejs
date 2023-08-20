import React, { useEffect, useState } from 'react'
import useProducts from '../../hooks/useProducts';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import ProductListTable from '../../components/admin/ProductListTable';

export default function AdminProductList() {

  const [loading, response, error] = useProducts();

  
  const [currentTableData, setCurrentTableData] = useState(null)
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  function onPageChange(pagenum) {
    searchParams.set("currentPage", pagenum)
    setSearchParams(searchParams)
    setCurrentPage(pagenum)
  }

  useEffect(() => {
    setTotalPages(Math.ceil(response?.length / pageSize))
  }, [response])

  useEffect(() => {
    let query = "";
    searchParams.forEach((key, value) => {
      query = query + `${value}=${key}&`;
    })
    console.log(query);
    fetch(`http://localhost:3031/api/products?${query}`)
      .then(resp => resp.json())
      .then(prod => setCurrentTableData(prod))
  }, [searchParams])


  return (
    <>
    <section>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { <ProductListTable 
          products={currentTableData}>
        </ProductListTable>
      }
    </section>
    <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
    </>

  )
}
