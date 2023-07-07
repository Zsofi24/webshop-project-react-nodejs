import {createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';

const routes = createBrowserRouter([
    {element: <Layout />, 
        path: '/',
        children: [
            { index: true, element: <Home />},
            { path: '/belepes', element: <Login />},
            { path: '/regisztracio', element: <Registration />},
            { path: '/termekek', element: <Products />}

        ]

    }
])

export default routes;