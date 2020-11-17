import _ from 'lodash'
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
      label: '姓名',
      info: 'this is a tip'
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
  list: [
    {
      id: 1,
      name: '王小虎1',
      sex: 1,
      github: 'http://github.com/ddaodao97',
      html: '<S> Strike One! </S>',
      image: 'https://gitee.com/daodao97/asset/raw/master/imgs/daodao97.jpg',
      json: {
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      richText: '在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>'
    },
    {
      id: 2,
      name: '王小虎2',
      sex: 0,
      github: 'http://github.com/ddaodao97',
      html: '<S> Strike One! </S>',
      image: 'https://gitee.com/daodao97/asset/raw/master/imgs/daodao97.jpg',
      json: {
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      richText: '在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>'
    },
    {
      id: 3,
      name: '王小虎3',
      sex: 1,
      github: 'http://github.com/ddaodao97',
      html: '<S> Strike One! </S>',
      image: 'https://gitee.com/daodao97/asset/raw/master/imgs/daodao97.jpg',
      json: {
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      richText: '在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>'
    },
    {
      id: 4,
      name: '王小虎4',
      sex: 3,
      github: 'http://github.com/ddaodao97',
      html: '<S> Strike One! </S>',
      image: 'https://gitee.com/daodao97/asset/raw/master/imgs/daodao97.jpg',
      json: {
        date: '2016-05-02',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      richText: '在一段文本中<突出|black|yellow>显示某些<文字|#ffffff|#000000>'
    }
  ],
  batchButton: buttons,
  normalButton: [
    ..._.cloneDeep(buttons),
    {
      type: 'form',
      form: {
        infoApi: '/form',
        saveApi: '/save'
      },
      btnProps: {
        icon: 'el-icon-plus',
        type: 'primary'
      }
    }
  ],
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
  ]
}
