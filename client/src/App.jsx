import React from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import Products from './pages/Products'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import Order from './pages/Order'
import SellerLogin from './components/Seller/SellerLogin'
import SellerLayout from './pages/Seller/SellerLayout'
import AddProduct from './pages/Seller/AddProduct'
import ProductList from './pages/Seller/ProductList'
import SellerOrder from './pages/Seller/SellerOrder'

const App = () => {

  const isSeller = useLocation().pathname.includes("seller")
  const { showUserLogin, seller } = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {isSeller ? null :<NavBar/>}
      {showUserLogin ? <Login/> : null}

      <Toaster/>

      <div className={`${isSeller ? "" :  "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:productId' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
          <Route path='/my-orders' element={<Order/>}/>
          <Route path='/seller' element={seller ? <SellerLayout/> : <SellerLogin/>}>
            <Route index element={seller ? <AddProduct/> : null}/>
            <Route path='product-list' element={seller ? <ProductList/> : null}/>
            <Route path='orders' element={seller ? <SellerOrder/> : null}/>
          </Route>
        </Routes>
      </div>

      {isSeller ? null : <Footer/>}
    </div>
  )
}

export default App
