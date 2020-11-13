<template>
  <span>
    <icon v-if="meta.icon" :name="meta.icon" />
    <span>{{ meta.title }}</span>
  </span>
</template>

<script>
export default {
  name: "MenuContent",
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          icon: "",
          title: ""
        };
      }
    }
  }
};
</script>
