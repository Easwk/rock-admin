<template>
  <v-icon name="ra-code" @click="show = !show" />
  <el-drawer
    :key="$route.path"
    v-model="show"
    title="PageSchema"
    custom-class="my-drawer"
    :direction="direction"
    size="50%"
    destroy-on-close
  >
    <v-json v-model="pageSchema" />
  </el-drawer>
</template>
<script>
import VJson from '../../components/form/VJson'
export default {
  name: 'PageScheme',
  components: { VJson },
  data() {
    return {
      show: false,
      direction: 'rtl'
    }
  },
  computed: {
    pageSchema() {
      return JSON.stringify(this.$route.meta.pageSchema || {}, null, 2)
    }
  }
}
</script>
