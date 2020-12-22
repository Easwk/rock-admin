<template>
  <v-form
    :key="key"
    v-model="formData"
    v-bind="formProps"
  />
</template>
<script>
import VForm from '../components/form/index'
import { strVarReplace } from '../utils'

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
    const rep = ['saveApi', 'getApi', 'infoApi']
    rep.forEach(key => {
      if (schema[key]) {
        schema[key] = strVarReplace(schema[key], { id: this.$route.params.id || '' })
      }
    })
    return {
      key: 0,
      formData: {},
      formProps: schema
    }
  },
  computed: {
    getApi() {
      return this.formProps.getApi
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.$http.request({
        method: 'GET',
        url: this.getApi
      }).then(({ payload }) => {
        this.formData = payload
        this.key++
      })
    }
  }
}
</script>
