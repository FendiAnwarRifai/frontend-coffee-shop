import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from '../views/Landing.vue'

// Auth (Sign Up, Login, Forgot)
import MainAuth from '../views/auth/MainAuth.vue'
import SignUp from '../views/auth/SignUp.vue'
import Login from '../views/auth/Login.vue'
import Forgot from '../views/auth/Forgot.vue'

// Customer
// import Customer from '../views/customer/MainCust.vue'\
import Customer from '../views/main/index.vue'
import ProductDetail from '../views/customer/ProductDetail.vue'
import Profile from '../views/customer/Profile.vue'

// Admin
// import Admin from '../views/admin/MainAdmin.vue'
import Admin from '../views/admin/index.vue'
import NewProduct from '../views/admin/NewProduct.vue'
import Product from '../views/main/product/product.vue'
import Cart from '../views/main/cart/cart.vue'
import History from '../views/main/History/history.vue'
import ManageOrder from '../views/admin/manage order/manageorder.vue'
import ProductAdmin from '../views/admin/product/index.vue'
import Dashboard from '../views/admin/dashboard/dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/auth',
    name: 'MainAuth',
    component: MainAuth,
    redirect: '/auth/signup',
    children: [
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'forgot',
        name: 'Forgot',
        component: Forgot
      }
    ]
  },
  {
    path: '/cust',
    name: 'Customer',
    component: Customer,
    children: [
      {
        path: 'product-d',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'product',
        name: 'Product',
        component: Product
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: 'history',
        name: 'History',
        component: History
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: 'add-product',
        name: 'NewProduct',
        component: NewProduct
      },
      {
        path: 'manage-order',
        name: 'ManageOrder',
        component: ManageOrder
      },
      {
        path: 'product',
        name: 'ProductAdmin',
        component: ProductAdmin
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
