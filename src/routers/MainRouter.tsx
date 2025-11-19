import { NavLink, Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout/MainLayout'
import { useEffect } from 'react'
import MenuLayoutProfile from './MenuLayoutProfile'
import AdminLayout from './AdminLayout/AdminLayout'
import AuthLayout from './AuthLayout/AuthLayout'
import AuthCheck from './AuthCheck'
import ProductWaitingPage from '@/pages/ProductWaitingPage'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CartPage from '@/pages/CartPage'
import ProfilePage from '@/pages/ProfilePage'
import PaymentPage from '@/pages/PaymentPage'
import ChangePasswordPage from '@/pages/ChangePasswordPage'
import MyVouchersPage from '@/pages/MyVouchersPage'
import OrderHistoryPage from '@/pages/OrderHistoryPage'
import AffiliatePage from '@/pages/AffiliatePage'
import AccumulatePoints from '@/pages/AccumulatePoints'
import NotificationPage from '@/pages/NotificationPage'
import AdminAddCategoryPage from '@/pages/AdminAddCategory'
import AdminAddProduct from '@/pages/AdminAddProduct'
import AdminManageProduct from '@/pages/AdminManageProduct'
import AdminManageUser from '@/pages/AdminManageUser'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ManageBankAccountPage from '@/pages/ManageBankAccountPage'
import ManagePaymentPage from '@/pages/ManagePaymentPage'
import ManageRevenuePage from '@/pages/ManageRevenuePage'
import ManageOrderPage from '@/pages/ManageOrderPage'
import ManageOrderWaitPage from '@/pages/ManageOrderWaitPage'
import FetchDataStore from './FetchDataStore'
import ScrollToTop from '@/components/atoms/ScrollToTop'
import RealtimeFirebase from '@/pages/RealtimeFirebase'

const MainRouter = () => {
  return (
    <div>
      <AuthCheck />
      <FetchDataStore />
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/realtime' element={<RealtimeFirebase />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/category/:slug?' element={<ProductPage />} />
          <Route path='/product/:slug?' element={<ProductDetailPage />} />
          <Route path='/gio-hang' element={<CartPage />} />

          <Route path='/profile' element={<MenuLayoutProfile />}>
            <Route path='my-profile' element={<ProfilePage />} />
            <Route path='deposit-withdrawal/:id?' element={<PaymentPage />} />
            <Route path='change-password' element={<ChangePasswordPage />} />
            <Route path='vourcher' element={<MyVouchersPage />} />
            <Route path='history-product/:id?' element={<OrderHistoryPage />} />
            <Route path='affiliate/:id?' element={<AffiliatePage />} />
            <Route path='accumulate-points' element={<AccumulatePoints />} />
            <Route path='noti' element={<NotificationPage />} />
          </Route>
        </Route>
        <Route element={<AdminLayout />} path='/admin'>
          <Route path='manage-category' element={<AdminAddCategoryPage />} />
          <Route path='add-product/:id?' element={<AdminAddProduct />} />
          <Route path='edit-product/:id?' element={<AdminAddProduct />} />
          <Route path='manage-product' element={<AdminManageProduct />} />
          <Route path='manage-user' element={<AdminManageUser />} />
          <Route path='manage-product-waiting' element={<ProductWaitingPage />} />
          <Route path='manage-payment' element={<ManagePaymentPage />} />
          <Route path='manage-bank-account' element={<ManageBankAccountPage />} />
          <Route path='revenue' element={<ManageRevenuePage />} />
          <Route path='manage-order' element={<ManageOrderPage />} />
          <Route path='manage-order-waiting' element={<ManageOrderWaitPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/dang-nhap' element={<LoginPage />}></Route>
          <Route path='/dang-ky' element={<RegisterPage />}></Route>
        </Route>
        <Route
          path='*'
          element={
            <div className='h-screen gap-3 flex items-center flex-col justify-center'>
              <div className=' font-semibold text-primary text-xl'>Page Not Found</div>
              <NavLink to={'/'} className='underline'>
                Quay về trang chủ
              </NavLink>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  )
}

export default MainRouter
