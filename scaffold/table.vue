<template>
  <v-table
    :info-api="infoApi"
    :list-api="listApi"
  />
</template>
<script>
import VTable from '../components/table/index'
export default {
  name: 'Table',
  components: { VTable },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    project() {
      const token = this.$route.path.split('/')
      return token.slice(0, token.length - 1).join('/')
    },
    infoApi() {
      return this.project + '/list_schema'
    },
    listApi() {
      return this.project + '/list'
    }
  }
}
</script>
