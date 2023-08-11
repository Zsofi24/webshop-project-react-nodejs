import {createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

const routes = createBrowserRouter([
    {element: <Layout />, 
        path: '/',
        children: [
            { index: true, element: <Home />},
            { path: '/belepes', element: <Login />},
            { path: '/regisztracio', element: <Registration />},
            { path: '/termekek', element: <Products />},
            { path: '/kosar/', element: <Cart />},
            { path: '/profile', element: <Profile />},
            { path: '/rendelesek', element: <Orders />}

        ]
    }
])

export default routes;