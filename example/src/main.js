import 'element-plus/lib/theme-chalk/index.css'
import { createAdmin } from 'rock-admin'
const nav = [
  {
    type: 'jump',
    text: '跳转',
    shape: 'icon',
    target: 'http://github.com/daodao97',
    btnProps: {
      icon: 'ra-github1'
    }
  }
]

createAdmin({
  config: {
    sidebarLogo: true,
    title: 'RockAdmin',
    loginTips: '账号 admin 密码 a1a1a1'
  },
  nav: nav,
  mock: {
    baseURI: process.env.NODE_ENV_DEV_PORT
  }
})
