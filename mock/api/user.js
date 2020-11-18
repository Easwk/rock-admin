const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: options => {
      const { username, ticket } = options.params
      if (ticket) {
        return {
          code: 0,
          payload: tokens['admin']
        }
      }
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 0,
        payload: token
      }
    }
  },

  // get user info
  {
    url: '/user/info.*',
    type: 'get',
    response: options => {
      const { token } = options.params
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 0,
        payload: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 0,
        payload: 'success'
      }
    }
  },

  {
    url: '/user/routes',
    type: 'get',
    response: () => {
      return {
        code: 0,
        payload: [
          {
            name: '用户管理',
            path: '#',
            children: [
              {
                path: '/user/list',
                name: '用户列表',
                icon: 'el-icon-help',
                is_show: false
              },
              {
                path: '/user/form',
                name: '用户新建',
                icon: 'el-icon-help',
                is_show: false
              }
            ]
          },
          {
            name: '列表',
            path: '#',
            icon: 'el-icon-help',
            children: [
              {
                path: '/list/example',
                name: '基础样例',
                view: 'Test',
                icon: 'el-icon-help'
              },
              {
                path: '/list/list',
                name: '页签样例',
                icon: 'el-icon-help'
              },
              {
                name: '学生管理',
                path: '#',
                children: [
                  {
                    path: '/student/list',
                    name: '学生列表',
                    icon: 'el-icon-help',
                    is_show: false
                  },
                  {
                    path: '/student/form',
                    name: '学生新建',
                    icon: 'el-icon-help',
                    is_show: false
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
]
