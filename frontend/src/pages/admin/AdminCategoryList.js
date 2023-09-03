import React, { useState } from 'react'
import useCategories from '../../hooks/useCategories';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import CategoryListTable from '../../components/admin/CategoryListTable';

export default function AdminCategoryList() {

  const [{loading, response, error, totalPages, currentPage} , dispatch] = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  function onPageChange(pagenum) {
    searchParams.set("currentPage", pagenum)
    setSearchParams(searchParams)
    dispatch({ type: 'PAGECHANGE', currentPage: pagenum})
  }

  function categoryDelete(id) {
    // productService.deleteProduct(id)
    //   .then(id => console.log(id))
  }

  console.log(response, "resp");
    
  return (
    <>
    <section>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { 
      <>
        <Link to='/admin/kategoriak/kategoria-felvitel'><Button>ÚJ KATEGÓRIA</Button></Link>
        <CategoryListTable 
          categories={response}
          categoryDelete={categoryDelete}
        />          
      </>
      }
    </section>
    <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={currentPage}/>
    </>
  )
}
