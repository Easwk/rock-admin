import { strVarReplace } from '../../utils'
import { defineAsyncComponent } from 'vue'

export default {
  emits: ['click'],
  components: {
    VForm: defineAsyncComponent(() => import('../form')),
    VTable: defineAsyncComponent(() => import('../table'))
  },
  props: {
    shape: {
      type: String,
      default: 'button' // 展现形式 button, icon, link
    },
    btnProps: {
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
      type: Object,
      default: () => {}
    },
    container: {
      type: String,
      default: 'dialog',
      validator: (value) => {
        return ['dialog', 'drawer'].indexOf(value) !== -1
      }
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
        api: () => {
          // todo request confirm
          const options = Object.assign(
            {
              method: 'GET',
              data: this.$props.injectData
            },
            this.getBtnProps().api
          )
          options.url = strVarReplace(options.url, this.$props.metaData)

          this.$http.request(options).then(({ payload }) => {
            console.log('api success', payload)
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
