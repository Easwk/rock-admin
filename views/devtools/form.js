const itemTable = {
  showPagination: false,
  listIncrease: {
    state: true,
    location: 'afterList',
    type: 'append'
  },
  headers: [
    {
      type: 'input',
      field: 'field',
      label: '字段名',
      edit: true
    },
    {
      type: 'select',
      field: 'type',
      label: '类型',
      edit: true,
      options: [
        { value: 'input', label: 'input' },
        { value: 'radio', label: 'radio' },
        { value: 'select', label: 'select' }
      ]
    },
    {
      type: 'input',
      field: 'label',
      label: '显示名',
      edit: true
    },
    {
      type: 'input',
      field: 'info',
      label: '提示',
      edit: true
    },
    {
      type: 'json',
      field: 'props',
      label: '原始属性',
      edit: true,
      columnProps: {
        width: '300px'
      }
    },
    {
      type: 'json',
      field: 'options',
      label: '备选项',
      edit: true,
      columnProps: {
        width: '300px'
      }
    }
  ],
  list: []
}

export default {
  itemTable
}
