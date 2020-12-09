import _ from 'lodash'
import menu from '../data/menu'
import role from '../data/role'
import example from '../data/example'

function response(payload) {
  return {
    'code|0-0': 0,
    payload
  }
}

const regUserId = /api\/user\/\d+/

export default [
  {
    url: '/user/form_schema',
    type: 'get',
    response: () => {
      return example.form
    }
  },
  {
    url: '/user/save',
    type: 'post',
    response: () =>
      response({
        success: true
      })
  },
  {
    url: '/user/list_schema',
    type: 'get',
    response: () => {
      return example.table
    }
  },
  {
    url: regUserId,
    type: 'get',
    response: () => {
      return example.form
    }
  },
  {
    url: regUserId,
    type: 'post',
    response: () => response({})
  },
  {
    url: '/user/list',
    type: 'get',
    response: (req) => {
      return example.listMock
    }
  },
  {
    url: '/user/select',
    type: 'get',
    response: () => {
      return {
        code: 0,
        'payload|0-20': [
          {
            'value|0-1000': 1,
            label: '@cname'
          }
        ]
      }
    }
  },
  {
    url: '/menu/list',
    type: 'get',
    response: () => {
      return menu.listMock
    }
  },
  {
    url: '/role/list',
    type: 'get',
    response: () => {
      return role.listMock
    }
  }
]
