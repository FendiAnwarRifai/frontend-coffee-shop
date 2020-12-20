import Vue from 'vue'
import VueRouter from 'vue-router'

// import Landing from '../views/Landing.vue'
import Landing from '../views/Landing2.vue'

// Auth (Sign Up, Login, Forgot)
import MainAuth from '../views/auth/MainAuth.vue'
import SignUp from '../views/auth/SignUp.vue'
import Login from '../views/auth/Login.vue'
import Forgot from '../views/auth/Forgot.vue'
import newPassword from '../views/auth/newPassword.vue'
// Customer
// import Customer from '../views/customer/MainCust.vue'\
import Customer from '../views/main/index.vue'
import ProductDetail from '../views/customer/ProductDetail.vue'
import Profile from '../views/customer/Profile.vue'
import editPassword from '../views/customer/editPassword.vue'
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
import HomeAdm from '../views/Home/Admin/admin.vue'
import HomeCust from '../views/Home/Customer/customer.vue'
import DetailProduct from '../views/admin/DetailProduct.vue'
import EditProduct from '../views/admin/EditProduct.vue'

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
    meta: { requiresVisitor: true },
    children: [
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresVisitor: true }
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { requiresVisitor: true }
      },
      {
        path: 'forgot',
        name: 'Forgot',
        component: Forgot,
        meta: { requiresVisitor: true }
      },
      {
        path: 'new-password',
        name: 'newPassword',
        component: newPassword,
        meta: { requiresVisitor: true }
      }
    ]
  },
  {
    path: '/cust',
    name: 'Customer',
    component: Customer,
    redirect: '/cust/product',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'product-d',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: { requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      },
      {
        path: 'product',
        name: 'Product',
        component: Product,
        meta: { requiresAuth: true }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true }
      },
      {
        path: 'history',
        name: 'History',
        component: History,
        meta: { requiresAuth: true }
      },
      {
        path: 'edit-password',
        name: 'editPassword',
        component: editPassword,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'add-product',
        name: 'NewProduct',
        component: NewProduct,
        meta: { requiresAuth: true }
      },
      {
        path: 'manage-order',
        name: 'ManageOrder',
        component: ManageOrder,
        meta: { requiresAuth: true }
      },
      {
        path: 'product',
        name: 'ProductAdmin',
        component: ProductAdmin,
        meta: { requiresAuth: true }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: 'detail-product',
        name: 'DetailProduct',
        component: DetailProduct,
        meta: { requiresAuth: true }
      },
      {
        path: 'edit-product',
        name: 'EditProduct',
        component: EditProduct,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/admin/home',
    name: 'HomeAdm',
    component: HomeAdm,
    meta: { requiresAuth: true }
  },
  {
    path: '/cust/home',
    name: 'HomeCust',
    component: HomeCust,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/auth/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (localStorage.getItem('token')) {
      next({
        path: '/cust/product'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
