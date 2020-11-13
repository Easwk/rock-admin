<template>
  <el-checkbox
    v-for="(item, index) in options"
    :key="index + '-checkbox'"
    :label="item.value"
    >{{ item.label }}
  </el-checkbox>
</template>
<script>
export default {
  name: "VCheckbox",
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
