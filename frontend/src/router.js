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
import EditProduct from './pages/admin/EditProduct';
import AddNewProduct from './pages/admin/AddNewProduct';
import ProductDetails from './components/ProductDetails';

const routes = createBrowserRouter([
    {element: <Layout />, 
        path: '/',
        children: [
            { index: true, element: <Home /> },
            { path: '/belepes', element: <Login /> },
            { path: '/regisztracio', element: <Registration /> },
            { path: '/termekek', element: <Products /> },
            { path: '/termekek/:id', element: <ProductDetails /> },
            { path: '/kosar', element: <Cart /> },
            { path: '/profile', element: <Profile /> },
            { path: '/rendelesek', element: <Orders /> }

        ]
    },
    {
        element: <AdminLayout />,
            path: '/admin',
            children: [
                { index: true, element: <AdminDashboard /> },
                { path: 'termekek', element: <AdminProductList />},
                { path: 'termekek/:productid', element: <EditProduct />},
                { path: 'termekek/termek-felvitel', element: <AddNewProduct />}
            ]
    }
])

export default routes;