import { Link, useSearchParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import useUsers from '../../hooks/useUsers';
import Pagination from '../../components/Pagination';
import UserListTable from '../../components/admin/UsersListTable';
import Button from '../../components/button/Button';
import Searchbar from '../../components/Searchbar';

export default function AdminUsersList() {

    const [{loading, response, error, totalPages, page} , dispatch] = useUsers();
    console.log(response, "users");

    const [searchParams, setSearchParams] = useSearchParams();

    function onPageChange(pagenum) {
        searchParams.set("page", pagenum)
        setSearchParams(searchParams)
        dispatch({ type: 'PAGECHANGE', page: pagenum})
      }

  return (
    <>
    <section className='padding-helper'>
      { error && <div>ERROR OH NO</div> }
      { 
      <>
        <Link to='/admin/felhasznalok/felhasznalo-letrehozas'><Button type='admin-create'>+ ÚJ FELHASZNÁLÓ</Button></Link>
        <Searchbar />          
        {searchParams.get('q') && <h3>A keresett felhasználó (email-cím alapján): {searchParams.get('q')}</h3>}
        {
          response 
          &&
          <UserListTable 
            users={response}
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
          <h3>Nincs a keresésnek megfelelő felhasználó</h3>
          :
          <Pagination totalPages={totalPages} onPageChange={onPageChange} currentPage={page}/>
        }
      </>
      }
    </section>
    </>
  )
}
