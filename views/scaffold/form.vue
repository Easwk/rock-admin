<template>
  <v-form
    v-model="formData"
    :info-api="infoApi"
    :save-api="saveApi"
  />
</template>
<script>
import VForm from '../../components/form'
export default {
  name: 'Form',
  components: { VForm },
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
      return this.project + '/form_schema'
    },
    saveApi() {
      return this.project + '/save'
    }
  }
}
</script>
