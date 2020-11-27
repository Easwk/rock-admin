<template>
  <el-form
    ref="formData"
    class="v-form"
    :model="formData"
    :rules="formRules"
    :label-width="formOptions.labelWidth"
    :inline="formOptions.inline"
    :label-position="formOptions.labelPosition"
  >
    <template v-for="(item, index) in formItemsSource" :key="'item-' + index">
      <el-form-item v-if="canShow(item)" :label="item.label" :prop="item.field">
        <template #label>
          {{ item.label }}
          <el-tooltip v-if="item.info && formOptions.inline" placement="top">
            <template #content>
              <span v-html="item.info" />
            </template>
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </template>
        <component
          :is="getComponentName(item.type)"
          v-model="formData[item.field]"
          v-bind="item.props || {}"
          @update:modelValue="(val) => onFiledChange(item.field, val)"
        />
        <div v-if="item.info && !formOptions.inline" class="form-item-info">
          <i class="el-icon-warning-outline" />
          <span v-html="item.info" />
        </div>
      </el-form-item>
    </template>
    <el-form-item
      v-if="formOptions.submitButton.show || formOptions.cancelButton.show"
    >
      <el-button
        v-if="formOptions.submitButton.show"
        v-bind="formOptions.submitButton"
        @click="submitForm('formData')"
      >{{ formOptions.submitButton.text }}
      </el-button>
      <el-button
        v-if="formOptions.cancelButton.show"
        v-bind="formOptions.cancelButton"
        @click="resetForm('formData')"
      >{{ formOptions.cancelButton.text }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import VSelect from './VSelect'
import VRadio from './VRadio'
import VCheckbox from './VChecbox'
import VNumberRange from './VNumberRange'
import VJson from './VJson'
import { componentMap } from './setting'
import { camelToSnake, ruleCompute, isArray } from '../../utils'
import _ from 'lodash'
import { makeFormOptions } from './setting'

export default {
  name: 'VForm',
  components: { VSelect, VRadio, VCheckbox, VNumberRange, VJson },
  provide() {
    return {
      formData: this.formData
    }
  },
  props: {
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
    },
    removeLabelWidth: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'reset', 'field-change', 'update:modelValue'],
  data() {
    return {
      props: this.$props,
      formData: {}, // 表单数据
      formRules: [], // 验证规则
      fieldMap: {}, // field -> item map
      computeRules: [], // 动态计算规则
      formItemsSource: [], // 原始数据
      cacheItems: [],
      formOptions: makeFormOptions(this.$props.options)
    }
  },
  watch: {
    props: {
      handler() {
        const { formItems, options } = this.props
        const initData = this.init(formItems || [])
        console.log(initData)
        Object.keys(initData).forEach((key) => {
          this[key] = initData[key]
        })
        this.formOptions = makeFormOptions(options)
      },
      immediate: true
    }
  },
  beforeCreate() {
    if (this.$props.infoApi) {
      this.$http.request({ method: 'GET', url: this.$props.infoApi }).then(({ payload }) => {
        this.props = payload
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
        if (item.type === 'template') {
          item.type = 'v-tpl' + item.field
          this.$options.components['VTpl' + item.field] = Object.assign(
            {},
            item.comp,
            {
              data: () => {
                return Object.assign({}, item.comp.data, {
                  formData: this.formData
                })
              }
            }
          )
        }
        fieldMap[item.field] = item
        if (item.computed !== undefined) {
          computeRules[item.field] = item.computed
        }
        item.props = this.getComponentProps(item)
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$props.saveApi &&
            this.$http
              .request({ method: 'POST', url: this.$props.saveApi })
              .then(({ payload }) => {
                console.log('form save success', payload)
              })
          this.$emit('submit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
      this.$emit('field-change', { field, value })
      this.$emit('update:modelValue', this.formData)
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
<style lang="scss" scoped>
.form-item-info {
  color: #909399;
  font-size: 12px;
  line-height: 1.5;
  ::v-deep(*) {
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
