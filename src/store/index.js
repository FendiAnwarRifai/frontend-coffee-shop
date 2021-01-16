import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Admin Add New Product
    nameproduct: '',
    product: 0,

    // Customer Profile
    editmode: 0,
    // email: 'zalikha@gmail.com',
    // gender: '',

    // History Products
    history: [],

    // Profile
    profile: {}
  },
  mutations: {
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
    SET_HISTORY (state, payload) {
      state.history = payload
    },
    SET_PROFILE (state, payload) {
      state.profile = payload
    }
  },
  actions: {
    getAllHistory (context) {
      return new Promise((resolve, reject) => {
        axios.get('http://54.227.187.8:5000/api/history', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
    deleteHistory (context, { deleteProducts }) {
      return new Promise((resolve, reject) => {
        console.log('abcd')
        console.log(deleteProducts)
        axios.delete('http://54.227.187.8:5000/api/history/delete-history',
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
        console.log('abcd')
        axios.get('http://54.227.187.8:5000/api/user/detail', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
          .then((res) => {
            console.log(res.data.data)
            context.commit('SET_PROFILE', res.data.data)
            resolve(res.data.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateProfile ({ context, payload }, { email, username, firstName, lastName, address, phone, gender, bod }) {
      return new Promise((resolve, reject) => {
        axios.patch('http://54.227.187.8:5000/api/user/edit-profile', {
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
    updateImage (context, file) {
      return new Promise((resolve, reject) => {
        console.log('kebaca?')
        axios.patch('http://54.227.187.8:5000/api/user/update-image', file, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
        axios.delete('http://54.227.187.8:5000/api/user/delete-image', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
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
    getHistory (state) {
      return state.history
    },
    getProfile (state) {
      return state.profile
    }
  },
  modules: {
  }
})
