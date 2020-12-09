<template>
  <v-table v-bind="tableProps" />
</template>
<script>
import VTable from '../components/table/index'
// import VNotification from '../components/Notification'
export default {
  name: 'TableRender',
  components: { VTable },
  data() {
    const token = this.$route.path.split('/')
    const project = token.slice(0, token.length - 1).join('/')
    const schema = this.$route.meta.pageSchema || { infoApi: project + '/list_schema' }
    if (schema.listApi === undefined) {
      schema.listApi = project + '/list'
    }
    return {
      tableProps: schema
    }
  }
}
</script>
