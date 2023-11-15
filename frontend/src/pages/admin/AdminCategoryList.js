import React from 'react'
import useCategories from '../../hooks/useCategories';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Pagination from '../../components/Pagination';
import CategoryListTable from '../../components/admin/CategoryListTable';
import { categoryService } from '../../services/categoryService';

export default function AdminCategoryList() {

  const [{loading, response, error, totalPages, page} , dispatch] = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  function onPageChange(pagenum) {
    searchParams.set("page", pagenum)
    setSearchParams(searchParams)
    dispatch({ type: 'PAGECHANGE', page: pagenum})
  }

  function categoryDelete(id) {
    categoryService.deleteCategory(id)
     .then(id => console.log(id))
     .catch(err => alert(err.statusText))
  }

  console.log(response, "resp");
    
  return (
    <>
    <section className='padding-helper'>
      { loading && <div>Loading...</div> }
      { error && <div>ERROR OH NO</div> }
      { 
      <>
        <Link to='/admin/kategoriak/kategoria-felvitel'><Button type="admin-create">+ ÚJ KATEGÓRIA</Button></Link>
        <CategoryListTable 
          categories={response}
          categoryDelete={categoryDelete}
        />          
      </>
      }
    <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={page}/>
    </section>
    </>
  )
}
