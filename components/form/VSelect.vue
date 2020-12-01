<template>
  <el-select v-model="localValue" placeholder="请选择" @change="onchange">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  name: 'VSelect',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: [Array, String],
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
      localValue: this.$props.modelValue
    }
  },
  methods: {
    onchange() {
      this.$emit('update:modelValue', this.localValue)
    }
  }
}
</script>
