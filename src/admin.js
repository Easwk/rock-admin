import { createApp } from 'vue'

// lib
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import VIcon from './components/VIcon'
import request from './utils/request'
import './router/routerGuards'
import App from './App.vue'
import { mockXHR } from './mock'
import _ from 'lodash'

// style
import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './styles/index.scss' // global css
import defaultOptions from './options'

const GlobalComps = [VIcon]

export default (options = {}) => {
  options = _.merge(defaultOptions, options)
  const app = createApp(App)

  store.dispatch('app/setConfig', {
    nav: options.nav
  })
  store.dispatch('settings/loadLocalAdmin', options.config)

  GlobalComps.concat(options.globalComps).forEach(item => {
    app.component(item.name, item)
  })

  options.mock.enable && mockXHR(options.mock.apis, options.mock.baseURI, options.mock.defaultMockApi)

  app.config.globalProperties.$http = request

  options.routes.forEach(item => {
    router.addRoute(item)
  })

  app.use(store)
    .use(router)
    .use(ElementPlus, options.ElementPlus)

  options.use.forEach(item => {
    if (typeof item === 'object') {
      app.use(item)
    } else {
      app.use(item[0], item[1])
    }
  })

  router.isReady().then(() => app.mount('#app'))
}
