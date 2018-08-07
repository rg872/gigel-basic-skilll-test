import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isLoading: false,
    defaultUserImage: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  },

  getters: {
    isLoading: state => state.isLoading,
    defaultUserImage: state => state.defaultUserImage
  },

  mutations: {
    setLoading (state, newStatus) {
      state.isLoading = newStatus
    },

    setUser (state, newUserObj) {
      state.user = Object.assign({}, newUserObj)
    }
  },

  actions: {
    verifyToken ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/users/token', {
          headers: {
            token: localStorage.getItem('userToken')
          }
        })
          .then(res => {
            commit('setUser', res.data.user)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch(error => {
            commit('setLoading', false)
            reject(error.message)
          })
      })
    },

    register ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/register', payload)
          .then((res) => {
            localStorage.setItem('userToken', res.headers.token)
            commit('setUser', res.data.user)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            commit('setLoading', false)
            reject(error.message)
          })
      })
    },

    login ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/users/login', payload)
          .then((res) => {
            localStorage.setItem('userToken', res.headers.token)
            commit('setUser', res.data.user)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            commit('setLoading', false)
            reject(error.message)
          })
      })
    },

    updateAccount ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/users', payload, {
          headers: {
            token: localStorage.getItem('userToken')
          }
        })
          .then((res) => {
            commit('setUser', res.data.user)
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            commit('setLoading', false)
            reject(error.message)
          })
      })
    },

    changePassword ({ commit }, payload) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.put('http://localhost:3000/users/pass', payload, {
          headers: {
            token: localStorage.getItem('userToken')
          }
        })
          .then((res) => {
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            commit('setLoading', false)
            reject(error.message)
          })
      })
    },

    deleteAccount ({ commit }) {
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/users/`, {
          headers: {
            token: localStorage.getItem('userToken')
          }
        })
          .then((res) => {
            commit('setUser', {})
            commit('setLoading', false)
            resolve(res.data.message)
          })
          .catch((error) => {
            commit('setLoading', false)
            reject(error.message)
          })
      })
    }
  }
})
