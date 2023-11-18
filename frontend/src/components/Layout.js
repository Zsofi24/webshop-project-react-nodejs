import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import useScreenSize from '../hooks/useScreenSize';
import MobileNav from './layout/MobileNav';

export default function Layout() {

  const screenSize = useScreenSize();

  return (
    (screenSize.width > 1025)
    ?
    <>
    <header>
        <Nav />
    </header>
    <main>
        <Outlet/>
    </main>
    </>
    :
    <div>
      <MobileNav />
      <main>
        <Outlet />
      </main>
    </div>
  )
}