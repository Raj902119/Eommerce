import './App.css'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from "./pages/CartPage"
import Checkout from './pages/Checkout'
import Protected from './components/Protected';
import ErrorPage from './pages/ErrorPage.jsx';
import OrderSucessPage from './pages/OrderSucessPage.jsx';
import UserOrdersPage from './pages/UserOrdersPage.jsx';

import { useEffect} from 'react';
import { TotalItems } from './app/cartSlice';
import {selectLoggedInUser} from './app/authSlice.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchAllUserItemsAsync } from './app/cartSlice';
import { fetchLoggedInUserOrdersAsync } from './app/UserSlice.js';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserProfilePage from './pages/UserProfilePage.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import AdminHome from './pages/AdminHomePage.jsx';
import ProtectedAdmin from './AdminFeature/ProtectedAdmin.jsx';
import AdminProductDetail from './AdminFeature/components/AdminProductDetails.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';
import AdminOrderPage from './pages/AdminOrderPage.jsx';
function App() {
  
  const userinfo = useSelector(selectLoggedInUser);
  const data = useSelector(TotalItems);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(userinfo){
      dispatch(fetchAllUserItemsAsync(userinfo));
      dispatch(fetchLoggedInUserOrdersAsync(userinfo.id))
    }
  },[dispatch,userinfo])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Protected><Home /></Protected>} />
          <Route path="/admin" exact element={<AdminHome />} />
          <Route path="/forgotePassword" exact element={<ForgotPasswordPage />} />
          <Route path="/profile" exact element={<Protected><UserProfilePage /></Protected>} />
          <Route path="/signup" exact element={<SignupPage />} />
          <Route path="/orders" exact element={<Protected><UserOrdersPage /></Protected>} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/logout" exact element={<LogoutPage />} />
          <Route path="/cart" exact element={<Protected><CartPage /></Protected>} />
          <Route path="/checkout" exact element={<Protected><Checkout /></Protected>} />
          <Route path='/product-detail/:id' exact element={<Protected><ProductDetailPage /></Protected>} />
          <Route path='/admin/product-detail/:id' exact element={<ProtectedAdmin><AdminProductDetail /></ProtectedAdmin>} />
          <Route path='/admin/product-form' exact element={<ProtectedAdmin><ProductFormPage /></ProtectedAdmin>} />
          <Route path='/admin/order' exact element={<ProtectedAdmin><AdminOrderPage /></ProtectedAdmin>} />
          <Route path='/admin/product-form/edit/:id' exact element={<ProtectedAdmin><ProductFormPage /></ProtectedAdmin>} />
          <Route path="/order-sucess/:id" exact element={<Protected><OrderSucessPage /></Protected>} />
          <Route path="*" exact element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
