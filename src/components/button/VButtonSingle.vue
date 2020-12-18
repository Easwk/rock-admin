<template>
  <template v-if="shape === 'icon' && btnProps && btnProps.icon">
    <div class="el-btn-icon" @click="onclick">
      <v-icon :name="btnProps.icon || 'el-icon-warning-outline'" />
    </div>
  </template>
  <template v-else>
    <el-button v-if="text" v-bind="btnProps" @click="onclick">
      {{ text }}
    </el-button>
    <template v-else>
      <el-tooltip v-if="tips" effect="light" :content="tips">
        <el-button v-bind="btnProps" @click="onclick" />
      </el-tooltip>
      <el-button v-else v-bind="btnProps" @click="onclick" />
    </template>
  </template>
  <template v-if="showContainer">
    <component
      :is="'el-' + container"
      v-model="showContainer"
      append-to-body
      :before-close="closeContainer"
      :title="text"
      :destroy-on-close="true"
    >
      <slot>
        <component
          :is="getSubComp()"
          v-bind="getSubProps()"
          v-on="getSubEvent()"
        />
      </slot>
    </component>
  </template>
</template>
<script>
import { strVarReplace } from '../../utils'
import Base from './mixin'
export default {
  name: 'VButtonSingle',
  mixins: [Base],
  props: {
    text: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    },
    api: {
      type: Object,
      default: () => {}
    },
    form: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['click'],
  methods: {
    onclick() {
      if (this.$props.preCheck(this.$props) !== true) {
        return
      }
      const btn = this.getBtnProps()
      this.realTarget = strVarReplace(btn.target || '', this.$props.metaData)
      this.clickHandler[btn.type]()
    },
    getBtnProps() {
      return this.$props
    }
  }
}
</script>

<style lang="scss">
.el-btn-icon {
  height: 100%;
  line-height: 100%;
  display: flex;
  padding: 0 12px;
  transition: all 0.3s;
  cursor: pointer;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
