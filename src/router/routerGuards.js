import router from './index'
import store from '../store'
import Message from 'element-plus/lib/el-message'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '../utils/auth' // get token from cookie
import { getUrlKey } from '../utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = to.meta.title ? to.meta.title + '-' + store.state.settings.title : store.state.settings.title
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          await store.dispatch('user/loadRemoteRouter', router)
          await store.dispatch('settings/loadLocalAdmin')
          await store.dispatch('settings/loadRemoteConfig')
          next(to)
        } catch (error) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          // remove token and go to login page to re-login
          console.error(error)
          Message.error(error || 'Has Error')
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      const ticket = getUrlKey('code')
      if (ticket) {
        await store.dispatch('user/login', { ticket })
        next(`${to.path}`)
      } else {
        next(`/login?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach((to) => {
  if (to.matched.length === 0) {
    router.push('/404')
    // fixme 不能自动跳转404, 需要引导
  }
  NProgress.done()
})
