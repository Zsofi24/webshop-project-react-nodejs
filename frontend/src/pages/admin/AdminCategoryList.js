import { Link, useSearchParams } from 'react-router-dom';
import useCategories from '../../hooks/useCategories';
import Button from '../../components/button/Button'; 
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
      .then(id => dispatch({ type: 'DELETE', response: deletecategory(response, id)}))
      .catch(err => alert(err.statusText))
  }

  function deletecategory(categories, deletedid) {
    return categories.filter(c => c.categoryId != deletedid.id)
  }

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
