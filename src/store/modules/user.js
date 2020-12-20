import { login, logout, getInfo, getRoutes } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import createRoutes from '../../router/createRoutes'
import _ from 'lodash'
import { getObjectNodeByKeyTree } from '../../utils'
const state = {
  token: getToken(),
  id: 0,
  name: '',
  avatar: '',
  remoteRouter: [],
  loadRemoteRoute: false,
  resource: {},
  roleIds: []
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
  },
  UP_STATE(state, data) {
    Object.keys(data).forEach(key => {
      if (state[key] !== undefined) {
        state[key] = data[key]
      }
    })
  }
}

function filterResource(data, userResource, prefix = '') {
  return _.cloneDeep(data).filter((item, index) => {
    const key = (prefix ? prefix + '.' : '') + item.id
    const has = getObjectNodeByKeyTree(key, userResource)
    if (has === undefined) {
      return false
    }
    if (item.children && item.children.length > 0) {
      item.children = filterResource(item.children, userResource, key)
      if (item.children.length === 0) {
        return false
      }
    }

    return true
  }).map(item => {
    const key = (prefix ? prefix + '.' : '') + item.id
    if (item.page_schema) {
      if (item.page_schema.filter) {
        item.page_schema.filter = item.page_schema.filter.filter(each => {
          return !!getObjectNodeByKeyTree(key + '.filter.' + each.field, userResource)
        })
      }
      if (item.page_schema.headers) {
        item.page_schema.headers = item.page_schema.headers.filter(each => {
          return !!getObjectNodeByKeyTree(key + '.headers.' + each.field, userResource)
        })
      }
      if (item.page_schema.formItems) {
        item.page_schema.formItems = item.page_schema.formItems.filter(each => {
          return !!getObjectNodeByKeyTree(key + '.formItems.' + each.field, userResource)
        })
      }

      if (item.page_schema.saveApi) {
        const exist = getObjectNodeByKeyTree(key + '.saveApi', userResource)
        if (!exist) {
          item.page_schema.options = _.merge(item.page_schema.options || {}, { submitButton: false })
        }
      }
    }
    return item
  })
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

  // {"$1":{"$2":{"$3":[]}}}
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { payload } = response

          if (!payload) {
            reject('Verification failed, please Login again.')
          }
          const { name, avatar, id, role_ids } = payload
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          let resourceTree = {};
          (payload.resource || []).forEach(item => {
            let tpl = ''
            const len = item.length
            item.forEach((each, index) => {
              if (index < len - 1) {
                tpl += '{"{' + index + '}":'
              } else {
                tpl += '{"' + each + '":true}' + '}'.repeat(len - 1)
              }
            })
            // console.log(tpl.format(...item))
            resourceTree = _.merge(resourceTree, JSON.parse(tpl.format(...item)))
          })
          commit('UP_STATE', { 'id': id, resource: resourceTree, roleIds: role_ids || [] })
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
          const payload = state.roleIds.indexOf(1) > -1 ? res.payload : filterResource(res.payload, state.resource, '')
          const data = createRoutes(payload)
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
