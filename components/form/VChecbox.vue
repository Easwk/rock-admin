<template>
  <el-checkbox-group v-model="localValue" @change="onchange">
    <el-checkbox
      v-for="(item, index) in options"
      :key="index + '-checkbox'"
      :label="item.value"
    >{{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script>

export default {
  name: 'VCheckbox',
  props: {
    options: {
      type: Array,
      default: () => {
        return []
      }
    },
    modelValue: {
      type: Array,
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
