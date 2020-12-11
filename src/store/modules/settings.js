import { defaultSetting } from '../../settings'
import request from '../../utils/request'

const state = defaultSetting

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    state[key] = value
  },
  MERGE_SETTING: (state, data) => {
    state = Object.assign(state, data)
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  loadLocalAdmin({ commit }, data) {
    commit('MERGE_SETTING', data)
  },
  loadRemoteConfig({ commit }) {
    return new Promise((resolve, reject) => {
      request({
        url: '/system/config'
      })
        .then(res => {
          commit('MERGE_SETTING', res.payload)
          resolve()
        })
        .catch(e => {
          reject(e)
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
