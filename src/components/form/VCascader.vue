<template>
  <el-cascader
    v-model="localValue"
    :options="optionTree"
    :disabled="disabled"
    :clearable="clearable"
    :show-all-levels="showAllLevels"
    :collapse-tags="collapseTags"
    :filterable="filterable"
    :props="props"
    :size="size"
    @change="onchange"
  />
</template>
<script>
import { isNumber, searchTreeValues } from '../../utils'

export default {
  name: 'VCascader',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: [Array, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default: _ => {}
    },
    size: {
      type: String,
      default: ''
    },
    optionsApi: {
      type: String,
      default: ''
    },
    saveAsArray: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    const local = this.$lodash.cloneDeep(isNumber(this.$props.modelValue) ? [this.$props.modelValue] : this.$props.modelValue)
    return {
      localValue: local,
      optionTree: this.$props.options
    }
  },
  beforeCreate() {
    this.$props.optionsApi && this.$http.request({
      method: 'GET',
      url: this.$props.optionsApi
    }).then(({ payload }) => {
      this.optionTree = payload || []
      if (isNumber(this.$props.modelValue)) {
        this.localValue = searchTreeValues(this.optionTree, this.$props.modelValue, 'value')
      }
    })
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', isNumber(this.$props.modelValue) && !this.saveAsArray ? this.localValue[this.localValue.length - 1] : this.localValue)
    }
  }
}
</script>
