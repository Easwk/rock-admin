import _ from 'lodash'

function response(payload) {
  return {
    'code|0-0': 0,
    payload
  }
}

const buttons = [
  {
    type: 'jump',
    text: '跳转',
    target: 'http://github.com/daodao97'
  },
  {
    type: 'api',
    text: '请求接口',
    api: {
      method: 'POST',
      url: '/test_api'
    }
  },
  {
    type: 'table',
    text: '表格',
    table: {
      infoApi: '/student/list_info',
      listApi: '/student/list'
    },
    btnProps: {
      type: 'info'
    }
  },
  [
    {
      type: 'jump',
      text: '跳转',
      target: 'http://github.com/daodao97'
    },
    {
      type: 'api',
      text: '请求接口',
      api: {
        method: 'POST',
        url: '/test_api'
      }
    }
  ],
  {
    type: 'form',
    text: '表单',
    form: {
      infoApi: '/form',
      saveApi: '/save'
    },
    btnProps: {
      type: 'success'
    }
  }
]

export const simpleTable = {
  filter: [
    {
      field: 'name',
      type: 'input',
      label: '姓名'
    },
    {
      field: 'sex',
      type: 'input',
      label: '姓名'
    }
  ],
  headers: [
    {
      field: 'name',
      label: '姓名',
      info: '表头提示'
    },
    {
      field: 'sex',
      type: 'enum',
      label: '性别',
      options: [
        { value: 1, label: '男' },
        { value: 0, label: '女' }
      ],
      state: {
        1: 'info',
        0: 'warning'
      }
    },
    {
      field: 'github',
      type: 'link',
      label: '主页'
    },
    {
      field: 'html',
      type: 'html',
      label: 'HTML'
    },
    {
      field: 'image',
      type: 'image',
      label: '头像'
    },
    {
      field: 'json',
      type: 'json',
      label: '信息'
    },
    {
      field: 'richText',
      type: 'rich-text',
      label: '信息'
    }
  ],
  batchButton: buttons,
  rowButton: [
    {
      type: 'form',
      form: {
        infoApi: '/form/{id}',
        saveApi: '/save'
      },
      btnProps: {
        icon: 'el-icon-edit',
        type: 'success'
      }
    },
    {
      type: 'api',
      api: {
        method: 'POST',
        url: '/student/{id}'
      },
      btnProps: {
        icon: 'el-icon-delete',
        type: 'danger'
      }
    }
  ],
  normalButton: [
    ..._.cloneDeep(buttons),
    {
      type: 'jump',
      target: '/user/form',
      btnProps: {
        icon: 'el-icon-plus',
        type: 'primary'
      }
    }
  ]
}

export default [
  {
    url: '/user/form_schema',
    type: 'get',
    response: () => response([
      {
        type: 'input',
        field: 'number',
        label: '数字1'
      },
      {
        type: 'number-range',
        field: 'range_number',
        label: '数字区间'
      }
    ])
  },
  {
    url: '/user/save',
    type: 'post',
    response: () => response({
      success: true
    })
  },
  {
    url: '/user/list_schema',
    type: 'get',
    response: () => response(simpleTable)
  },
  {
    url: '/user/list',
    type: 'get',
    response: req => {
      const ret = {
        'list|0-20': [
          {
            'id|0-1000': 1,
            name: '@cname',
            'sex|0-1': 1,
            'score|0-100': 60,
            link: 'http://github.com/daodao97',
            image:
              'http://qupinapptest.oss-cn-beijing.aliyuncs.com/1/202002/d81d3c9dc7c3df7590d333f783a97995.jpeg',
            html: '<S>显示删除线1</S>',
            json: { slogan: '左手代码右手诗' },
            richText:
              '在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>'
          }
        ],
        page: {
          'count|1-10': 2,
          'page|1-5': 2
        }
      }
      // if (req.query.sex !== undefined) {
      //   delete ret["list|1-20"][0]["sex|0-1"];
      //   ret["list|1-20"][0].sex = req.query.sex;
      // }
      return response(ret)
    }
  }
]
