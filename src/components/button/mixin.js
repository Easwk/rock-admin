import { isFunc, strVarReplace } from '../../utils'
import { defineAsyncComponent } from 'vue'
import MessageBox from 'element-plus/lib/el-message-box'

export default {
  emits: ['click', 'action'],
  components: {
    VForm: defineAsyncComponent(() => import('../form/index')),
    VTable: defineAsyncComponent(() => import('../table/index'))
  },
  props: {
    shape: {
      type: String,
      default: 'button' // 展现形式 button, icon, link
    },
    props: {
      type: Object,
      default: () => {}
    },
    containerProps: {
      type: Object,
      default: () => {}
    },
    table: {
      type: Object,
      default: () => {}
    },
    metaData: {
      type: Object,
      default: () => {}
    },
    injectData: {
      type: [Object, Function],
      default: () => {}
    },
    container: {
      type: String,
      default: 'dialog',
      validator: (value) => {
        return ['dialog', 'drawer'].indexOf(value) !== -1
      }
    },
    beforeClose: {
      type: Function,
      default: _ => true
    },
    preCheck: {
      type: Function,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {
      realTarget: '',
      showContainer: false,
      clickHandler: {
        jump: () => {
          if (/http.*/.test(this.realTarget)) {
            window.open(this.realTarget)
          } else {
            this.$router.push(this.realTarget)
          }
        },
        form: () => {
          this.showContainer = true
        },
        list: () => {
          this.showContainer = true
        },
        modal: () => {
          this.showContainer = true
        },
        api: () => {
          MessageBox.confirm(
            this.text ? `确认要${this.text}吗?` : '确认要执行该操作吗?',
            '操作确认',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            console.log(3333)
            let data = this.$props.injectData
            if (isFunc(data)) {
              data = data()
            }
            const options = Object.assign(
              {
                method: 'GET',
                data: data
              },
              {
                url: strVarReplace(this.target || '', this.$props.metaData)
              },
              this.getBtnProps().api || {}
            )
            options.url = strVarReplace(options.url, this.$props.metaData)

            this.$http.request(options).then(({ payload }) => {
              console.log('api success', payload)
              this.$emit('action', payload)
            })
          }).catch(error => {
            console.log('cancel', error)
          })
        },
        table: () => {
          this.showContainer = true
        }
      }
    }
  },
  methods: {
    closeContainer() {
      if (!this.beforeClose()) {
        return
      }
      this.showContainer = false
    },
    getSubComp() {
      const { type } = this.getBtnProps()
      if (type === 'form') {
        return 'VForm'
      }
      if (type === 'table') {
        return 'VTable'
      }
      return ''
    },
    getSubProps() {
      const { type, form, table } = this.getBtnProps()
      if (type === 'form') {
        form.saveApi = strVarReplace(form.saveApi, this.metaData)
        form.infoApi = strVarReplace(form.infoApi, this.metaData)
        return Object.assign({}, form)
      }
      if (type === 'table') {
        table.listApi = strVarReplace(table.listApi, this.metaData)
        table.infoApi = strVarReplace(table.infoApi, this.metaData)
        return Object.assign({}, table)
      }
      return {}
    },
    getSubEvent() {
      const { type } = this.getBtnProps()
      if (type === 'form') {
        return {
          submit: this.closeContainer,
          reset: this.closeContainer
        }
      }
      if (type === 'table') {
        return {}
      }
      return {}
    }
  }
}
