import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import useScreenSize from '../../../hooks/useScreenSize';
import MobileNav from './MobileNav';
import useChangeNavColor from '../../../hooks/useChangeNavColor';

export default function Layout() {

  const screenSize = useScreenSize();
  const [ color, setColor ] = useChangeNavColor(false);

  return (
    (screenSize.width > 1025)
    ?
    <>
    <header className={color ? 'opacity-nav' : ''}>
        <Nav />
    </header>
    <main>
        <Outlet/>
    </main>
    </>
    :
    <>
    <header className={color ? 'opacity-nav mobile-header' : 'mobile-header'}>
      <MobileNav />
    </header>
    <main>
      <Outlet />
    </main>
    </>
  )
}