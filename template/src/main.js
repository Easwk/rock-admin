import AppMain from 'rock-admin'
const nav = [
  {
    type: 'jump',
    text: '跳转',
    shape: 'icon',
    target: 'http://github.com/daodao97',
    btnProps: {
      icon: 'el-icon-share'
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
      icon: 'el-icon-share'
    }
  }
]
AppMain({
  config: { sidebarLogo: true, title: 'Local' },
  nav: nav,
  disableDefaultMockApi: false
})
