import 'element-plus/lib/theme-chalk/index.css'
import { createAdmin } from 'rock-admin'

import mockApis from '../mock'
import settings from './settings'
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
  config: settings,
  nav: nav,
  mock: {
    apis: mockApis,
    baseURI: process.env.NODE_ENV_DEV_PORT
  }
})
