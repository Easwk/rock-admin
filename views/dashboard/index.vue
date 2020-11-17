<template>
  <div>
    <!--    <v-form v-bind="numRangeForm" />-->
    <v-table v-bind="simpleTable" list-api="/student/list" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import VForm from "@/core/components/form";
import VTable from '../../components/table'
import { simpleForm, numRangeForm } from '../../components/form/test'
import { simpleTable } from '../../components/table/data'

export default {
  name: 'Dashboard',
  components: { VTable },
  data() {
    return {
      simpleForm,
      numRangeForm,
      simpleTable
    }
  },
  computed: {
    ...mapGetters(['name']),
    admin() {
      return this.$store.state.settings
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  margin: 30px;

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
