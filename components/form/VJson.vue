<template>
  <code-mirror v-model="localValue" :options="{mode: 'application/json'}" @update:modelValue="onchange" />
</template>
<script>
import CodeMirror from '../CodeMirror'
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
      localValue: isObject(this.$props.modelValue) ? JSON.stringify(this.$props.modelValue) : this.$props.modelValue
    }
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', this.localValue)
    }
  }
}
</script>
