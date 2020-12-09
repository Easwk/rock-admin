import menu from '../data/menu'
import role from '../data/role'
import example from '../data/example'
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
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
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
            name: '系统管理',
            path: '#',
            icon: 'el-icon-help',
            children: [
              {
                name: '用户管理',
                path: '#',
                children: [
                  {
                    path: '/user/list',
                    name: '列表',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'list',
                    page_schema: example.table
                  },
                  {
                    path: '/user/form',
                    name: '新建',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'form',
                    page_schema: example.form
                  },
                  {
                    path: '/user/:id',
                    name: '编辑',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'form',
                    page_schema: example.form
                  }
                ]
              },
              {
                name: '菜单管理',
                path: '#',
                children: [
                  {
                    path: '/menu/list',
                    name: '列表',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'list',
                    page_schema: menu.table
                  },
                  {
                    path: '/menu/form',
                    name: '新建',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'form',
                    page_schema: menu.form
                  },
                  {
                    path: '/menu/:id',
                    name: '编辑',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'form',
                    page_schema: menu.form
                  }
                ]
              },
              {
                name: '角色管理',
                path: '#',
                children: [
                  {
                    path: '/role/list',
                    name: '列表',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'list',
                    page_schema: role.table
                  },
                  {
                    path: '/role/form',
                    name: '新建',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'form',
                    page_schema: role.form
                  },
                  {
                    path: '/role/:id',
                    name: '编辑',
                    icon: 'el-icon-help',
                    is_show: false,
                    page_type: 'form',
                    page_schema: role.form
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
