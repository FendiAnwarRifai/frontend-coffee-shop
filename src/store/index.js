import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkoutDineIn: {
      products: [],
      delivery_method: 'dine in',
      delivery_time: ''
    },
    checkoutHomeDelivery: {
      products: [],
      delivery_method: 'home delivery',
      delivery_time: ''
    },
    checkoutTakeAway: {
      products: [],
      delivery_method: 'pick up',
      delivery_time: ''
    },
    detailP: {
      id: 0,
      img: '.',
      name: '.',
      description: '.',
      amount: 0,
      price: 0,
      priceMid: 0,
      priceHigh: 0,
      deliver: '.',
      now: 'yes',
      date: '',
      size: []
    },
    sizeProduct: '',
    nameproduct: '',
    product: 0,

    // Customer Profile
    editmode: 0,
    // email: 'zalikha@gmail.com',
    // gender: '',

    // Add to cart
    checkoutdine: [],
    checkoutdoor: [],
    checkoutpick: [],
    // History Products
    history: [],

    // Profile
    profile: {},
    manageorderid: {},
    allmanageorder: []
  },
  mutations: {
    SET_PRODUCT_DETAIL (state, payload) {
      state.detailP = { ...payload }
    },
    SET_SIZE (state, payload) {
      state.sizeProduct = payload
    },
    // Dine In
    SET_CHECKOUT_DINE_IN (state, payload) {
      state.checkoutDineIn.products.push(payload)
    },
    SET_QTY_DINE_IN (state, payload) {
      state.checkoutDineIn.products[payload.checkId].qty += payload.qtyNew
    },
    // Home Delivery
    SET_CHECKOUT_HOME_DEL (state, payload) {
      state.checkoutHomeDelivery.products.push(payload)
    },
    SET_QTY_HOME_DEL (state, payload) {
      state.checkoutHomeDelivery.products[payload.checkId].qty += payload.qtyNew
    },
    // Pick Up
    SET_CHECKOUT_PICK_UP (state, payload) {
      state.checkoutTakeAway.products.push(payload)
    },
    SET_QTY_PICK_UP (state, payload) {
      state.checkoutTakeAway.products[payload.checkId].qty += payload.qtyNew
    },
    // Delivery
    SET_DELIVERY (state, payload) {
      state.detailP.deliver = payload.deliver
      state.detailP.now = payload.now
      state.detailP.date = payload.date
      state.checkoutDineIn.delivery_time = payload.date
      state.checkoutHomeDelivery.delivery_time = payload.date
      state.checkoutTakeAway.delivery_time = payload.date
    },
    SET_AMOUNT_PLUS (state) {
      state.detailP.amount++
    },
    SET_AMOUNT_MINUS (state) {
      if (state.detailP.amount > 0) {
        state.detailP.amount--
      }
    },
    changeEditMode (state) {
      if (state.editmode === 0) {
        state.editmode++
      }
    },
    changeStaticMode (state) {
      if (state.editmode === 1) {
        state.editmode--
      }
    },
    addProduct (state, payload) {
      state.nameproduct = payload.name
    },
    changeGender (state, payload) {
      state.gender = payload
    },
    addCheckout (state, payload) {
      state.checkout.push(payload)
    },
    SET_HISTORY (state, payload) {
      state.history = payload
    },
    SET_PROFILE (state, payload) {
      state.profile = payload
    },
    SET_MANAGEORDERID (state, payload) {
      state.manageorderid = payload
    },
    SET_ALLMANAGEORDER (state, payload) {
      state.allmanageorder = payload
    }
  },
  actions: {
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response)
        if (error.response.status === 401) {
          if (error.response.data.messages === 'invalid token') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('role_id')
            this.$router.push('/auth/login')
          } else if (error.response.data.messages === 'Token Expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('role_id')
            this.$router.push('/auth/login')
          }
        }
        return Promise.reject(error)
      })
    },
    getAllHistory (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}history`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            console.log(res.data.data)
            context.commit('SET_HISTORY', res.data.data)
            resolve(res.data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getAllManageOrder (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}order/all`)
          .then((res) => {
            console.log(res.data.data)
            context.commit('SET_ALLMANAGEORDER', res.data.data)
            resolve(res.data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteHistory (context, { deleteProducts }) {
      return new Promise((resolve, reject) => {
        console.log(deleteProducts)
        axios.delete(`${process.env.VUE_APP_BASE_URL}history/delete-history`,
          { data: { order_detail_ids: deleteProducts } }
        )
          .then((res) => {
            console.log(deleteProducts)
            resolve(res.data.data)
          })
          .catch((err) => {
            console.log(err.response)
            reject(err)
          })
      })
    },
    getCustProfile (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}user/detail`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            context.commit('SET_PROFILE', res.data.data)
            resolve(res.data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getManageOrderId (context) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}order/detail-order/${localStorage.getItem('allorderid')}`)
          .then((res) => {
            console.log(res.data.data)
            context.commit('SET_MANAGEORDERID', res.data.data)
            resolve(res.data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateProfile ({ context, payload }, { email, username, firstName, lastName, address, phone, gender, bod }) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_BASE_URL}user/edit-profile`, {
          email: email,
          username: username,
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone_number: phone,
          gender: gender,
          bod: bod
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            console.log(res.data.data)
            resolve(res.data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    markAsDone ({ context, payload }, { orderId }) {
      console.log(orderId)
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_BASE_URL}order/done`, { order_id: orderId }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            localStorage.removeItem('allorderid')
            resolve(res.data.data)
          })
          .catch((err) => {
            console.log(err.response.data.messages)
            reject(err)
          })
      })
    },
    updateImage (context, file) {
      return new Promise((resolve, reject) => {
        console.log('kebaca?')
        axios.patch(`${process.env.VUE_APP_BASE_URL}user/update-image`, file, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            Swal.fire(
              'Success!',
              'Your profile has been updated'
            )
            context.dispatch('getCustProfile')
            resolve(res.data.result)
          })
          .catch((err) => {
            Swal.fire(
              'Error!',
              err.response.data.message
            )
            reject(err)
          })
      })
    },
    deleteImage (context, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`${process.env.VUE_APP_BASE_URL}user/delete-image`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {
    getDineIn (state) {
      return state.checkoutDineIn
    },
    getHomeDev (state) {
      return state.checkoutHomeDelivery
    },
    getPickUp (state) {
      return state.checkoutTakeAway
    },
    getHistory (state) {
      return state.history
    },
    getProfile (state) {
      return state.profile
    },
    currentPrice (state) {
      if (state.sizeProduct === 'R' || state.sizeProduct === '250') {
        const price = state.detailP.price
        const amount = state.detailP.amount
        const current = price * amount
        return current.toLocaleString('id-ID')
      } else if (state.sizeProduct === 'L' || state.sizeProduct === '300') {
        const priceMid = state.detailP.priceMid
        const amount = state.detailP.amount
        const current = priceMid * amount
        return current.toLocaleString('id-ID')
      } else if (state.sizeProduct === 'XL' || state.sizeProduct === '500') {
        const priceHigh = state.detailP.priceHigh
        const amount = state.detailP.amount
        const current = priceHigh * amount
        return current.toLocaleString('id-ID')
      }
    },
    getManageOrderId (state) {
      return state.manageorderid
    },
    getAllManageOrder (state) {
      return state.allmanageorder
    }
  },
  modules: {
  }
})
