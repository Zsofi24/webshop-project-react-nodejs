import {createBrowserRouter} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/AdminLayout';
import AdminProductList from './pages/admin/AdminProductList';

const routes = createBrowserRouter([
    {element: <Layout />, 
        path: '/',
        children: [
            { index: true, element: <Home /> },
            { path: '/belepes', element: <Login /> },
            { path: '/regisztracio', element: <Registration /> },
            { path: '/termekek', element: <Products /> },
            { path: '/kosar/', element: <Cart /> },
            { path: '/profile', element: <Profile /> },
            { path: '/rendelesek', element: <Orders /> }

        ]
    },
    {
        element: <AdminLayout />,
            path: '/admin',
            children: [
                { index: true, element: <AdminDashboard /> },
                { path: 'termekek', element: <AdminProductList />}
            ]
    }
])

export default routes;