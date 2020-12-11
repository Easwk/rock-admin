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
    let schema = this.$route.meta.pageSchema || { infoApi: project + '/form_schema' }
    schema = this.$lodash.merge({
      saveApi: project + '/save',
      afterSubmit: 'goback',
      afterReset: 'goback'
    }, schema)
    return {
      formProps: schema
    }
  }
}
</script>
