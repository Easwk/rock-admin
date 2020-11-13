<template>
  <span v-html="data"></span>
</template>
<script>
export default {
  name: "CellSpan",
  props: {
    data: {
      type: String,
      default: ""
    },
    column: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
