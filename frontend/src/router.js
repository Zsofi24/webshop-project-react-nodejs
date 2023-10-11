import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Layout from './components/Layout';
import Home, {loader as homeLoader} from './pages/Home'
import Login, {loader as loginLoader} from './pages/Login';
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
import AdminCategoryList from './pages/admin/AdminCategoryList';
import AddNewCategory from './pages/admin/AddNewCategory';
import EditCategory from './pages/admin/EditCategory';
import SendOrder from './pages/SendOrder';
import ProductDetails from './components/user/product/ProductDetails';
import requireAuthAdmin from './utils/requireAuthAdmin';
import UserOrderDetails from './components/user/orders/UserOrderDetails';

export const router = createBrowserRouter(createRoutesFromElements([
    <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>} loader={homeLoader}/>
        <Route path='/belepes' element={<Login />} loader={loginLoader} />
        <Route path='/regisztracio' element={<Registration />}/>
        <Route path='/termekek' element={<Products />}/>
        <Route path='/termekek/:productid' element={<ProductDetails />}/>
        <Route path='/rendelesek' element={<Orders />}/>
        <Route path='/rendelesek/:orderid' element={<UserOrderDetails />}/>
        <Route path='/kosar' element={<Cart />}/>
        <Route path='/rendeles' element={<SendOrder />}/>
        <Route path='/profil' element={<Profile />}/>
    </Route>,
    <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} loader={async () => await requireAuthAdmin()}/>
        <Route path='termekek' element={<AdminProductList />} loader={async () => await requireAuthAdmin()}/>
        <Route path='termekek/:productid' element={<EditProduct />} loader={async () => await requireAuthAdmin()}/>
        <Route path='termekek/termek-felvitel' element={<AddNewProduct />} loader={async () => await requireAuthAdmin()}/>
        <Route path='kategoriak' element={<AdminCategoryList />} loader={async () => await requireAuthAdmin()}/>
        <Route path='kategoriak/:categoryid' element={<EditCategory />} loader={async () => await requireAuthAdmin()}/>
        <Route path='kategoriak/kategoria-felvitel' element={<AddNewCategory />} loader={async () => await requireAuthAdmin()}/>
    </Route>
]
))
