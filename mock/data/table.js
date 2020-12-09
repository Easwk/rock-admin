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
      },
      columnProps: {
        sortable: true
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
        infoApi: '/user/{id}',
        saveApi: '/user/{id}'
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
  ],
  selectedNotice: '当前共勾选: {selectedCount} 条'
}
