<template>
  <el-popover
    placement="bottom-start"
    :width="650"
    trigger="focus"
  >
    <template #reference>
      <el-input v-model="localValue" :disabled="disabled" style="width: 25%">
        <template #prepend>
          <icon :name="localValue || ''" />
        </template>
      </el-input>
    </template>
    <el-scrollbar>
      <el-row class="icon-list">
        <el-col v-for="(item, index) in elIconList" :key="index" :span="2" @click="e => onselected(item)">
          <icon :class="{'icon-cell': true, 'active': item === localValue}" :name="item" />
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-popover>
</template>
<script>

import Icon from '../Icon'
export default {
  name: 'VIconSelect',
  components: { Icon },
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
      localValue: this.$props.modelValue,
      elIconList: [
        'el-icon-platform-eleme', 'el-icon-eleme', 'el-icon-delete-solid', 'el-icon-delete', 'el-icon-s-tools', 'el-icon-setting',
        'el-icon-user-solid', 'el-icon-user', 'el-icon-phone', 'el-icon-phone-outline', 'el-icon-more', 'el-icon-more-outline',
        'el-icon-star-on', 'el-icon-star-off', 'el-icon-s-goods', 'el-icon-goods', 'el-icon-warning', 'el-icon-warning-outline',
        'el-icon-question', 'el-icon-info', 'el-icon-remove', 'el-icon-circle-plus', 'el-icon-success', 'el-icon-error',
        'el-icon-zoom-in', 'el-icon-zoom-out', 'el-icon-remove-outline', 'el-icon-circle-plus-outline', 'el-icon-circle-check',
        'el-icon-circle-close', 'el-icon-s-help', 'el-icon-help', 'el-icon-minus', 'el-icon-plus', 'el-icon-check', 'el-icon-close',
        'el-icon-picture', 'el-icon-picture-outline', 'el-icon-picture-outline-round', 'el-icon-upload', 'el-icon-upload2', 'el-icon-download',
        'el-icon-camera-solid', 'el-icon-camera', 'el-icon-video-camera-solid', 'el-icon-video-camera', 'el-icon-message-solid', 'el-icon-bell'
      ]
    }
  },
  methods: {
    onselected(name) {
      this.localValue = name
      this.$emit('update:modelValue', this.localValue)
    }
  }
}
</script>
<style lang="scss" scoped>
  .icon-cell {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 32px;
    display: block;
    color: #606266;
    transition: color .15s linear;
    &:hover {
      color: cornflowerblue;
      border: 1px solid cornflowerblue;
    }
    &.active {
      color: cornflowerblue;
      border: 1px solid cornflowerblue;
    }
  }
</style>
