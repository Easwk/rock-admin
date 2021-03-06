import locale from 'element-plus/lib/locale/lang/zh-cn'

export default {
  ElementPlus: {
    size: 'mini',
    zIndex: 3000,
    locale: locale
  },
  nav: [],
  routes: [],
  globalComps: [],
  mock: { enable: false, apis: [], baseURI: '', defaultMockApi: true },
  use: [],
  config: {
    title: 'RockAdmin',
    fixedHeader: false,
    sidebarLogo: true,
    logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
    closeNavNotice: false,
    navBarNotice: '顶部消息提示',
    hasNewMessage: true,
    showPageJsonSchema: true,
    loginTips: '登录信息提示',
    sso: [],
    axios: {
      baseURL: '/api'
    }
  }
}
