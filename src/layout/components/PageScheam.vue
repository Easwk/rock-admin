<template>
  <v-icon name="ra-code" @click="show = !show" />
  <el-drawer
    v-model="show"
    title="PageSchema"
    custom-class="my-drawer"
    :direction="direction"
    size="50%"
    destroy-on-close
  >
    <v-json :key="key" v-model="pageSchema" />
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
      direction: 'rtl',
      pageSchema: JSON.stringify(this.$route.meta.pageSchema || {}, null, 2)
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.pageSchema = JSON.stringify(this.$route.meta.pageSchema || {}, null, 2)
      },
      deep: true
    }
  }
}
</script>
