<template>
  <template v-for="(item, index) in localButton" :key="index + 'v-button'">
    <v-button-group
      v-if="isArray(item)"
      v-bind="{
        buttons: item,
      }"
      @click="onclick"
      @action="onaction"
    />
    <v-button v-else v-bind="item" @click="onclick" @action="onaction" />
  </template>
</template>
<script>
import VButton from './VButton'
import VButtonGroup from './VButtonGroup'
import { isArray } from '../../utils'

export default {
  components: { VButton, VButtonGroup },
  props: {
    buttons: {
      type: Array,
      default: () => []
    }
  },
  emits: ['click', 'action'],
  data() {
    const local = []
    this.$props.buttons.forEach(item => {
      delete item['when']
      local.push(item)
    })
    return {
      localButton: local
    }
  },
  methods: {
    isArray(tmp) {
      return isArray(tmp)
    },
    onclick(btn) {
      this.$emit('click', btn)
    },
    onaction(payload) {
      this.$emit('action', payload)
    }
  }
}
</script>
