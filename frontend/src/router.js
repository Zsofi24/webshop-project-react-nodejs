import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import Layout from './components/user/layout/Layout';
import HomePage, {loader as homeLoader} from './pages/user/HomePage'
import LoginPage, {loader as loginLoader} from './pages/user/LoginPage';
import Registration from './pages/user/RegistrationPage';
import ProductsPage from './pages/user/ProductsPage';
import ProfilePage from './pages/user/ProfilePage';
import CartPage from './pages/user/CartPage';
import OrdersPage from './pages/user/OrdersPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from './components/admin/layout/AdminLayout';
import AdminProductList from './pages/admin/AdminProductList';
import EditProduct from './pages/admin/EditProduct';
import AddNewProduct from './pages/admin/AddNewProduct';
import AdminCategoryList from './pages/admin/AdminCategoryList';
import AddNewCategory from './pages/admin/AddNewCategory';
import EditCategory from './pages/admin/EditCategory';
import SendOrderPage from './pages/user/SendOrderPage';
import ProductDetailsPage from './components/user/product/ProductDetails';
import requireAuthAdmin from './utils/requireAuthAdmin';
import UserOrderDetailsPage from './pages/user/UserOrderDetailsPage';
import Error from './components/error/Error';
import AdminUsersList from './pages/admin/AdminUsersList';
import EditUser from './pages/admin/EditUser';
import AdminNewUser from './pages/admin/AdminNewUser';
import RegistrationPage from './pages/user/RegistrationPage';
import OrderSumPage from './pages/user/OrderSumPage';

export const router = createBrowserRouter(createRoutesFromElements([
    <Route path='/' element={<Layout/>} errorElement={<Error />} key='1'>
        <Route index element={<HomePage/>} loader={homeLoader} errorElement={<Error />}/>
        <Route path='/belepes' element={<LoginPage />} loader={loginLoader} errorElement={<Error />} />
        <Route path='/regisztracio' element={<RegistrationPage />} errorElement={<Error />}/>
        <Route path='/termekek' element={<ProductsPage />} errorElement={<Error />}/>
        <Route path='/termekek/:productid' element={<ProductDetailsPage />} errorElement={<Error />}/>
        <Route path='/rendelesek' element={<OrdersPage />} errorElement={<Error />}/>
        <Route path='/rendelesek/:orderid' element={<UserOrderDetailsPage />} errorElement={<Error />}/>
        <Route path='/kosar' element={<CartPage />} errorElement={<Error />}/>
        <Route path='/rendeles' element={<SendOrderPage />} errorElement={<Error />}/>
        <Route path='/rendeles-osszegzes' element={<OrderSumPage />} errorElement={<Error />}/>
        <Route path='/profil' element={<ProfilePage />} errorElement={<Error />}/>
    </Route>,
    <Route path='/admin' element={<AdminLayout />} errorElement={<Error />} key='2'>
        <Route index element={<AdminDashboard />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='termekek' element={<AdminProductList />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='termekek/:productid' element={<EditProduct />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='termekek/termek-felvitel' element={<AddNewProduct />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='kategoriak' element={<AdminCategoryList />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='kategoriak/:categoryid' element={<EditCategory />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='kategoriak/kategoria-felvitel' element={<AddNewCategory />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='felhasznalok' element={<AdminUsersList />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='felhasznalok/:userid' element={<EditUser />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
        <Route path='felhasznalok/felhasznalo-letrehozas' element={<AdminNewUser />} loader={async () => await requireAuthAdmin()} errorElement={<Error />}/>
    </Route>
]
))
