<template>
  <el-row>
    <div class="my-card">
      <el-button>从表结构解析</el-button>
      <v-button-single text="查看PageSchema" type="modal">
        <v-json v-model="formSchema" />
      </v-button-single>
      <el-button>保存为页面</el-button>
    </div>
    <el-card shadow="never" class="my-card">
      <template #header>
        <el-row>
          <el-col :span="12">
            <span>表单预览</span>
          </el-col>
          <el-col :span="12" class="card-action">
            <v-button-single text="管理表单项" type="modal" :btn-props="{type:'text'}" :before-close="beforeFormItemClose">
              <v-table ref="form-items" v-bind="formItemTable" />
            </v-button-single>
          </el-col>
        </el-row>
      </template>
      <v-form :key="formKey" v-bind="form" />
    </el-card>
  </el-row>
</template>
<script>
import VTable from '../../components/table'
import VForm from '../../components/form'
import VButtonSingle from '../../components/button/VButtonSingle'
import VJson from '../../components/form/VJson'
import form from './form'
export default {
  name: 'Entity',
  components: { VTable, VForm, VButtonSingle, VJson },
  data() {
    return {
      formKey: 1,
      tableKey: 1,
      entity: {
        name: '',
        fields: []
      },
      formItemTable: form.itemTable,
      form: {
        formItems: []
      }
    }
  },
  computed: {
    formSchema() {
      return JSON.stringify(this.form, null, 2)
    }
  },
  methods: {
    beforeFormItemClose(done) {
      this.$refs['form-items'].tableList.forEach((item, index) => {
        if (!item.field) {
          this.$message({ type: 'error', message: '表单第' + (index + 1) + '项, 字段名是必须的' })
          return false
        }
        if (!item.type) {
          this.$message({ type: 'error', message: '表单第' + (index + 1) + '项, 类型是必须的' })
          return false
        }
        if (!item.label) {
          this.$message({ type: 'error', message: '表单第' + (index + 1) + '项, 显示名是必须的' })
          return false
        }
      })
      this.form.formItems = this.$refs['form-items'].tableList
      this.formKey++
      return true
    }
  }
}
</script>
<style>
  .my-card {
    margin-bottom: 20px;
  }
  .card-action {
    display: flex;
    justify-content: flex-end
  }
</style>
