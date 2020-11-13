<template>
  <template v-for="(item, index) in buttons" :key="index + 'v-button'">
    <v-button-group
      v-if="isArray(item)"
      v-bind="{
        buttons: item
      }"
    ></v-button-group>
    <v-button-single v-else v-bind="item"></v-button-single>
  </template>
</template>
<script>
import VButtonSingle from "./VButtonSingle";
import VButtonGroup from "./VButtonGroup";
import { isArray } from "../../utils";

export default {
  name: "VButton",
  components: { VButtonSingle, VButtonGroup },
  props: {
    buttons: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    isArray(tmp) {
      return isArray(tmp);
    }
  }
};
</script>
