import AppMain from 'rock-admin'

const nav = [
  {
    type: 'jump',
    text: '跳转',
    shape: 'icon',
    target: 'http://github.com/daodao97',
    btnProps: {
      icon: 'ra-github1'
    }
  },
  {
    type: 'api',
    text: '请求接口',
    shape: 'icon',
    api: {
      method: 'POST',
      url: '/test_api'
    },
    btnProps: {
      icon: 'ra-add-account'
    }
  }
]

AppMain({
  config: { sidebarLogo: true, title: 'Local', loginTips: '账号 admin 密码 a1a1a1' },
  nav: nav,
  disableDefaultMockApi: false
})
