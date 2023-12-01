import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminMobileNav from './AdminMobileNav';
import useScreenSize from '../../../hooks/useScreenSize';

export default function AdminLayout() {

  const screenSize = useScreenSize();

  return (
    
    (screenSize.width > 1025)
    ?
    <div className='admin-wrapper'>
      <aside className='admin-aside'>
        <AdminNav/>
      </aside>
      <main>
        <Outlet/>
      </main>
    </div>
    :
    <div>
      <AdminMobileNav />
      <main>
        <Outlet />
      </main>
    </div>    
  )
}
