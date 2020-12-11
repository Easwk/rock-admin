<template>
  <code-mirror v-model="localValue" :options="{mode: 'application/json', readOnly: disabled}" @update:modelValue="onchange" />
</template>
<script>
import CodeMirror from '../CodeMirror/index'
import { isObject } from '../../utils'

export default {
  name: 'VJson',
  components: { CodeMirror },
  props: {
    modelValue: {
      type: [String, Object],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      valueType: isObject(this.$props.modelValue) ? 'object' : 'string',
      localValue: isObject(this.$props.modelValue) ? JSON.stringify(this.$props.modelValue) : this.$props.modelValue
    }
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', this.valueType === 'object' ? JSON.parse(this.localValue) : this.localValue)
    }
  }
}
</script>
