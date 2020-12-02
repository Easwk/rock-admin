<template>
  <el-form-item :label="item.label" :prop="item.field">
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
      ref="ctrl"
      v-model="localValue"
      v-bind="getComponentProps(item)"
      @update:modelValue="onFiledChange"
    />
    <div v-if="item.info && !formOptions.inline" class="form-item-info">
      <i class="el-icon-warning-outline" />
      <span v-html="item.info" />
    </div>
  </el-form-item>
</template>
<script>
import { getComponentName, getComponentProps, customFormCtrl, formData } from './setting'
import _ from 'lodash'

export default {
  name: 'FormItem',
  components: { ...customFormCtrl },
  props: {
    formOptions: {
      type: Object,
      default: () => {}
    },
    item: {
      type: Object,
      default: () => {}
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: undefined
    }
  },
  emits: ['update:modelValue'],
  data() {
    const item = this.$props.item
    if (item.type === 'template') {
      item.type = 'v-tpl' + item.field
      const methods = {}
      Object.keys(item.comp.methods).forEach(name => {
        // eslint-disable-next-line no-eval
        methods[name] = eval(item.comp.methods[name])
      })
      this.$options.components['VTpl' + item.field] = _.merge({}, item.comp, {
        data() {
          return {
            formData: formData,
            ...item.comp.data
          }
        },
        methods
      })
      console.log(this.$options.components['VTpl' + item.field])
    }
    return {
      localValue: this.$props.modelValue
    }
  },
  methods: {
    getComponentName(name) {
      return getComponentName(name)
    },
    getComponentProps(item) {
      return getComponentProps(item)
    },
    onFiledChange(value) {
      this.$emit('update:modelValue', value)
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
