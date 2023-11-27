import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Layout from './components/user/layout/Layout';
import Home, {loader as homeLoader} from './pages/Home'
import Login, {loader as loginLoader} from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminProductList from './pages/admin/AdminProductList';
import EditProduct from './pages/admin/EditProduct';
import AddNewProduct from './pages/admin/AddNewProduct';
import AdminCategoryList from './pages/admin/AdminCategoryList';
import AddNewCategory from './pages/admin/AddNewCategory';
import EditCategory from './pages/admin/EditCategory';
import SendOrder from './pages/SendOrder';
import ProductDetails from './components/user/product/ProductDetails';
import requireAuthAdmin from './utils/requireAuthAdmin';
import UserOrderDetails from './pages/UserOrderDetails';
import Error from './components/error/Error';

export const router = createBrowserRouter(createRoutesFromElements([
    <Route path='/' element={<Layout/>} errorElement={<Error />} key='1'>
        <Route index element={<Home/>} loader={homeLoader} errorElement={<Error />}/>
        <Route path='/belepes' element={<Login />} loader={loginLoader} errorElement={<Error />} />
        <Route path='/regisztracio' element={<Registration />} errorElement={<Error />}/>
        <Route path='/termekek' element={<Products />} errorElement={<Error />}/>
        <Route path='/termekek/:productid' element={<ProductDetails />} errorElement={<Error />}/>
        <Route path='/rendelesek' element={<Orders />} errorElement={<Error />}/>
        <Route path='/rendelesek/:orderid' element={<UserOrderDetails />} errorElement={<Error />}/>
        <Route path='/kosar' element={<Cart />} errorElement={<Error />}/>
        <Route path='/rendeles' element={<SendOrder />} errorElement={<Error />}/>
        <Route path='/profil' element={<Profile />} errorElement={<Error />}/>
    </Route>,
    <Route path='/admin' element={<AdminLayout />} errorElement={<Error />} key='2'>
        <Route index element={<AdminDashboard />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='termekek' element={<AdminProductList />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='termekek/:productid' element={<EditProduct />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='termekek/termek-felvitel' element={<AddNewProduct />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='kategoriak' element={<AdminCategoryList />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='kategoriak/:categoryid' element={<EditCategory />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='kategoriak/kategoria-felvitel' element={<AddNewCategory />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
    </Route>
]
))
