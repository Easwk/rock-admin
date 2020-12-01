export default [
  {
    type: 'get',
    url: '/system/config',
    response: () => {
      return {
        code: 0,
        payload: {
          navBarNotice: '远程配置的导航顶部提示信息',
          logo: 'https://cdn.jsdelivr.net/gh/daodao97/FigureBed/uPic/hyperf-admin.png'
        }
      }
    }
  }
]
