<template>
  <el-form
    ref="formData"
    v-loading="loading"
    class="v-form"
    :model="formData"
    :rules="formRules"
    :label-width="formOptions.labelWidth"
    :inline="formOptions.inline"
    :label-position="formOptions.labelPosition"
  >
    <el-row>
      <template v-for="(item, index) in formItemsSource" :key="'item-' + index">
        <template v-if="formOptions.inline === true">
          <form-item
            v-if="canShow(item)"
            :ref="item.field"
            v-model="formData[item.field]"
            :form-options="formOptions"
            :item="item"
            @update:modelValue="(val) => onFiledChange(item.field, val)"
          />
        </template>
        <template v-else>
          <el-col v-bind="item.col">
            <form-item
              v-if="canShow(item)"
              :ref="item.field"
              v-model="formData[item.field]"
              :form-options="formOptions"
              :item="item"
              @update:modelValue="(val) => onFiledChange(item.field, val)"
            />
          </el-col>
        </template>
      </template>
      <template v-if="formOptions.inline === true">
        <form-action
          :form-options="formOptions"
          @submit="submitForm('formData')"
          @cancel="resetForm('formData')"
        />
      </template>
      <template v-else>
        <el-col :span="24">
          <form-action
            :form-options="formOptions"
            @submit="submitForm('formData')"
            @cancel="resetForm('formData')"
          />
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { componentMap } from './setting'
import { camelToSnake, ruleCompute, isArray, showEleByClassName } from '../../utils'
import _ from 'lodash'
import { makeFormOptions, formData } from './setting'
import FormAction from './FormAction'
import FormItem from './FormItem'

export default {
  name: 'VForm',
  components: { FormAction, FormItem },
  provide() {
    return {
      formData: Symbol(this.formData)
    }
  },
  props: {
    isSub: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Object,
      default: () => {}
    },
    formItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    infoApi: {
      type: String,
      default: ''
    },
    saveApi: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['submit', 'reset', 'fieldchange', 'update:modelValue', 'mounted'],
  data() {
    return {
      loading: false,
      props: this.$props,
      formData: this.$props.modelValue, // 表单数据
      formRules: [], // 验证规则
      fieldMap: {}, // field -> item map
      computeRules: [], // 动态计算规则
      formItemsSource: [], // 原始数据
      cacheItems: [],
      formOptions: {}
    }
  },
  watch: {
    props: {
      handler() {
        const { formItems, options } = this.props
        const initData = this.init(formItems || [])
        Object.keys(initData).forEach((key) => {
          if (key === 'formData') {
            this[key] = _.merge(this.formData, initData[key])
          } else {
            this[key] = initData[key]
          }
        })
        this.formOptions = makeFormOptions(options || this.$props.options)
      },
      immediate: true
    }
  },
  mounted() {
    this.$emit('mounted', this.$refs.formData)
  },
  beforeCreate() {
    if (this.$props.infoApi) {
      this.loading = true
      this.$http.request({ method: 'GET', url: this.$props.infoApi }).then(({ payload }) => {
        this.props = payload
        this.loading = false
      })
    }
  },
  methods: {
    init(formItems) {
      const formData = {}
      const formRules = {}
      const fieldMap = {}
      const computeRules = {}
      formItems.forEach((item) => {
        if (item.value !== undefined) {
          formData[item.field] = item.value
        }
        if (item.rules !== undefined) {
          formRules[item.field] = item.rules
        }
        fieldMap[item.field] = item
        if (item.computed !== undefined) {
          computeRules[item.field] = item.computed
        }
        item.props = this.getComponentProps(item)
        if (this.formOptions.column !== undefined) {
          item.col = { span: 24 / this.formOptions.column }
        }
      })
      return {
        formData: formData,
        formRules,
        fieldMap,
        computeRules,
        formItemsSource: _.concat([], formItems),
        cacheItems: _.concat([], formItems)
      }
    },
    validate() {
      return this.$refs.formData.validate
    },
    submitForm(formName) {
      let flag = true
      this.$refs[formName].validate((valid) => {
        if (flag === false) {
          return
        }
        if (valid) {
          this.formItemsSource.forEach(item => {
            if (flag === false) {
              return
            }
            if (item.type === 'sub-form') {
              const subValid = this.$refs[item.field].$refs.ctrl.validate()
              if (subValid === false) {
                flag = false
              }
            }
          })
        } else {
          flag = false
        }
      })
      if (flag) {
        this.$props.saveApi &&
        this.$http
          .request({ method: 'POST', url: this.$props.saveApi })
          .then(({ payload, message }) => {
            console.log('form save success', payload)
            this.$message({ type: 'success', message: message || '保存成功' })
          })
        console.log('formData', this.formData)
        this.$emit('submit', this.formData)
      } else {
        console.log('error submit!!')
        showEleByClassName('is-error')
        return false
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('reset')
    },
    getComponentName(name) {
      return componentMap[name] || name
    },
    getComponentProps(item) {
      const props = item.props || {}
      if (item.options) {
        props.options = item.options
      }
      Object.keys(props).forEach((item) => {
        const tmp = props[item]
        delete props[item]
        props[camelToSnake(item, '-')] = tmp
      })
      return props
    },
    canShow(item) {
      if (item.depend) {
        return item.depend.value === this.formData[item.depend.field]
      }
      if (item.hide) {
        // todo
      }
      return true
    },
    onFiledChange(field, value) {
      this.formData[field] = value
      this.computedWhen(field, value)
      this.$emit('fieldchange', { field, value })
      this.$emit('update:modelValue', this.formData)
      if (this.isSub === false) {
        Object.keys(this.formData).forEach(key => {
          formData[key] = this.formData[key]
        })
      }
    },
    computedWhen(field, value) {
      const rule = this.computeRules[field]
      if (rule === undefined) {
        return
      }
      let when = rule.when
      if (!isArray(when)) {
        when = [field, '=', when]
      } else if (when.length === 2) {
        when.unshift(field)
      }
      const obj = {}
      obj[field] = value
      Object.keys(rule.set || []).forEach((field) => {
        const index = _.findIndex(this.formItemsSource, { field: field })
        if (ruleCompute(obj, when)) {
          this.formItemsSource[index] = _.merge(
            this.formItemsSource[index],
            rule.set[field]
          )
        } else {
          this.formItemsSource[index] = _.cloneDeep(
            this.cacheItems[_.findIndex(this.cacheItems, { field: field })]
          )
        }
      })
    }
  }
}
</script>

