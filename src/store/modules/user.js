import { login, logout, getInfo, getRoutes } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import createRoutes from '../../router/createRoutes'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  remoteRouter: [],
  loadRemoteRoute: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTER: (state, router) => {
    state.remoteRouter = router
    state.loadRemoteRoute = true
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    Object.keys(userInfo).map(k => {
      userInfo[k] = userInfo[k].trim()
      return true
    })

    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(response => {
          const { payload } = response
          commit('SET_TOKEN', payload.token)
          setToken(payload.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { payload } = response

          if (!payload) {
            reject('Verification failed, please Login again.')
          }
          const { name, avatar } = payload
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          // resetRouter()
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // load remote router
  loadRemoteRouter({ commit }, router) {
    return new Promise((resolve, reject) => {
      getRoutes()
        .then(res => {
          const data = createRoutes(res.payload)
          const routes = [data, { path: '/*', redirect: '/404', hidden: true }]
          commit('SET_ROUTER', data.children)
          routes.forEach(item => {
            router.addRoute(item)
          })
          resolve(routes)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
