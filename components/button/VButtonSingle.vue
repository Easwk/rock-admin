<template>
  <el-button v-if="text" v-bind="btnProps" @click="onclick">
    {{ text }}
  </el-button>
  <el-button v-else v-bind="btnProps" @click="onclick" />
  <template v-if="showContainer">
    <component
      :is="'el-' + container"
      v-model="showContainer"
      append-to-body
      :beforeClose="closeContainer"
      :title="text"
      :destroy-on-close="true"
    >
      <component
        :is="getSubComp()"
        v-bind="getSubProps()"
        v-on="getSubEvent()"
      ></component>
    </component>
  </template>
</template>
<script>
import { strVarReplace } from "../../utils";
import Base from "./mixin";
export default {
  name: "VButtonSingle",
  mixins: [Base],
  props: {
    text: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    target: {
      type: String,
      default: ""
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
  methods: {
    onclick() {
      if (this.$props.preCheck(this.$props) !== true) {
        return;
      }
      const btn = this.getBtnProps();
      this.realTarget = strVarReplace(btn.target || "", this.$props.metaData);
      this.clickHandler[btn.type]();
      this.$emit("click");
    },
    getBtnProps() {
      return this.$props;
    }
  }
};
</script>
