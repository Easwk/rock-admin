import router from './index'
import store from '../store'
// import { Message } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '../utils/auth' // get token from cookie
import { getUrlKey } from '../utils'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  if (to.matched.length === 0 && store.state.user.loadRemoteRoute) {
    // next('/404')
  }
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
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          console.error(error)
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
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

router.afterEach(() => {
  NProgress.done()
})
