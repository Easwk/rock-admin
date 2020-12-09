<template>
  <v-form
    v-bind="formProps"
  />
</template>
<script>
import VForm from '../components/form/index'
export default {
  name: 'FormRender',
  components: { VForm },
  data() {
    const token = this.$route.path.split('/')
    const project = token.slice(0, token.length - 1).join('/')
    const schema = this.$route.meta.pageSchema || { infoApi: project + '/form_schema' }
    if (schema.listApi === undefined) {
      schema.saveApi = project + '/save'
    }
    return {
      formProps: schema
    }
  }
}
</script>
